import type { Metadata } from 'next'

type Shop = {
  name: string; phone?: string; regions: string[]; services: string[]; tags: string[]; desc?: string; address?: string;
};
const db: Record<string, Shop> = {
  'gangnam-nana-swedish': { name:'나나스웨디시', regions:['서울','구로'], services:['스웨디시','아로마'], tags:['24시간','카드가능'], desc:'고급 케어와 프라이빗 룸' },
  'incheon-simkung-therapy': { name:'심쿵테라피', regions:['인천','계산'], services:['왁싱','케어'], tags:['샵이용가능'], desc:'1:1 프라이빗 왁싱 전문' },
}

export async function generateMetadata({ params }:{ params:{ slug:string } }): Promise<Metadata> {
  const s = db[params.slug]
  return { title: `${s?.name} | 우리집마사지`, description: s?.desc }
}

export default function ShopPage({ params }:{ params:{ slug:string } }) {
  const s = db[params.slug]
  if(!s) return <div className="p-6">없는 샵입니다.</div>

  const jsonLd = {
    '@context':'https://schema.org',
    '@type':'LocalBusiness',
    name: s.name,
    areaServed: s.regions.join(', '),
    url: `https://example.com/shop/${params.slug}`,
    description: s.desc,
    '@id': `https://example.com/#${params.slug}`,
    serviceType: s.services.join(', '),
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{s.name}</h1>
      <p className="opacity-80">{s.regions.join(' · ')}</p>
      <p className="mt-2">{s.services.join(' · ')}</p>
      <p className="mt-2">{s.tags.join(' · ')}</p>
      {s.desc && <p className="mt-4">{s.desc}</p>}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}
