"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import './login-form.css';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Insira seu e-mail ou CPF';
    }
    
    if (!formData.password) {
      newErrors.password = 'Insira sua senha';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionamento aconteceria após autenticação bem-sucedida
      console.log('Login bem-sucedido', formData);
      
      // Aqui você redirecionaria o usuário para a dashboard após login
      // router.push('/cliente/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({
        form: 'Falha na autenticação. Verifique suas credenciais e tente novamente.'
      });
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
        className="login-form-card"
      >
        <Link href="/" className="back-to-home">
          <ArrowLeft size={16} />
          <span>Voltar para a página inicial</span>
        </Link>
        
        <div className="login-header">
          <h2 className="login-title">Área do Cliente</h2>
          <div className="login-title-underline"></div>
          <p className="login-subtitle">Acesse sua conta!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {errors.form && (
            <div className="login-error-alert">
              <AlertCircle className="error-icon" />
              <span>{errors.form}</span>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="identifier" className="login-label">
              E-mail ou CPF
            </label>
            <div className={`input-container ${errors.identifier ? 'error' : ''}`}>
              <User className="input-icon" />
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className="login-input"
                placeholder="Seu e-mail ou CPF"
                autoComplete="username"
              />
            </div>
            {errors.identifier && <p className="error-message">{errors.identifier}</p>}
          </div>
          
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password" className="login-label">
                Senha
              </label>
              <Link href="/cliente/recuperar-senha" className="forgot-password-link">
                Esqueci minha senha
              </Link>
            </div>
            <div className={`input-container ${errors.password ? 'error' : ''}`}>
              <Lock className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="login-input"
                placeholder="Sua senha"
                autoComplete="current-password"
              />
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          
          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                <span>Entrando...</span>
              </>
            ) : (
              <>
                <span>Entrar</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
        
        <div className="register-section">
          <p className="register-text">
            Ainda não tem uma conta?
          </p>
          <Link href="/cliente/cadastro" className="register-link-button">
            Criar conta
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
