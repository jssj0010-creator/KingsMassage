import { NextResponse } from 'next/server'

export async function POST(request: Request){
  const body = await request.json().catch(()=>null)
  // TODO: DB 저장 (예: Supabase)
  console.log('[ENTRY_SUBMIT]', body)
  return NextResponse.json({ ok: true })
}
