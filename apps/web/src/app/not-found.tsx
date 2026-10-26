import Link from 'next/link';
export default function NotFound() { return <main id="main" className="home-main"><h1>このマップは見つかりませんでした。</h1><p>マップ一覧から、表示するフロアを選んでください。</p><Link className="back-link" href="/">マップ一覧へ</Link></main>; }
