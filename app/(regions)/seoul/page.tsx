import React from 'react'
import { AdSponsorStrip } from '@/components/AdSponsorStrip'
import { SEOUL_DISTRICTS } from '@/lib/constants'

export default function SeoulLanding(){
  const sponsors = [
    { id:'s1', title:'나나홈케어', href:'/shop/nana', label:'TOP', region:'서울 강남' },
    { id:'s2', title:'밤비아로마', href:'/shop/bambi', label:'TOP', region:'서울 영등포' },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '서울 마사지 홈케어 · 로드샵 전체 지역',
    hasPart: SEOUL_DISTRICTS.map(d=>({'@type':'Place', name:d}))
  }

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">서울 전지역 마사지 안내 (홈케어/로드샵)</h1>
      <p className="opacity-80">서울 25개 자치구 전체를 한눈에. 인기 스폰서와 추천 지역 바로가기.</p>

      <AdSponsorStrip slot="region-top" title="서울 스폰서" subtitle="지역 Top 고정 노출" items={sponsors}/>

      <section>
        <h2 className="text-xl font-semibold mb-3">지역 바로가기</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {SEOUL_DISTRICTS.map(d => (
            <a key={d} href={`/shops?region=서울&area=${encodeURIComponent(d.replace('구',''))}`} className="border rounded-lg px-3 py-2 bg-white hover:shadow-sm">{d}</a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">최신 등록</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          <li className="border rounded-xl p-4 bg-white">
            <a href="/shop/nana" className="font-semibold">나나홈케어</a>
            <div className="text-sm opacity-80">강남구 · 홈케어 · 24시간</div>
          </li>
          <li className="border rounded-xl p-4 bg-white">
            <a href="/shop/bambi" className="font-semibold">밤비아로마</a>
            <div className="text-sm opacity-80">영등포구 · 로드샵 · 카드가능</div>
          </li>
        </ul>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
    </main>
  )
}
