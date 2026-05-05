import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { business_name, category, service_area, budget, phone } = body

  if (!business_name || !category || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const db = createAdminClient()
  const { error } = await db
    .from('advertise_applications')
    .insert({ business_name, category, service_area, budget, phone })

  if (error) {
    console.error('Supabase error:', error.message)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
