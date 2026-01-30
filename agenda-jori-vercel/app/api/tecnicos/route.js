import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

const TECNICOS_KEY = 'jori:tecnicos'
const TECNICOS_INICIAL = ['Antônio']

export async function GET() {
  try {
    let tecnicos = await kv.get(TECNICOS_KEY)
    
    // Se não existir, inicializa com Antônio
    if (!tecnicos || tecnicos.length === 0) {
      tecnicos = TECNICOS_INICIAL
      await kv.set(TECNICOS_KEY, tecnicos)
    }
    
    return NextResponse.json(tecnicos)
  } catch (error) {
    console.error('Erro ao buscar técnicos:', error)
    return NextResponse.json(TECNICOS_INICIAL)
  }
}

export async function POST(request) {
  try {
    const { nome } = await request.json()
    let tecnicos = await kv.get(TECNICOS_KEY) || TECNICOS_INICIAL
    
    if (!tecnicos.includes(nome)) {
      tecnicos.push(nome)
      await kv.set(TECNICOS_KEY, tecnicos)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao adicionar técnico:', error)
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const nome = searchParams.get('nome')
    
    let tecnicos = await kv.get(TECNICOS_KEY) || TECNICOS_INICIAL
    tecnicos = tecnicos.filter(t => t !== nome)
    await kv.set(TECNICOS_KEY, tecnicos)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao remover técnico:', error)
    return NextResponse.json({ error: 'Erro ao excluir' }, { status: 500 })
  }
}
