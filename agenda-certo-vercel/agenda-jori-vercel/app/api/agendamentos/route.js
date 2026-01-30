import redis from '../../lib/redis'
import { NextResponse } from 'next/server'

const KEY = 'jori:agendamentos'

export async function GET() {
  try {
    const data = await redis.get(KEY)
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('GET agendamentos erro:', error)
    return NextResponse.json({ error: 'Erro ao buscar' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const novo = await request.json()
    
    if (!novo.vendedor || !novo.tecnico || !novo.horario || !novo.data) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
    }
    
    const atual = await redis.get(KEY) || []
    atual.push(novo)
    await redis.set(KEY, atual)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('POST agendamentos erro:', error)
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    const atual = await redis.get(KEY) || []
    const filtrado = atual.filter(a => a.id !== id)
    await redis.set(KEY, filtrado)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE agendamentos erro:', error)
    return NextResponse.json({ error: 'Erro ao excluir' }, { status: 500 })
  }
}
