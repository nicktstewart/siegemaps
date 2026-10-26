'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { Floor } from '@/lib/schema';
import { defaultSettings, labelText, type DisplaySettings } from '@/lib/labels';

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
    } catch { /* Storage can be unavailable; default settings remain usable. */ }
  }, []);
  function update(key: keyof DisplaySettings, value: boolean) {
    const next = { ...settings, [key]: value }; setSettings(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Settings still work for this visit. */ }
  }
  const current = floor.callouts.find((item) => item.id === selected);
  return <div className="map-workspace"><div className="canvas-column">
    <div className="canvas-heading"><span>{mapName} / {floor.label}</span><span>{floor.layoutStatus === 'reviewed' ? '背景確認済み' : '背景の現行版照合前'}</span></div>
    <TransformWrapper initialScale={1} minScale={1} maxScale={5} centerOnInit wheel={{ step: 0.15 }} doubleClick={{ disabled: true }} panning={{ excluded: ['button'] }}>
      {({ zoomIn, zoomOut, resetTransform, setTransform, instance }) => <>
        <div className="map-canvas" tabIndex={0} role="region" aria-label={`${mapName} ${floor.label}。プラス・マイナスでズーム、矢印キーで移動、0でリセット。`} onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const { positionX, positionY, scale } = instance.transformState;
          if (event.key === '+' || event.key === '=') zoomIn();
          else if (event.key === '-') zoomOut();
          else if (event.key === '0') resetTransform();
          else if (event.key.startsWith('Arrow')) { event.preventDefault(); setTransform(positionX + (event.key === 'ArrowLeft' ? 40 : event.key === 'ArrowRight' ? -40 : 0), positionY + (event.key === 'ArrowUp' ? 40 : event.key === 'ArrowDown' ? -40 : 0), scale); }
        }}>
          <TransformComponent wrapperClass="transform-wrapper" contentClass="transform-content"><div className="map-plane" style={{ aspectRatio: `${floor.imageWidth}/${floor.imageHeight}` }}>
            <Image className="blueprint" src={floor.imagePath} width={floor.imageWidth} height={floor.imageHeight} alt={`${mapName} ${floor.label}の平面図。Sternab制作。`} draggable={false} priority sizes="(max-width: 800px) 100vw, 75vw" />
            {floor.callouts.map((callout) => { const text = labelText(callout, settings); return text ? <button key={callout.id} className="map-label" aria-pressed={selected === callout.id} style={{ left: `${callout.x * 100}%`, top: `${callout.y * 100}%` }} onClick={() => setSelected(callout.id)}>{text}</button> : null; })}
          </div></TransformComponent>
        </div>
        <div className="canvas-toolbar"><p>ドラッグで移動 / スクロール・ピンチで拡大</p><div className="zoom-controls"><button onClick={() => zoomOut()} aria-label="縮小">−</button><button onClick={() => resetTransform()}>全体表示</button><button onClick={() => zoomIn()} aria-label="拡大">＋</button></div></div>
      </>}
    </TransformWrapper>
  </div><aside className="viewer-sidebar"><h2>名称の表示</h2>
    {([['showNames', '通常名称を表示'], ['firstOnly', '最初の名称のみ'], ['showShortNames', '略称を表示']] as const).map(([key, label]) => <label className="setting-row" key={key}><span>{label}</span><input type="checkbox" checked={settings[key]} onChange={(event) => update(key, event.target.checked)} /></label>)}
    <p className="setting-help">表示設定はこの端末に保存されます。</p>
    <div className="position-details" aria-live="polite">{current ? <><h3>{current.primaryNames.join(' / ')}</h3><p>{current.shortNames.length ? `略称: ${current.shortNames.join(' / ')}` : '略称は未登録です。'}</p><button onClick={() => setSelected(null)}>閉じる</button></> : <><h3>{floor.callouts.length ? '気になる場所を選ぶ' : '呼称は、これから。'}</h3><p>{floor.callouts.length ? 'マップ上の名称を選ぶと、別名や略称を確認できます。' : 'まずはフロアの構造を確認。日本語の呼称は、確認しながら追加していきます。'}</p></>}</div>
    <a className="source-link" href={floor.sourceUrl} target="_blank" rel="noreferrer">Sternabの原図を見る ↗</a>
  </aside></div>;
}
