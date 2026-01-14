import './globals.css'

export const metadata = {
  title: 'Jori Papel PRO - Assistente IA + Gerador de Propostas',
  description: 'Sistema completo do Grupo Jori Papel: Assistente IA especializado + Gerador profissional de propostas em PDF. Powered by Claude AI.',
  keywords: 'jori papel, ia, assistente virtual, comodato, santher, proposta comercial, pdf',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
