'use client'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

type Sponsor = {
  id: string;
  title: string;
  href: string;
  label?: string;
  region?: string;
  image?: string;
}

type AdSponsorStripProps = {
  title?: string;
  subtitle?: string;
  items: Sponsor[];
  slot?: 'home-hero' | 'region-top' | 'category-top';
}

export function AdSponsorStrip({ title = '스폰서', subtitle, items, slot = 'home-hero' }: AdSponsorStripProps) {
  return (
    <section className={`w-full ${slot === 'home-hero' ? 'bg-white' : 'bg-gray-50'} border rounded-2xl p-4 md:p-6 shadow-sm`}>
      <header className="mb-4">
        <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
        {subtitle && <p className="text-sm opacity-80 mt-1">{subtitle}</p>}
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((s) => (
          <Link key={s.id} href={s.href} className="group border bg-white rounded-xl overflow-hidden hover:shadow-md transition p-3 flex flex-col gap-2">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100 relative">
              {s.image && (
                <Image src={s.image} alt={s.title} fill sizes="(min-width:1024px) 16vw, 33vw" className="object-cover group-hover:scale-105 transition" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <strong className="truncate">{s.title}</strong>
              {s.label && <span className="text-[10px] px-2 py-0.5 rounded-full bg-black text-white">{s.label}</span>}
            </div>
            {s.region && <div className="text-xs text-gray-500 truncate">{s.region}</div>}
          </Link>
        ))}
      </div>
    </section>
  )
}
