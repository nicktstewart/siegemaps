'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { FloorInput } from '@/lib/schema';
import { ja, text } from '@/lib/copy';

type Layer = 'ja' | 'en';
type MapOption = { id: string; name: string; floors: { id: string; label: string }[] };
type Status = 'saved' | 'dirty' | 'saving' | 'error';
type Drag = { layer: Layer; id: string; startX: number; startY: number; moved: boolean };
const statuses = [['draft', ja.editorStatusDraft], ['community', ja.editorStatusCommunity], ['reviewed', ja.editorStatusReviewed]] as const;
const round = (value: number) => Math.round(Math.min(1, Math.max(0, value)) * 10000) / 10000;

function NameList({ label, hint, values, onChange }: { label: string; hint?: string; values: string[]; onChange: (values: string[]) => void }) {
  const move = (from: number, to: number) => { const next = [...values]; [next[from], next[to]] = [next[to], next[from]]; onChange(next); };
  return <fieldset className="editor-field"><legend>{label}</legend>{hint && <p>{hint}</p>}
    {values.map((value, index) => <div className="editor-name-row" key={index}>
      <input value={value} onChange={(event) => onChange(values.map((item, i) => i === index ? event.target.value : item))} aria-label={`${label} ${index + 1}`} />
      <button type="button" onClick={() => move(index, index - 1)} disabled={index === 0} aria-label={ja.editorMoveUp}>↑</button>
      <button type="button" onClick={() => move(index, index + 1)} disabled={index === values.length - 1} aria-label={ja.editorMoveDown}>↓</button>
      <button type="button" onClick={() => onChange(values.filter((_, i) => i !== index))} aria-label={ja.editorRemove}>×</button>
    </div>)}
    <button type="button" className="editor-add-name" onClick={() => onChange([...values, ''])}>{ja.editorAddName}</button>
  </fieldset>;
}

