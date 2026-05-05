import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { business_name, role, email, phone, notes } = body

  if (!business_name || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const db = createAdminClient()
  const { error } = await db
    .from('claims')
    .insert({ business_name, role, email, phone, notes })

  if (error) {
    console.error('Supabase error:', error.message)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
