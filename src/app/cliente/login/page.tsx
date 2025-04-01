import React from 'react';
import LoginForm from '@/app/_components/LoginForm/LoginForm';

export const metadata = {
  title: 'Login | Lions Bank',
  description: 'Faça login na sua conta de cliente do Lions Bank para acessar seus investimentos e serviços financeiros.',
}

export default function LoginPage() {
  return <LoginForm />;
}
