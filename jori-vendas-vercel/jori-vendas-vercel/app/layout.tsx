import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jori Papel - Sistema de Gestão de Vendas',
  description: 'Sistema completo de gestão de vendas para distribuidora Santher',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 min-h-screen">{children}</body>
    </html>
  );
}
