import './globals.css'

export const metadata = {
  title: 'Jori Papel IA - Assistente Inteligente | Grupo Jori Papel',
  description: 'Assistente IA especializado do Grupo Jori Papel. Tire dúvidas sobre produtos, comodato grátis, preços e vendas 24/7. Powered by Claude AI.',
  keywords: 'jori papel, ia, assistente virtual, comodato, santher, papel higienico, papel toalha, dispensers gratis',
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
