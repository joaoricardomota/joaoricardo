'use client'

import { useState, useEffect } from 'react'

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const HORARIOS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
const MOTIVOS = ['Visita Técnica', 'Manutenção', 'Instalação']

export default function Home() {
  const [dataSelecionada, setDataSelecionada] = useState(null)
  const [agendamentos, setAgendamentos] = useState([])
  const [tecnicos, setTecnicos] = useState([])
  const [novoTecnico, setNovoTecnico] = useState('')
  const [mostrarGerenciar, setMostrarGerenciar] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const [form, setForm] = useState({
    vendedor: '',
    tecnico: '',
    horario: '',
    motivo: 'Visita Técnica',
    observacao: ''
  })

  const hoje = new Date()
  const mesAtual = hoje.getMonth()
  const anoAtual = hoje.getFullYear()

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      const [resAgend, resTec] = await Promise.all([
        fetch('/api/agendamentos'),
        fetch('/api/tecnicos')
      ])
      const agend = await resAgend.json()
      const tec = await resTec.json()
      setAgendamentos(agend)
      setTecnicos(tec)
    } catch (err) {
      console.error('Erro ao carregar:', err)
    } finally {
      setCarregando(false)
    }
  }

  function getDiasDoMes(mes, ano) {
    const primeiroDia = new Date(ano, mes, 1)
    const ultimoDia = new Date(ano, mes + 1, 0)
    const dias = []
    
    for (let i = 0; i < primeiroDia.getDay(); i++) {
      dias.push(null)
    }
    
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push(new Date(ano, mes, i))
    }
    
    return dias
  }

  function formatarData(data) {
    return data.toISOString().split('T')[0]
  }

  function contarAgendamentos(data) {
    const dataStr = formatarData(data)
    return agendamentos.filter(a => a.data === dataStr).length
  }

  function agendamentosDoDia() {
    if (!dataSelecionada) return []
    const dataStr = formatarData(dataSelecionada)
    return agendamentos.filter(a => a.data === dataStr).sort((a, b) => a.horario.localeCompare(b.horario))
  }

  async function handleAgendar(e) {
    e.preventDefault()
    if (!dataSelecionada || !form.vendedor || !form.tecnico || !form.horario) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    const novoAgendamento = {
      id: Date.now().toString(),
      data: formatarData(dataSelecionada),
      ...form
    }

    try {
      const res = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoAgendamento)
      })
      
      if (res.ok) {
        setAgendamentos([...agendamentos, novoAgendamento])
        setForm({ vendedor: '', tecnico: '', horario: '', motivo: 'Visita Técnica', observacao: '' })
      }
    } catch (err) {
      console.error('Erro ao agendar:', err)
    }
  }

  async function handleExcluir(id) {
    if (!confirm('Excluir este agendamento?')) return
    
    try {
      const res = await fetch(`/api/agendamentos?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setAgendamentos(agendamentos.filter(a => a.id !== id))
      }
    } catch (err) {
      console.error('Erro ao excluir:', err)
    }
  }

  async function handleAdicionarTecnico() {
    if (!novoTecnico.trim()) return
    
    try {
      const res = await fetch('/api/tecnicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoTecnico.trim() })
      })
      
      if (res.ok) {
        setTecnicos([...tecnicos, novoTecnico.trim()])
        setNovoTecnico('')
      }
    } catch (err) {
      console.error('Erro ao adicionar técnico:', err)
    }
  }

  async function handleRemoverTecnico(nome) {
    if (!confirm(`Remover ${nome}?`)) return
    
    try {
      const res = await fetch(`/api/tecnicos?nome=${encodeURIComponent(nome)}`, { method: 'DELETE' })
      if (res.ok) {
        setTecnicos(tecnicos.filter(t => t !== nome))
      }
    } catch (err) {
      console.error('Erro ao remover técnico:', err)
    }
  }

  function renderCalendario(mes, ano) {
    const dias = getDiasDoMes(mes, ano)
    
    return (
      <div style={styles.calendario}>
        <h3 style={styles.mesNome}>{MESES[mes]} {ano}</h3>
        <div style={styles.diasSemana}>
          {DIAS_SEMANA.map(d => <div key={d} style={styles.diaSemana}>{d}</div>)}
        </div>
        <div style={styles.diasGrid}>
          {dias.map((dia, i) => {
            if (!dia) return <div key={`empty-${i}`} style={styles.diaVazio} />
            
            const isHoje = dia.toDateString() === hoje.toDateString()
            const isSelecionado = dataSelecionada && dia.toDateString() === dataSelecionada.toDateString()
            const count = contarAgendamentos(dia)
            const isPast = dia < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
            
            return (
              <div
                key={dia.toISOString()}
                onClick={() => !isPast && setDataSelecionada(dia)}
                style={{
                  ...styles.dia,
                  ...(isHoje && styles.diaHoje),
                  ...(isSelecionado && styles.diaSelecionado),
                  ...(isPast && styles.diaPassado),
                  cursor: isPast ? 'default' : 'pointer'
                }}
              >
                <span>{dia.getDate()}</span>
                {count > 0 && <span style={styles.badge}>{count}</span>}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (carregando) {
    return <div style={styles.container}><p style={styles.carregando}>Carregando...</p></div>
  }

  const proximoMes = mesAtual === 11 ? 0 : mesAtual + 1
  const anoProximoMes = mesAtual === 11 ? anoAtual + 1 : anoAtual

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.titulo}>📅 Agenda de Visitas Técnicas</h1>
        <p style={styles.subtitulo}>Jori Papel</p>
        <button 
          onClick={() => setMostrarGerenciar(!mostrarGerenciar)}
          style={styles.btnGerenciar}
        >
          ⚙️ Gerenciar Técnicos
        </button>
      </header>

      {mostrarGerenciar && (
        <div style={styles.gerenciarBox}>
          <h3 style={styles.gerenciarTitulo}>Técnicos Cadastrados</h3>
          <div style={styles.tecnicosList}>
            {tecnicos.map(t => (
              <div key={t} style={styles.tecnicoItem}>
                <span>{t}</span>
                <button onClick={() => handleRemoverTecnico(t)} style={styles.btnRemover}>✕</button>
              </div>
            ))}
          </div>
          <div style={styles.addTecnico}>
            <input
              type="text"
              value={novoTecnico}
              onChange={e => setNovoTecnico(e.target.value)}
              placeholder="Nome do técnico"
              style={styles.input}
            />
            <button onClick={handleAdicionarTecnico} style={styles.btnAdd}>Adicionar</button>
          </div>
        </div>
      )}

      <div style={styles.calendarios}>
        {renderCalendario(mesAtual, anoAtual)}
        {renderCalendario(proximoMes, anoProximoMes)}
      </div>

      {dataSelecionada && (
        <div style={styles.painelDia}>
          <h2 style={styles.dataSelecionada}>
            {dataSelecionada.getDate()} de {MESES[dataSelecionada.getMonth()]}
          </h2>

          <form onSubmit={handleAgendar} style={styles.form}>
            <div style={styles.formGrid}>
              <input
                type="text"
                placeholder="Vendedor *"
                value={form.vendedor}
                onChange={e => setForm({...form, vendedor: e.target.value})}
                style={styles.input}
                required
              />
              <select
                value={form.tecnico}
                onChange={e => setForm({...form, tecnico: e.target.value})}
                style={styles.input}
                required
              >
                <option value="">Selecione o técnico *</option>
                {tecnicos.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <select
                value={form.horario}
                onChange={e => setForm({...form, horario: e.target.value})}
                style={styles.input}
                required
              >
                <option value="">Horário *</option>
                {HORARIOS.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              <select
                value={form.motivo}
                onChange={e => setForm({...form, motivo: e.target.value})}
                style={styles.input}
              >
                {MOTIVOS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <textarea
              placeholder="Observações (opcional)"
              value={form.observacao}
              onChange={e => setForm({...form, observacao: e.target.value})}
              style={{...styles.input, ...styles.textarea}}
            />
            <button type="submit" style={styles.btnAgendar}>Agendar Visita</button>
          </form>

          <div style={styles.listaAgendamentos}>
            <h3 style={styles.listaTitulo}>Agendamentos do dia</h3>
            {agendamentosDoDia().length === 0 ? (
              <p style={styles.semAgendamentos}>Nenhum agendamento</p>
            ) : (
              agendamentosDoDia().map(a => (
                <div key={a.id} style={styles.agendamentoItem}>
                  <div style={styles.agendamentoInfo}>
                    <span style={styles.horarioTag}>{a.horario}</span>
                    <span style={styles.motivoTag}>{a.motivo}</span>
                  </div>
                  <div style={styles.agendamentoDetalhes}>
                    <p><strong>Técnico:</strong> {a.tecnico}</p>
                    <p><strong>Vendedor:</strong> {a.vendedor}</p>
                    {a.observacao && <p style={styles.obs}>{a.observacao}</p>}
                  </div>
                  <button onClick={() => handleExcluir(a.id)} style={styles.btnExcluir}>🗑️</button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#FAF7F5',
    padding: '20px',
    fontFamily: 'Inter, sans-serif'
  },
  carregando: {
    textAlign: 'center',
    padding: '50px',
    color: '#8B7355'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    position: 'relative'
  },
  titulo: {
    color: '#5D4E37',
    fontSize: '28px',
    marginBottom: '5px'
  },
  subtitulo: {
    color: '#8B7355',
    fontSize: '16px'
  },
  btnGerenciar: {
    position: 'absolute',
    right: '0',
    top: '0',
    padding: '8px 16px',
    backgroundColor: '#D4C4B0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#5D4E37',
    fontSize: '14px'
  },
  gerenciarBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  gerenciarTitulo: {
    color: '#5D4E37',
    marginBottom: '15px'
  },
  tecnicosList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '15px'
  },
  tecnicoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#EDE8E3',
    padding: '8px 12px',
    borderRadius: '20px',
    color: '#5D4E37'
  },
  btnRemover: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#A67B5B',
    fontSize: '14px'
  },
  addTecnico: {
    display: 'flex',
    gap: '10px'
  },
  btnAdd: {
    padding: '10px 20px',
    backgroundColor: '#A67B5B',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  calendarios: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '30px'
  },
  calendario: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    minWidth: '320px'
  },
  mesNome: {
    textAlign: 'center',
    color: '#5D4E37',
    marginBottom: '15px',
    fontSize: '18px'
  },
  diasSemana: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '5px',
    marginBottom: '10px'
  },
  diaSemana: {
    textAlign: 'center',
    color: '#8B7355',
    fontSize: '12px',
    fontWeight: '600'
  },
  diasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '5px'
  },
  diaVazio: {
    height: '40px'
  },
  dia: {
    height: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    backgroundColor: '#FAF7F5',
    color: '#5D4E37',
    fontSize: '14px',
    position: 'relative',
    transition: 'all 0.2s'
  },
  diaHoje: {
    backgroundColor: '#D4C4B0',
    fontWeight: '700'
  },
  diaSelecionado: {
    backgroundColor: '#A67B5B',
    color: '#fff'
  },
  diaPassado: {
    opacity: 0.4
  },
  badge: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    backgroundColor: '#C4A77D',
    color: '#fff',
    fontSize: '10px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  painelDia: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    maxWidth: '700px',
    margin: '0 auto'
  },
  dataSelecionada: {
    color: '#5D4E37',
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    marginBottom: '25px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
    marginBottom: '12px'
  },
  input: {
    padding: '12px',
    border: '2px solid #EDE8E3',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  textarea: {
    minHeight: '80px',
    resize: 'vertical',
    marginBottom: '12px'
  },
  btnAgendar: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#A67B5B',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  listaAgendamentos: {
    borderTop: '2px solid #EDE8E3',
    paddingTop: '20px'
  },
  listaTitulo: {
    color: '#5D4E37',
    marginBottom: '15px'
  },
  semAgendamentos: {
    color: '#8B7355',
    textAlign: 'center',
    padding: '20px'
  },
  agendamentoItem: {
    backgroundColor: '#FAF7F5',
    padding: '15px',
    borderRadius: '12px',
    marginBottom: '10px',
    position: 'relative'
  },
  agendamentoInfo: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px'
  },
  horarioTag: {
    backgroundColor: '#A67B5B',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  motivoTag: {
    backgroundColor: '#D4C4B0',
    color: '#5D4E37',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px'
  },
  agendamentoDetalhes: {
    color: '#5D4E37',
    fontSize: '14px'
  },
  obs: {
    color: '#8B7355',
    fontStyle: 'italic',
    marginTop: '5px'
  },
  btnExcluir: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    opacity: 0.6
  }
}
