'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { Floor } from '@/lib/schema';
import { defaultSettings, labelText, type DisplaySettings } from '@/lib/labels';
import { ja, text } from '@/lib/copy';

const storageKey = 'siegemaps.display.v1';
export function MapViewer({ floor, mapName }: { floor: Floor; mapName: string }) {
  const [settings, setSettings] = useState<DisplaySettings>(defaultSettings);
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
      if (saved && typeof saved === 'object' && Object.keys(defaultSettings).every((key) => typeof (saved as Record<string, unknown>)[key] === 'boolean')) {
        // Restore after hydration so the initial HTML always includes the default labels.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSettings(saved as DisplaySettings);
      }
    } catch { return; }
  }, []);
  function update(key: keyof DisplaySettings, value: boolean) {
    const next = { ...settings, [key]: value }; setSettings(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { return; }
  }
  const current = floor.callouts.find((item) => item.id === selected);
  return <div className="map-workspace"><div className="canvas-column">
    <TransformWrapper initialScale={1} minScale={1} maxScale={5} centerOnInit wheel={{ step: 0.15 }} doubleClick={{ disabled: true }} panning={{ excluded: ['button'] }}>
      {({ zoomIn, zoomOut, resetTransform, setTransform, instance }) => <>
        <div className="map-canvas" tabIndex={0} role="region" aria-label={text('canvasAccessible', { map: mapName, floor: floor.label })} onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const { positionX, positionY, scale } = instance.transformState;
          if (event.key === '+' || event.key === '=') zoomIn();
          else if (event.key === '-') zoomOut();
          else if (event.key === '0') resetTransform();
          else if (event.key.startsWith('Arrow')) { event.preventDefault(); setTransform(positionX + (event.key === 'ArrowLeft' ? 40 : event.key === 'ArrowRight' ? -40 : 0), positionY + (event.key === 'ArrowUp' ? 40 : event.key === 'ArrowDown' ? -40 : 0), scale); }
        }}>
          <TransformComponent wrapperClass="transform-wrapper" contentClass="transform-content"><div className="map-plane" style={{ aspectRatio: `${floor.imageWidth}/${floor.imageHeight}` }}>
            <Image className="blueprint" src={floor.imagePath} width={floor.imageWidth} height={floor.imageHeight} alt={text('mapAlt', { map: mapName, floor: floor.label })} draggable={false} priority unoptimized />
            {floor.callouts.map((callout) => { const text = labelText(callout, settings); return text ? <button key={callout.id} className="map-label" aria-pressed={selected === callout.id} style={{ left: `${callout.x * 100}%`, top: `${callout.y * 100}%` }} onClick={() => setSelected(callout.id)}>{text}</button> : null; })}
          </div></TransformComponent>
        </div>
        <div className="canvas-toolbar"><a className="source-link" href={floor.sourceUrl} target="_blank" rel="noreferrer">{ja.mapCredit}</a><div className="zoom-controls"><button onClick={() => zoomOut()} aria-label={ja.zoomOut}>−</button><button onClick={() => resetTransform()}>{ja.fitMap}</button><button onClick={() => zoomIn()} aria-label={ja.zoomIn}>＋</button></div></div>
      </>}
    </TransformWrapper>
  </div><aside className="viewer-sidebar"><h2>{ja.displayTitle}</h2>
    {(['showNames', 'firstOnly', 'showShortNames'] as const).map((key) => <label className="setting-row" key={key}><span>{ja[key]}</span><input type="checkbox" checked={settings[key]} onChange={(event) => update(key, event.target.checked)} /></label>)}
    {current && <div className="position-details" aria-live="polite"><h3>{current.primaryNames.join(' / ')}</h3><p>{current.shortNames.length ? text('shortNames', { names: current.shortNames.join(' / ') }) : ja.noShortNames}</p><button onClick={() => setSelected(null)}>{ja.close}</button></div>}
  </aside></div>;
}
