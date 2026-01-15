import './globals.css'

export const metadata = {
  title: 'JORI PAPEL - Sistema de Orçamentos',
  description: 'Distribuidor Oficial Santher RJ - 40 Anos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
