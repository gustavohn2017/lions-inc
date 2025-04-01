import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Lions Bank',
    default: 'Área do Cliente | Lions Bank',
  },
  description: 'Acesse seus investimentos e serviços financeiros no Lions Bank.',
}

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="bg-gradient-to-b from-[#1A1D20] to-[#242729] min-h-screen">
      {children}
    </main>
  );
}
