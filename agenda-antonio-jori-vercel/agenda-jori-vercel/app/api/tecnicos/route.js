import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

const TECNICOS_KEY = 'jori:tecnicos'
const TECNICOS_INICIAL = ['Antônio']

// Fallback para quando KV não está disponível (dev local)
let memoryFallback = [...TECNICOS_INICIAL]

async function getTecnicos() {
  try {
    const data = await kv.get(TECNICOS_KEY)
    if (!data || data.length === 0) {
      await kv.set(TECNICOS_KEY, TECNICOS_INICIAL)
      return TECNICOS_INICIAL
    }
    return data
  } catch (error) {
    console.warn('KV não disponível, usando memória:', error.message)
    return memoryFallback
  }
}

async function setTecnicos(data) {
  try {
    await kv.set(TECNICOS_KEY, data)
    return true
  } catch (error) {
    console.warn('KV não disponível, salvando em memória:', error.message)
    memoryFallback = data
    return true
  }
}

export async function GET() {
  try {
    const tecnicos = await getTecnicos()
    return NextResponse.json(tecnicos)
  } catch (error) {
    console.error('Erro ao buscar técnicos:', error)
    return NextResponse.json(TECNICOS_INICIAL)
  }
}

export async function POST(request) {
  try {
    const { nome } = await request.json()
    
    if (!nome || !nome.trim()) {
      return NextResponse.json({ success: false, error: 'Nome não informado' }, { status: 400 })
    }
    
    const tecnicos = await getTecnicos()
    
    if (tecnicos.includes(nome.trim())) {
      return NextResponse.json({ success: false, error: 'Técnico já cadastrado' }, { status: 400 })
    }
    
    tecnicos.push(nome.trim())
    await setTecnicos(tecnicos)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao adicionar técnico:', error)
    return NextResponse.json({ success: false, error: 'Erro ao salvar' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const nome = searchParams.get('nome')
    
    if (!nome) {
      return NextResponse.json({ success: false, error: 'Nome não informado' }, { status: 400 })
    }
    
    let tecnicos = await getTecnicos()
    tecnicos = tecnicos.filter(t => t !== nome)
    await setTecnicos(tecnicos)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao remover técnico:', error)
    return NextResponse.json({ success: false, error: 'Erro ao excluir' }, { status: 500 })
  }
}
