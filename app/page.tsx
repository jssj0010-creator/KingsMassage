import React from 'react'
import { AdSponsorStrip } from '@/components/AdSponsorStrip'

export default function HomePage(){
  const homeSponsors = [
    { id:'h1', title:'라라마사지', href:'/shop/rrr', label:'TOP', region:'전국' },
    { id:'h2', title:'츄츄홈타이', href:'/shop/chu', label:'TOP', region:'서울/경기/인천' },
  ]

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8">
      <AdSponsorStrip slot="home-hero" title="오늘의 스폰서" subtitle="홈 상단 고정" items={homeSponsors}/>

      <section>
        <h2 className="text-xl font-semibold mb-3">지역 랜딩 빠른 이동</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a href="/seoul" className="border rounded-2xl p-6 bg-white hover:shadow-sm">
            <h3 className="text-lg font-bold">서울 모든지역</h3>
            <p className="text-sm opacity-80 mt-1">25개 자치구 전체</p>
          </a>
          <a href="/gyeonggi" className="border rounded-2xl p-6 bg-white hover:shadow-sm">
            <h3 className="text-lg font-bold">경기 모든지역</h3>
            <p className="text-sm opacity-80 mt-1">주요 시·군 바로가기</p>
          </a>
          <a href="/incheon" className="border rounded-2xl p-6 bg-white hover:shadow-sm">
            <h3 className="text-lg font-bold">인천 모든지역</h3>
            <p className="text-sm opacity-80 mt-1">10개 구·군 전체</p>
          </a>
        </div>
      </section>
    </main>
  )
}
