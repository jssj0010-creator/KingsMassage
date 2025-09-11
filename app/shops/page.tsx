import Link from 'next/link'

const mock = [
  { slug:'gangnam-nana-swedish', name:'나나스웨디시', regions:['서울','구로'], tags:['24시간','카드가능','로드샵'], services:['스웨디시','아로마'], distanceKm:1.2 },
  { slug:'incheon-simkung-therapy', name:'심쿵테라피', regions:['인천','계산'], tags:['샵이용가능'], services:['왁싱','케어'] },
]

export default function ShopsPage({ searchParams }: { searchParams: Record<string,string> }) {
  const { region, tag, service } = searchParams
  const filtered = mock.filter(s =>
    (!region || s.regions.join(',').includes(region)) &&
    (!tag || s.tags.includes(tag)) &&
    (!service || s.services.includes(service))
  )

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">마사지 샵 찾기</h1>

      <form className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <input name="region" placeholder="지역(예: 서울/인천)" className="border p-2 rounded" defaultValue={region}/>
        <input name="service" placeholder="서비스(스웨디시/출장…)" className="border p-2 rounded" defaultValue={service}/>
        <input name="tag" placeholder="태그(24시간/카드가능…)" className="border p-2 rounded" defaultValue={tag}/>
        <button className="border rounded p-2">검색</button>
      </form>

      <ul className="space-y-3">
        {filtered.map(s => (
          <li key={s.slug} className="border rounded p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <p className="text-sm opacity-80">{s.regions.join(' · ')}</p>
                <p className="text-sm mt-1">{s.tags.join(' · ')}</p>
              </div>
              {'distanceKm' in s && <span className="text-sm">{s.distanceKm}km</span>}
            </div>
            <Link href={`/shop/${s.slug}`} className="inline-block mt-3 underline">상세보기</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
