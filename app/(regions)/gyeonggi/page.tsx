import React from 'react'
import { AdSponsorStrip } from '@/components/AdSponsorStrip'
import { GYEONGGI_CITIES } from '@/lib/constants'

export default function GyeonggiLanding(){
  const sponsors = [
    { id:'g1', title:'미라클홈타이', href:'/shop/miracle', label:'TOP', region:'경기 수원' },
    { id:'g2', title:'포레스트로샵', href:'/shop/forest', label:'TOP', region:'경기 성남' },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '경기 마사지 홈케어 · 로드샵 전체 지역',
    hasPart: GYEONGGI_CITIES.map(c=>({'@type':'Place', name:c}))
  }

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">경기 전지역 마사지 안내 (홈케어/로드샵)</h1>
      <AdSponsorStrip slot="region-top" title="경기 스폰서" subtitle="지역 Top 고정 노출" items={sponsors}/>

      <section>
        <h2 className="text-xl font-semibold mb-3">지역 바로가기</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {GYEONGGI_CITIES.map(c => (
            <a key={c} href={`/shops?region=경기&area=${encodeURIComponent(c)}`} className="border rounded-lg px-3 py-2 bg-white hover:shadow-sm">{c}</a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">최신 등록</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="border rounded-xl p-4 bg-white">
            <a href="/shop/miracle" className="font-semibold">미라클홈타이</a>
            <div className="text-sm opacity-80">수원 · 홈케어 · 24시간</div>
          </li>
          <li className="border rounded-xl p-4 bg-white">
            <a href="/shop/forest" className="font-semibold">포레스트로샵</a>
            <div className="text-sm opacity-80">성남 · 로드샵 · 주차가능</div>
          </li>
        </ul>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
    </main>
  )
}
