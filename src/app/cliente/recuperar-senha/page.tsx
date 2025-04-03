"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, AlertCircle, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import '@/components/LoginForm/login-form.css';
import '@/components/recuperar-senha.css';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const validateForm = () => {
    if (!email.trim()) {
      setError('Por favor, insira seu e-mail');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulando sucesso
      setIsSuccess(true);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      setError('Ocorreu um erro ao solicitar a recuperação de senha. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-form-card password-reset-card"
      >
        <Link href="/cliente/login" className="back-link">
          <ArrowLeft size={16} />
          <span>Voltar para o login</span>
        </Link>
        
        <div className="login-header">
          <h2 className="login-title">Recuperar Senha</h2>
          <div className="login-title-underline"></div>
          <p className="login-subtitle">
            {!isSuccess 
              ? 'Digite seu e-mail cadastrado para receber instruções de recuperação'
              : 'E-mail de recuperação enviado com sucesso'}
          </p>
        </div>
        
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="login-error-alert">
                <AlertCircle className="error-icon" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email" className="login-label">
                E-mail
              </label>
              <div className={`input-container ${error ? 'error' : ''}`}>
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className="login-input"
                  placeholder="Seu e-mail cadastrado"
                  disabled={isSubmitting}
                  autoComplete="email"
                />
              </div>
              {error && <p className="error-message">{error}</p>}
            </div>
            
            <button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <span>Enviar instruções</span>
              )}
            </button>
          </form>
        ) : (
          <div className="success-container">
            <div className="success-icon-wrapper">
              <Check size={32} className="success-icon" />
            </div>
            <h3 className="success-title">E-mail enviado!</h3>
            <p className="success-message">
              Enviamos as instruções de recuperação para o e-mail <strong>{email}</strong>. 
              Por favor, verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            </p>
            <p className="success-note">
              Não recebeu? Verifique sua pasta de spam ou tente novamente em alguns minutos.
            </p>
            <Link href="/cliente/login" className="return-login-button">
              <span>Voltar para o login</span>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
