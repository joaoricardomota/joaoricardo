import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jori Papel - Gestão de Leads',
  description: 'Sistema de gestão de leads da Jori Papel - Distribuidor Santher',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
