import React from 'react'
import { AdSponsorStrip } from '@/components/AdSponsorStrip'
import { INCHEON_DISTRICTS } from '@/lib/constants'

export default function IncheonLanding(){
  const sponsors = [
    { id:'i1', title:'씨사이드홈케어', href:'/shop/seaside', label:'TOP', region:'인천 연수' },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '인천 마사지 홈케어 · 로드샵 전체 지역',
    hasPart: INCHEON_DISTRICTS.map(d=>({'@type':'Place', name:d}))
  }

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">인천 전지역 마사지 안내 (홈케어/로드샵)</h1>
      <AdSponsorStrip slot="region-top" title="인천 스폰서" subtitle="지역 Top 고정 노출" items={sponsors}/>

      <section>
        <h2 className="text-xl font-semibold mb-3">지역 바로가기</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {INCHEON_DISTRICTS.map(d => (
            <a key={d} href={`/shops?region=인천&area=${encodeURIComponent(d.replace('구',''))}`} className="border rounded-lg px-3 py-2 bg-white hover:shadow-sm">{d}</a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">최신 등록</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="border rounded-xl p-4 bg-white">
            <a href="/shop/seaside" className="font-semibold">씨사이드홈케어</a>
            <div className="text-sm opacity-80">연수구 · 홈케어 · 24시간</div>
          </li>
        </ul>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
    </main>
  )
}
