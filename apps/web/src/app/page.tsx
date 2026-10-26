import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { maps } from '@/lib/content';

export const metadata: Metadata = { alternates: { canonical: '/' } };
export default function Home() {
  return <main id="main" className="home-main">
    <div className="home-intro"><h1>同じ場所を、<br />同じ言葉で。</h1><p>マップを見ながら、日本語のコールアウトを確認。<br />フロアごとの呼び方を、ひとつの場所に。</p></div>
    <section aria-labelledby="maps-title" className="map-catalogue"><div className="section-heading"><h2 id="maps-title">マップを選ぶ</h2><span>{maps.length} マップ / プレビュー</span></div>
      {maps.map((map) => <Link key={map.id} className="map-entry" href={`/maps/${map.id}/${map.floorIds[0]}`}><div className="map-thumbnail"><Image src={`/maps/${map.id}/${map.floorIds[0]}.jpg`} alt="" width={5000} height={3750} sizes="(max-width: 640px) 100vw, 440px" priority /></div><div className="map-entry-copy"><span className="english-map-name">{map.nameEn}</span><h3>{map.nameJa}</h3><p>{map.description}</p><span className="floor-count">{map.floorIds.length} フロア</span><span className="entry-arrow" aria-hidden="true">↗</span></div></Link>)}
    </section>
    <aside className="development-note"><h2>少しずつ、使える辞典へ。</h2><p>現在はマップ閲覧のプレビューです。日本語の呼称は、確認しながら追加していきます。掲載画像と現行ゲームの照合はまだ完了していません。</p></aside>
  </main>;
}
