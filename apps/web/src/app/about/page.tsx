import Link from 'next/link';
import { ja } from '@/lib/copy';
import { pageMetadata, siteUrl, websiteId } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';

export const metadata = pageMetadata(ja.aboutPageTitle, ja.aboutDescription, '/about');

export default function About() {
  return <main id="main" className="about-main">
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'AboutPage', '@id': `${siteUrl}/about#page`, url: `${siteUrl}/about`, name: ja.aboutNav, description: ja.aboutDescription, inLanguage: 'ja', isPartOf: { '@type': 'WebSite', '@id': websiteId, name: 'SiegeMaps', url: siteUrl } }} />
    <article>
      <h1>{ja.aboutNav}</h1>
      <h2>{ja.aboutHeading}</h2>
      <p>{ja.aboutProblem}</p>
      <p>{ja.aboutMission}</p>
      <Link className="about-map-link" href="/">{ja.catalogueTitle}</Link>
    </article>
  </main>;
}
