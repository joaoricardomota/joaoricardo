import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JORI PAPEL - Sistema de Orçamentos",
  description: "Sistema profissional de geração de orçamentos para distribuidora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
