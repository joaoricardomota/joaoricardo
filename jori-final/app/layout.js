import './globals.css'

export const metadata = {
  title: 'JORI PAPEL - Orçamentos',
  description: 'Sistema de Orçamentos - Distribuidor Santher',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