export function FloorEditor({ initial, maps }: { initial: FloorInput; maps: MapOption[] }) {
  const [floor, setFloor] = useState(initial);
  const [history, setHistory] = useState<FloorInput[]>([]);
  const [layer, setLayer] = useState<Layer>('ja');
  const [selected, setSelected] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState<Status>('saved');
  const [errors, setErrors] = useState<string[]>([]);
  const plane = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const leaving = useRef(false);
  const english = floor.englishCallouts ?? [];
  const map = maps.find((entry) => entry.id === floor.mapId)!;

  const change = useCallback((next: FloorInput, record = true) => {
    if (record) setHistory((past) => [...past.slice(-99), floor]);
    setFloor(next); setStatus('dirty'); setErrors([]);
  }, [floor]);
  const undo = useCallback(() => {
    if (!history.length) return;
    setFloor(history[history.length - 1]); setHistory(history.slice(0, -1)); setStatus('dirty');
  }, [history]);
  const save = useCallback(async () => {
    const problems: string[] = [];
    const callouts = floor.callouts.map((item) => ({ ...item, primaryNames: item.primaryNames.map((name) => name.trim()).filter(Boolean), shortNames: item.shortNames.map((name) => name.trim()).filter(Boolean) }));
    const englishCallouts = (floor.englishCallouts ?? []).map((item) => ({ ...item, names: item.names.map((name) => name.trim()).filter(Boolean), sourceUrl: item.sourceUrl.trim() }));
    if (callouts.some((item) => !item.primaryNames.length) || englishCallouts.some((item) => !item.names.length)) problems.push(ja.editorEmptyName);
    if (englishCallouts.some((item) => !URL.canParse(item.sourceUrl))) problems.push(ja.editorMissingSource);
    if (problems.length) { setErrors(problems); setStatus('error'); return; }
    const next = { ...floor, callouts, englishCallouts };
    setStatus('saving');
    try {
      const response = await fetch('/api/editor', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(next) });
      if (!response.ok) { const body = await response.json().catch(() => ({})) as { errors?: string[] }; setErrors(body.errors ?? []); setStatus('error'); return; }
      setFloor(next); setStatus('saved'); setErrors([]);
    } catch { setStatus('error'); }
  }, [floor]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') { event.preventDefault(); void save(); }
      else if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !(event.target instanceof HTMLInputElement)) { event.preventDefault(); undo(); }
      else if (event.key === 'Escape') { setAdding(false); setSelected(null); }
    };
    const onLeave = (event: BeforeUnloadEvent) => { if (status !== 'saved' && !leaving.current) event.preventDefault(); };
    window.addEventListener('keydown', onKey); window.addEventListener('beforeunload', onLeave);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('beforeunload', onLeave); };
  }, [save, undo, status]);

  function pointAt(clientX: number, clientY: number) {
    const rect = plane.current!.getBoundingClientRect();
    return { x: round((clientX - rect.left) / rect.width), y: round((clientY - rect.top) / rect.height) };
  }
  function place(target: Layer, id: string, x: number, y: number, record: boolean) {
    if (target === 'ja') change({ ...floor, callouts: floor.callouts.map((item) => item.id === id ? { ...item, x, y } : item) }, record);
    else change({ ...floor, englishCallouts: english.map((item) => item.id === id ? { ...item, x, y } : item) }, record);
  }
  function startDrag(event: ReactPointerEvent<HTMLButtonElement>, target: Layer, id: string) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { layer: target, id, startX: event.clientX, startY: event.clientY, moved: false };
  }
  function moveDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    if (!current) return;
    if (!current.moved && Math.hypot(event.clientX - current.startX, event.clientY - current.startY) < 4) return;
    const { x, y } = pointAt(event.clientX, event.clientY);
    place(current.layer, current.id, x, y, !current.moved);
    current.moved = true;
  }
  function endDrag(target: Layer, id: string) {
    const current = drag.current;
    drag.current = null;
    if (current && !current.moved) { setLayer(target); setSelected(id); }
  }
  function addAt(clientX: number, clientY: number) {
    const { x, y } = pointAt(clientX, clientY);
    const ids = new Set([...floor.callouts, ...english].map((item) => item.id));
    let n = 1; while (ids.has(`new-${n}`)) n++;
    const id = `new-${n}`;
    if (layer === 'ja') change({ ...floor, callouts: [...floor.callouts, { id, primaryNames: [ja.editorNewName], shortNames: [], x, y, reviewStatus: 'draft' }] });
    else change({ ...floor, englishCallouts: [...english, { id, names: ['New callout'], x, y, sourceUrl: '', reviewStatus: 'draft', labelWidth: 0.09 }] });
    setAdding(false); setSelected(id);
  }
  function leaveTo(href: string) {
    if (status === 'saved' || window.confirm(ja.editorLeave)) { leaving.current = true; window.location.href = href; }
  }

  const currentJa = layer === 'ja' ? floor.callouts.find((item) => item.id === selected) : undefined;
  const currentEn = layer === 'en' ? english.find((item) => item.id === selected) : undefined;
  const updateJa = (patch: Partial<FloorInput['callouts'][number]>) => change({ ...floor, callouts: floor.callouts.map((item) => item.id === selected ? { ...item, ...patch } : item) });
  const updateEn = (patch: Partial<NonNullable<FloorInput['englishCallouts']>[number]>) => change({ ...floor, englishCallouts: english.map((item) => item.id === selected ? { ...item, ...patch } : item) });
  const remove = () => { change(layer === 'ja' ? { ...floor, callouts: floor.callouts.filter((item) => item.id !== selected) } : { ...floor, englishCallouts: english.filter((item) => item.id !== selected) }); setSelected(null); };
  const list = layer === 'ja' ? floor.callouts.map((item) => ({ id: item.id, name: item.primaryNames.join(' / ') })) : english.map((item) => ({ id: item.id, name: item.names.join(' / ') }));

  return <div className="map-workspace editor-workspace" style={{ '--map-ratio': floor.imageWidth / floor.imageHeight } as CSSProperties}><div className="viewer-stage">
    <div className="viewer-heading"><div><h1>{ja.editorTitle}<span>{map.name} {map.floors.find((entry) => entry.id === floor.id)?.label}</span></h1></div>
      <label className="editor-select"><span>{ja.editorMap}</span><select value={floor.mapId} onChange={(event) => leaveTo(`/editor?map=${event.target.value}`)}>{maps.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select></label>
      <nav className="floor-switcher" aria-label={ja.floorNavigation}>{map.floors.map((entry) => <a key={entry.id} href={`/editor?map=${map.id}&floor=${entry.id}`} aria-current={entry.id === floor.id ? 'page' : undefined} onClick={(event) => { event.preventDefault(); leaveTo(`/editor?map=${map.id}&floor=${entry.id}`); }}>{entry.label}</a>)}</nav>
    </div>
    <div className="canvas-column">
      <TransformWrapper initialScale={1} minScale={1} maxScale={6} centerOnInit wheel={{ step: 0.15 }} doubleClick={{ disabled: true }} panning={{ excluded: ['button'] }}>
        {({ zoomIn, zoomOut, resetTransform }) => <>
          <div className={`map-canvas${adding ? ' editor-adding' : ''}`}>
            <TransformComponent wrapperClass="transform-wrapper" contentClass="transform-content"><div ref={plane} className="map-plane" style={{ aspectRatio: `${floor.imageWidth}/${floor.imageHeight}` }} onPointerDown={(event) => { if (adding) event.currentTarget.dataset.downAt = `${event.clientX},${event.clientY}`; }} onPointerUp={(event) => {
              const [x, y] = (event.currentTarget.dataset.downAt ?? '').split(',').map(Number);
              delete event.currentTarget.dataset.downAt;
              if (adding && Math.hypot(event.clientX - x, event.clientY - y) < 4) addAt(event.clientX, event.clientY);
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="blueprint" src={floor.imagePath} width={floor.imageWidth} height={floor.imageHeight} alt="" draggable={false} />
              {floor.callouts.map((item) => <button key={`ja:${item.id}`} className={`map-label${layer === 'ja' ? '' : ' editor-inactive'}`} aria-pressed={layer === 'ja' && selected === item.id} style={{ left: `${item.x * 100}%`, top: `${item.y * 100}%` }} onPointerDown={(event) => startDrag(event, 'ja', item.id)} onPointerMove={moveDrag} onPointerUp={() => endDrag('ja', item.id)}>{item.primaryNames[0] || '—'}</button>)}
              {english.map((item) => <button key={`en:${item.id}`} lang="en" className={`map-label english-map-label${layer === 'en' ? '' : ' editor-inactive'}`} aria-pressed={layer === 'en' && selected === item.id} style={{ left: `${item.x * 100}%`, top: `${item.y * 100}%`, maxWidth: `${(item.labelWidth ?? 0.09) * 100}%`, '--label-scale': item.labelScale ?? 1 } as CSSProperties} onPointerDown={(event) => startDrag(event, 'en', item.id)} onPointerMove={moveDrag} onPointerUp={() => endDrag('en', item.id)}>{item.names[0] || '—'}</button>)}
            </div></TransformComponent>
          </div>
          <div className="canvas-toolbar"><span className="editor-hint">{adding ? ja.editorAddHint : ja.editorDragHint}</span><div className="zoom-controls"><button onClick={() => zoomOut()} aria-label={ja.zoomOut}>−</button><button onClick={() => resetTransform()}>{ja.fitMap}</button><button onClick={() => zoomIn()} aria-label={ja.zoomIn}>＋</button></div></div>
        </>}
      </TransformWrapper>
    </div>
  </div><aside className="viewer-sidebar editor-sidebar">
    <div className="editor-actions">
      <button className="editor-primary" onClick={() => void save()} disabled={status === 'saved' || status === 'saving'}>{ja.editorSave}</button>
      <button onClick={undo} disabled={!history.length}>{ja.editorUndo}</button>
      <span className={`editor-status editor-status-${status}`} role="status">{status === 'saved' ? ja.editorSaved : status === 'saving' ? ja.editorSaving : status === 'error' ? ja.editorSaveFailed : ja.editorDirty}</span>
    </div>
    {errors.length > 0 && <ul className="editor-errors">{errors.map((error) => <li key={error}>{error}</li>)}</ul>}
    <fieldset className="editor-field"><legend>{ja.editorLayer}</legend><div className="floor-switcher">{([['ja', ja.editorJapanese], ['en', ja.editorEnglish]] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={layer === value} onClick={() => { setLayer(value); setSelected(null); }}>{label}</button>)}</div></fieldset>
    <button className="editor-wide" onClick={() => { setAdding(!adding); setSelected(null); }} aria-pressed={adding}>{adding ? ja.editorCancel : ja.editorAdd}</button>
    {currentJa && <div className="position-details">
      <NameList label={ja.editorNames} hint={ja.editorNamesHint} values={currentJa.primaryNames} onChange={(primaryNames) => updateJa({ primaryNames })} />
      <NameList label={ja.editorShortNames} values={currentJa.shortNames} onChange={(shortNames) => updateJa({ shortNames })} />
      <label className="editor-select"><span>{ja.editorStatus}</span><select value={currentJa.reviewStatus} onChange={(event) => updateJa({ reviewStatus: event.target.value as typeof currentJa.reviewStatus })}>{statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <div className="editor-actions"><button onClick={remove}>{ja.editorDelete}</button><button onClick={() => setSelected(null)}>{ja.editorDone}</button></div>
    </div>}
    {currentEn && <div className="position-details" lang="en">
      <NameList label={ja.editorNames} hint={ja.editorNamesHint} values={currentEn.names} onChange={(names) => updateEn({ names })} />
      <label className="editor-select editor-source"><span>{ja.editorSource}</span><input value={currentEn.sourceUrl} onChange={(event) => updateEn({ sourceUrl: event.target.value })} placeholder="https://" /></label>
      <label className="editor-select"><span>{ja.editorStatus}</span><select value={currentEn.reviewStatus} onChange={(event) => updateEn({ reviewStatus: event.target.value as typeof currentEn.reviewStatus })}>{statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <div className="editor-actions"><button onClick={remove}>{ja.editorDelete}</button><button onClick={() => setSelected(null)}>{ja.editorDone}</button></div>
    </div>}
    {!currentJa && !currentEn && <section className="callout-index english-index"><h3>{text('editorList', { count: list.length })}</h3><ul>{list.map((item) => <li key={item.id}><button lang={layer} onClick={() => setSelected(item.id)}>{item.name || '—'}</button></li>)}</ul></section>}
  </aside></div>;
}
