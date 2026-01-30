import redis from '../../lib/redis'
import { NextResponse } from 'next/server'

const KEY = 'jori:tecnicos'
const INICIAL = ['Antônio']

export async function GET() {
  try {
    let data = await redis.get(KEY)
    
    if (!data || data.length === 0) {
      await redis.set(KEY, INICIAL)
      data = INICIAL
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('GET tecnicos erro:', error)
    return NextResponse.json(INICIAL)
  }
}

export async function POST(request) {
  try {
    const { nome } = await request.json()
    
    if (!nome?.trim()) {
      return NextResponse.json({ error: 'Nome vazio' }, { status: 400 })
    }
    
    const atual = await redis.get(KEY) || INICIAL
    
    if (!atual.includes(nome.trim())) {
      atual.push(nome.trim())
      await redis.set(KEY, atual)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('POST tecnicos erro:', error)
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const nome = searchParams.get('nome')
    
    const atual = await redis.get(KEY) || INICIAL
    const filtrado = atual.filter(t => t !== nome)
    await redis.set(KEY, filtrado)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE tecnicos erro:', error)
    return NextResponse.json({ error: 'Erro ao excluir' }, { status: 500 })
  }
}
