import './globals.css'

export const metadata = {
  title: 'Jori Papel IA - Distribuidor Oficial Santher RJ',
  description: 'Assistente virtual da Jori Papel - 40 anos de excelência em higiene profissional. Comodato grátis de dispensers, produtos Santher com até 25% de desconto.',
  keywords: 'jori papel, santher, comodato, papel higiênico, papel toalha, dispenser, higiene profissional, rio de janeiro',
  openGraph: {
    title: 'Jori Papel IA - Distribuidor Oficial Santher RJ',
    description: 'Assistente virtual - Comodato grátis + Até 25% OFF em produtos Santher',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
