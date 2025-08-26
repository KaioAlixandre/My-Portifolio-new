import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Importa seu CSS global

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfólio - Kaio",
  description: "Portfólio de desenvolvimento de Kaio Alixandre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        {/* Links para fontes e ícones */}
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </head>
      <body className={inter.className}>
        {/* O conteúdo da sua page.tsx será renderizado aqui */}
        {children}
      </body>
    </html>
  );
}