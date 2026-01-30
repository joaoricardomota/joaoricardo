export const metadata = {
  title: 'Agenda de Visitas - Jori Papel',
  description: 'Sistema de agendamento de visitas técnicas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
