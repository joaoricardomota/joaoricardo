import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

const AGENDAMENTOS_KEY = 'jori:agendamentos'

export async function GET() {
  try {
    const agendamentos = await kv.get(AGENDAMENTOS_KEY) || []
    return NextResponse.json(agendamentos)
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error)
    return NextResponse.json([])
  }
}

export async function POST(request) {
  try {
    const novoAgendamento = await request.json()
    const agendamentos = await kv.get(AGENDAMENTOS_KEY) || []
    agendamentos.push(novoAgendamento)
    await kv.set(AGENDAMENTOS_KEY, agendamentos)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    const agendamentos = await kv.get(AGENDAMENTOS_KEY) || []
    const novosAgendamentos = agendamentos.filter(a => a.id !== id)
    await kv.set(AGENDAMENTOS_KEY, novosAgendamentos)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error)
    return NextResponse.json({ error: 'Erro ao excluir' }, { status: 500 })
  }
}
