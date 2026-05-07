import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sherston.ru'
  const now = new Date()

  return [
    { url: base,                      lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/catalog`,         lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/catalog/men`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/catalog/women`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/catalog/children`,lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/catalog/eco`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/catalog/sport`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/custom`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/b2b`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/b2b/dealer`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/about`,           lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/production`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/faq`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/blog`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
  ]
}
