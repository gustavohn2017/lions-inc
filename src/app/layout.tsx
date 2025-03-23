import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import "./_components/shared/responsive-utils.css";
import "./_components/shared/layout-fixes.css";
import "./_components/text-utils.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap" 
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cormorant",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Lions Bank Invest | Investimentos Inteligentes para seu Futuro",
  description: "Soluções financeiras personalizadas com garantia e qualidade superior. Investimentos, Consórcios, Consultoria Financeira e muito mais.",
  keywords: "Lions Bank, Investimentos, Consórcios, Finanças, Planejamento Financeiro, Consultoria Financeira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} font-sans bg-gradient-to-b from-[#111214] to-[#1A1D20] text-white min-h-screen hide-scrollbar`}>
        {children}
      </body>
    </html>
  );
}
