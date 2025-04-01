import React from 'react';
import RegisterForm from '@/app/_components/RegisterForm/RegisterForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastro | Lions Inc.',
  description: 'Crie sua conta na Lions Inc. e comece a investir com segurança e rentabilidade.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
