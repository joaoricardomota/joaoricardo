import './globals.css'

export const metadata = {
  title: 'Jori Papel - Distribuidor Oficial Santher | 40 Anos',
  description: 'Grupo Jori Papel - 40 anos fornecendo produtos Santher no Grande Rio. Comodato GRÁTIS, sem multa, sem mínimo mensal. Dispensers grátis + economia comprovada!',
  keywords: 'papel higienico, papel toalha, dispensers, comodato, santher, personal, inovatta, higiene profissional, rio de janeiro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
