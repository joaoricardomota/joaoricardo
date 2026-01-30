import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

const AGENDAMENTOS_KEY = 'jori:agendamentos'

// Fallback para quando KV não está disponível (dev local)
let memoryFallback = []

async function getAgendamentos() {
  try {
    const data = await kv.get(AGENDAMENTOS_KEY)
    return data || []
  } catch (error) {
    console.warn('KV não disponível, usando memória:', error.message)
    return memoryFallback
  }
}

async function setAgendamentos(data) {
  try {
    await kv.set(AGENDAMENTOS_KEY, data)
    return true
  } catch (error) {
    console.warn('KV não disponível, salvando em memória:', error.message)
    memoryFallback = data
    return true
  }
}

export async function GET() {
  try {
    const agendamentos = await getAgendamentos()
    return NextResponse.json(agendamentos)
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error)
    return NextResponse.json([])
  }
}

export async function POST(request) {
  try {
    const novoAgendamento = await request.json()
    
    if (!novoAgendamento.vendedor || !novoAgendamento.tecnico || !novoAgendamento.horario || !novoAgendamento.data) {
      return NextResponse.json({ success: false, error: 'Dados incompletos' }, { status: 400 })
    }
    
    const agendamentos = await getAgendamentos()
    agendamentos.push(novoAgendamento)
    await setAgendamentos(agendamentos)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
    return NextResponse.json({ success: false, error: 'Erro ao salvar no servidor' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID não informado' }, { status: 400 })
    }
    
    const agendamentos = await getAgendamentos()
    const novosAgendamentos = agendamentos.filter(a => a.id !== id)
    await setAgendamentos(novosAgendamentos)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao excluir agendamento:', error)
    return NextResponse.json({ success: false, error: 'Erro ao excluir' }, { status: 500 })
  }
}
