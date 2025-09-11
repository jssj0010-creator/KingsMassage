import React from 'react'
import { formatMinutes, formatPriceKR } from '@/lib/format'

type PriceItem = { id?: string; label: string; minutes?: number | string; price: string | number }

type Course = {
  id?: string;
  title: string;
  items: PriceItem[];
  note?: string;
}

type PriceTableProps = {
  courses: Course[];
  dense?: boolean;
}

export function PriceTable({ courses, dense = false }: PriceTableProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {courses.map((c) => (
        <div key={c.id ?? c.title} className="border rounded-2xl overflow-hidden bg-white">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h4 className="font-semibold">{c.title}</h4>
          </div>
          <ul className="divide-y">
            {c.items.map((it) => (
              <li key={it.id ?? it.label} className={`flex items-center justify-between px-4 ${dense ? 'py-2' : 'py-3'}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-medium truncate">{it.label}</span>
                  {formatMinutes(it.minutes) && (
                    <span className="text-xs text-gray-500">{formatMinutes(it.minutes)}</span>
                  )}
                </div>
                <div className="font-semibold">{formatPriceKR(it.price)}</div>
              </li>
            ))}
          </ul>
          {c.note && <div className="px-4 py-3 text-xs text-gray-500 bg-gray-50">{c.note}</div>}
        </div>
      ))}
    </div>
  )
}
