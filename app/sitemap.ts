import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nexaro.vercel.app';
  const sections = [
    '',
    '#hero',
    '#watch',
    '#stats',
    '#social-proof',
    '#features',
    '#performance',
    '#long-term',
    '#bento',
    '#capabilities',
    '#integrations',
    '#pricing',
    '#faq',
  ];
  return sections.map((s) => ({
    url: `${base}/${s}`,
    lastModified: new Date('2026-06-26'),
    changeFrequency: 'monthly' as const,
    priority: s === '' ? 1.0 : 0.7,
  }));
}
