'use client'
import React, { useMemo, useState, useCallback } from 'react'
import { GYEONGGI_CITIES, INCHEON_DISTRICTS, REGIONS, SEOUL_DISTRICTS, SERVICE_TAGS } from '@/lib/constants'

function TagCheckbox({ value, checked, onChange }:{ value:string; checked:boolean; onChange:(v:boolean)=>void }){
  return (
    <label className={`inline-flex items-center gap-2 border rounded-full px-3 py-1 cursor-pointer select-none ${checked?'bg-black text-white':'bg-white'}`}>
      <input type="checkbox" className="hidden" checked={checked} onChange={(e)=>onChange(e.target.checked)} />
      <span className="text-sm">{value}</span>
    </label>
  )
}

export default function AdvertisePage(){
  const [bizType, setBizType] = useState<'homecare'|'roadshop'>('homecare')
  const [tags, setTags] = useState<string[]>([])

  const areaOptions = useMemo(()=> {
    const all = [...SEOUL_DISTRICTS.map(v=>v.replace('구','')), ...GYEONGGI_CITIES, ...INCHEON_DISTRICTS.map(v=>v.replace('구','').replace('군',''))]
    return all
  }, [])

  const toggleTag = useCallback((t:string)=>{
    setTags(prev => prev.includes(t) ? prev.filter(v=>v!==t) : [...prev, t])
  }, [])

  async function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    const payload: Record<string, any> = Object.fromEntries(data.entries())
    payload.tags = tags
    const res = await fetch('/api/submit', { method:'POST', body: JSON.stringify(payload) })
    if(res.ok){ alert('접수되었습니다. 운영자 승인 후 노출됩니다.') }
    else { alert('제출 실패. 잠시 후 다시 시도해주세요.') }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">업체 입점 신청</h1>
      <p className="text-sm opacity-80 mb-6">홈케어/로드샵 유형을 선택하고 필수 정보를 입력해주세요. 운영자 승인 후 노출됩니다.</p>

      <div className="mb-6 inline-flex rounded-xl overflow-hidden border">
        <button onClick={()=>setBizType('homecare')} className={`px-4 py-2 ${bizType==='homecare'?'bg-black text-white':'bg-white'}`}>홈케어</button>
        <button onClick={()=>setBizType('roadshop')} className={`px-4 py-2 ${bizType==='roadshop'?'bg-black text-white':'bg-white'}`}>로드샵</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">상호명*
            <input name="name" required className="mt-1 w-full border rounded-lg p-2" placeholder="예) 츄츄마사지"/>
          </label>
          <label className="block">대표 연락처*
            <input name="phone" required className="mt-1 w-full border rounded-lg p-2" placeholder="010-0000-0000"/>
          </label>
          <label className="block">카카오톡 ID
            <input name="kakao" className="mt-1 w-full border rounded-lg p-2" placeholder="예) msg00100"/>
          </label>
          <label className="block">이메일
            <input type="email" name="email" className="mt-1 w-full border rounded-lg p-2" placeholder="이메일"/>
          </label>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="block">유형*
            <input name="type" readOnly value={bizType} className="mt-1 w-full border rounded-lg p-2 bg-gray-50"/>
          </label>
          <label className="block">지역(시/도)*
            <select name="region" required className="mt-1 w-full border rounded-lg p-2">
              {REGIONS.map(r=> <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
          <label className="block">세부지역(구/군)*
            <input list="area-list" name="area" required className="mt-1 w-full border rounded-lg p-2" placeholder="예) 강남"/>
            <datalist id="area-list">
              {areaOptions.map(a=> <option key={a} value={a} />)}
            </datalist>
          </label>
        </div>

        {bizType === 'roadshop' && (
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block">매장 주소*
              <input name="address" required className="mt-1 w-full border rounded-lg p-2" placeholder="도로명 주소"/>
            </label>
            <label className="block">지도 좌표(lat,lng)
              <input name="geo" className="mt-1 w-full border rounded-lg p-2" placeholder="37.4979, 127.0276"/>
            </label>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">영업시간*
            <input name="open_hours" required className="mt-1 w-full border rounded-lg p-2" placeholder="예) 24시간 / 10:00~04:00"/>
          </label>
          <label className="block">결제수단
            <input name="payments" className="mt-1 w-full border rounded-lg p-2" placeholder="현금, 카드, 계좌이체"/>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">서비스/코스 소개*
            <textarea name="desc" required className="mt-1 w-full border rounded-lg p-2 h-28" placeholder="제공 서비스, 특징, 예약 안내 등"/>
          </label>
          <label className="block">가격표(JSON 또는 텍스트)
            <textarea name="prices" className="mt-1 w-full border rounded-lg p-2 h-28" placeholder='예) {"건식 타이":[{"label":"60분","price":"60,000"}]}'/>
          </label>
        </div>

        <div>
          <div className="mb-2 font-medium">태그</div>
          <div className="flex flex-wrap gap-2">
            {SERVICE_TAGS.map(t=> (
              <TagCheckbox key={t} value={t} checked={tags.includes(t)} onChange={(v)=>toggleTag(t)} />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">대표 이미지
            <input type="url" name="image" className="mt-1 w-full border rounded-lg p-2" placeholder="이미지 URL"/>
          </label>
          <label className="block">웹사이트/SNS
            <input type="url" name="link" className="mt-1 w-full border rounded-lg p-2" placeholder="사이트, 인스타 등"/>
          </label>
        </div>

        <div className="text-xs text-gray-500">제출 시 운영정책/노출기준에 동의한 것으로 간주됩니다.</div>

        <div className="pt-2">
          <button className="px-5 py-3 rounded-xl bg-black text-white">입점 신청하기</button>
        </div>
      </form>
    </main>
  )
}
