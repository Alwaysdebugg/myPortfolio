import { NextResponse } from 'next/server'

export async function GET() {
  console.log('Simple test API called')
  
  try {
    return NextResponse.json({
      message: 'Test API working',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      { error: 'Test failed' },
      { status: 500 }
    )
  }
}