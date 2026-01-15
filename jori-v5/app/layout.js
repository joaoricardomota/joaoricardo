import './globals.css'

export const metadata = {
  title: 'JORI PAPEL - Orçamentos',
  description: 'Sistema de Orçamentos - Distribuidor Santher RJ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  )
}
