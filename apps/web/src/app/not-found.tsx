import Link from 'next/link';
import { ja } from '@/lib/copy';
export default function NotFound() { return <main id="main" className="home-main"><h1>{ja.notFound}</h1><Link className="back-link" href="/">{ja.backToMaps}</Link></main>; }
