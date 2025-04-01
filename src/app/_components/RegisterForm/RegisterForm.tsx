"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Lock, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './register-form.css';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // Personal data
    fullName: '',
    cpf: '',
    rg: '',
    birthDate: '',
    gender: '',
    nationality: 'Brasileira',
    maritalStatus: '',
    
    // Contact info
    email: '',
    phone: '',
    mobilePhone: '',
    
    // Address
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    
    // Financial info
    profession: '',
    monthlyIncome: '',
    incomeProofFile: null as File | null,
    
    // Security
    password: '',
    confirmPassword: '',
    
    // LGPD & Terms
    acceptTerms: false,
    acceptDataCollection: false,
    acceptMarketingEmails: false
  });
  
  // Form errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // File change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        incomeProofFile: e.target.files[0]
      });
    }
  };
  
  // Input masking functions
  const maskCPF = (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };
  
  const maskRG = (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{1})\d+?$/, '$1');
  };
  
  const maskPhone = (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };
  
  const maskZipCode = (value: string): string => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };
  
  const maskCurrency = (value: string): string => {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
    return value;
  };
  
  // Special input change handlers with masks
  const handleMaskedChange = (e: React.ChangeEvent<HTMLInputElement>, maskFunction: (value: string) => string) => {
    const { name, value } = e.target;
    const maskedValue = maskFunction(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: maskedValue
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Form validation for each step
  const validateStep = (currentStep: number): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (currentStep === 1) {
      // Personal data validation
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Nome completo é obrigatório';
      } else if (formData.fullName.trim().split(' ').length < 2) {
        newErrors.fullName = 'Informe nome e sobrenome';
      }
      
      if (!formData.cpf.trim()) {
        newErrors.cpf = 'CPF é obrigatório';
      } else if (formData.cpf.replace(/\D/g, '').length !== 11) {
        newErrors.cpf = 'CPF inválido';
      }
      
      if (!formData.rg.trim()) {
        newErrors.rg = 'RG é obrigatório';
      }
      
      if (!formData.birthDate) {
        newErrors.birthDate = 'Data de nascimento é obrigatória';
      } else {
        const birthDate = new Date(formData.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (
          age < 18 || 
          (age === 18 && 
            (today.getMonth() < birthDate.getMonth() || 
              (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()))
          )
        ) {
          newErrors.birthDate = 'É necessário ter pelo menos 18 anos';
        }
      }
      
      if (!formData.gender) {
        newErrors.gender = 'Gênero é obrigatório';
      }
      
      if (!formData.maritalStatus) {
        newErrors.maritalStatus = 'Estado civil é obrigatório';
      }
    } else if (currentStep === 2) {
      // Contact validation
      if (!formData.email.trim()) {
        newErrors.email = 'E-mail é obrigatório';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'E-mail inválido';
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Telefone é obrigatório';
      } else if (formData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Telefone inválido';
      }
      
      if (formData.mobilePhone && formData.mobilePhone.replace(/\D/g, '').length < 11) {
        newErrors.mobilePhone = 'Celular inválido';
      }
      
      // Address validation
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = 'CEP é obrigatório';
      } else if (formData.zipCode.replace(/\D/g, '').length !== 8) {
        newErrors.zipCode = 'CEP inválido';
      }
      
      if (!formData.street.trim()) {
        newErrors.street = 'Rua é obrigatória';
      }
      
      if (!formData.number.trim()) {
        newErrors.number = 'Número é obrigatório';
      }
      
      if (!formData.neighborhood.trim()) {
        newErrors.neighborhood = 'Bairro é obrigatório';
      }
      
      if (!formData.city.trim()) {
        newErrors.city = 'Cidade é obrigatória';
      }
      
      if (!formData.state.trim()) {
        newErrors.state = 'Estado é obrigatório';
      }
    } else if (currentStep === 3) {
      // Financial info validation
      if (!formData.profession.trim()) {
        newErrors.profession = 'Profissão é obrigatória';
      }
      
      if (!formData.monthlyIncome.trim()) {
        newErrors.monthlyIncome = 'Renda mensal é obrigatória';
      }
      
      // Password validation
      if (!formData.password) {
        newErrors.password = 'Senha é obrigatória';
      } else if (formData.password.length < 8) {
        newErrors.password = 'A senha deve ter pelo menos 8 caracteres';
      } else if (!/(?=.*[a-z])/.test(formData.password)) {
        newErrors.password = 'A senha deve conter pelo menos uma letra minúscula';
      } else if (!/(?=.*[A-Z])/.test(formData.password)) {
        newErrors.password = 'A senha deve conter pelo menos uma letra maiúscula';
      } else if (!/(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'A senha deve conter pelo menos um número';
      } else if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
        newErrors.password = 'A senha deve conter pelo menos um caractere especial (@$!%*?&)';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirme sua senha';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem';
      }
      
      // Terms validation
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Você deve aceitar os termos de uso';
      }
      
      if (!formData.acceptDataCollection) {
        newErrors.acceptDataCollection = 'Você deve aceitar a política de privacidade';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handler for next step button
  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handler for previous step button
  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'incomeProofFile') {
          formDataToSend.append(key, String(value));
        }
      });
      
      // Add file if exists
      if (formData.incomeProofFile) {
        formDataToSend.append('incomeProofFile', formData.incomeProofFile);
      }
      
      // Simulate API call - in a real app, this would be a fetch or axios call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setRegistrationSuccess(true);
      
      // After 3 seconds, redirect to login page
      setTimeout(() => {
        router.push('/cliente/login');
      }, 3000);
      
    } catch (error) {
      console.error('Error during registration:', error);
      setErrors({
        form: 'Ocorreu um erro ao processar seu cadastro. Por favor, tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Lookup CEP (ZIP code) information
  const lookupCEP = async () => {
    if (formData.zipCode.replace(/\D/g, '').length !== 8) {
      setErrors(prev => ({ ...prev, zipCode: 'CEP inválido' }));
      return;
    }
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${formData.zipCode.replace(/\D/g, '')}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setErrors(prev => ({ ...prev, zipCode: 'CEP não encontrado' }));
      } else {
        setFormData(prev => ({
          ...prev,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setErrors(prev => ({ ...prev, zipCode: 'Erro ao buscar CEP' }));
    }
  };
  
  // Progress bar calculation
  const progressPercentage = (step / 3) * 100;
  
  return (
    <div className="register-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="register-form-card"
      >
        {registrationSuccess ? (
          <div className="registration-success">
            <div className="success-icon-wrapper">
              <CheckCircle size={60} className="success-icon" />
            </div>
            <h2 className="success-title">Cadastro Realizado!</h2>
            <p className="success-message">
              Seu cadastro foi realizado com sucesso. Você será redirecionado para a página de login em instantes.
            </p>
          </div>
        ) : (
          <>
            <Link href="/cliente/login" className="back-to-login">
              <ArrowLeft size={16} />
              <span>Voltar para o login</span>
            </Link>
            
            <div className="register-header">
              <h2 className="register-title">Criar Conta</h2>
              <div className="register-title-underline"></div>
              <p className="register-subtitle">Complete seu cadastro para começar a investir</p>
            </div>
            
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="step-indicators">
                <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1</div>
                <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2</div>
                <div className={`step-indicator ${step >= 3 ? 'active' : ''}`}>3</div>
              </div>
              <div className="step-labels">
                <div className="step-label">Dados Pessoais</div>
                <div className="step-label">Contato e Endereço</div>
                <div className="step-label">Dados Financeiros</div>
              </div>
            </div>
            
            {errors.form && (
              <div className="register-error-alert">
                <AlertCircle className="error-icon" />
                <span>{errors.form}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="register-form">
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="form-step"
                >
                  <h3 className="step-title">Dados Pessoais</h3>
                  
                  <div className="form-group">
                    <label htmlFor="fullName" className="register-label">
                      Nome Completo <span className="required">*</span>
                    </label>
                    <div className={`input-container ${errors.fullName ? 'error' : ''}`}>
                      <User className="input-icon" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="register-input"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cpf" className="register-label">
                        CPF <span className="required">*</span>
                      </label>
                      <div className={`input-container ${errors.cpf ? 'error' : ''}`}>
                        <FileText className="input-icon" />
                        <input
                          type="text"
                          id="cpf"
                          name="cpf"
                          value={formData.cpf}
                          onChange={(e) => handleMaskedChange(e, maskCPF)}
                          className="register-input"
                          placeholder="000.000.000-00"
                          maxLength={14}
                        />
                      </div>
                      {errors.cpf && <p className="error-message">{errors.cpf}</p>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="rg" className="register-label">
                        RG <span className="required">*</span>
                      </label>
                      <div className={`input-container ${errors.rg ? 'error' : ''}`}>
                        <FileText className="input-icon" />
                        <input
                          type="text"
                          id="rg"
                          name="rg"
                          value={formData.rg}
                          onChange={(e) => handleMaskedChange(e, maskRG)}
                          className="register-input"
                          placeholder="00.000.000-0"
                          maxLength={12}
                        />
                      </div>
                      {errors.rg && <p className="error-message">{errors.rg}</p>}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="birthDate" className="register-label">
                        Data de Nascimento <span className="required">*</span>
                      </label>
                      <div className={`input-container ${errors.birthDate ? 'error' : ''}`}>
                        <Calendar className="input-icon" />
                        <input
                          type="date"
                          id="birthDate"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                          className="register-input date-input"
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      {errors.birthDate && <p className="error-message">{errors.birthDate}</p>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="gender" className="register-label">
                        Gênero <span className="required">*</span>
                      </label>
                      <div className={`input-container ${errors.gender ? 'error' : ''}`}>
                        <User className="input-icon" />
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="register-input"
                        >
                          <option value="">Selecione</option>
                          <option value="masculino">Masculino</option>
                          <option value="feminino">Feminino</option>
                          <option value="outro">Outro</option>
                          <option value="naoInformar">Prefiro não informar</option>
                        </select>
                      </div>
                      {errors.gender && <p className="error-message">{errors.gender}</p>}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nationality" className="register-label">
                        Nacionalidade <span className="required">*</span>
                      </label>
                      <div className={`input-container ${errors.nationality ? 'error' : ''}`}>
                        <MapPin className="input-icon" />
                        <input
                          type="text"
                          id="nationality"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleChange}
                          className="register-input"
                          placeholder="Sua nacionalidade"
                        />
                      </div>
                      {errors.nationality && <p className="error-message">{errors.nationality}</p>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="maritalStatus" className="register-label">
                        Estado Civil <span className="required">*</span>
                      </label>
                      <div className={`input-container ${errors.maritalStatus ? 'error' : ''}`}>
                        <User className="input-icon" />
                        <select
                          id="maritalStatus"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleChange}
                          className="register-input"
                        >
                          <option value="">Selecione</option>
                          <option value="solteiro">Solteiro(a)</option>
                          <option value="casado">Casado(a)</option>
                          <option value="divorciado">Divorciado(a)</option>
                          <option value="viuvo">Viúvo(a)</option>
                          <option value="uniaoEstavel">União Estável</option>
                        </select>
                      </div>
                      {errors.maritalStatus && <p className="error-message">{errors.maritalStatus}</p>}
                    </div>
                  </div>
                  
                  <div className="form-navigation">
                    <button
                      type="button"
                      className="next-button"
                      onClick={handleNextStep}
                    >
                      Continuar
                    </button>
                  </div>
                </motion.div>
              )}
              
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="form-step"
                >
                  <h3 className="step-title">Contato e Endereço</h3>
                  
                  <div className="form-section">
                    <h4 className="section-subtitle">Informações de Contato</h4>
                    <div className="form-group">
                      <label htmlFor="email" className="register-label">
                        E-mail <span className="required">*</span>
                      </label>
                      <div className={`input-container ${errors.email ? 'error' : ''}`}>
                        <Mail className="input-icon" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="register-input"
                          placeholder="seu@email.com"
                        />
                      </div>
                      {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone" className="register-label">
                          Telefone <span className="required">*</span>
                        </label>
                        <div className={`input-container ${errors.phone ? 'error' : ''}`}>
                          <Phone className="input-icon" />
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => handleMaskedChange(e, maskPhone)}
                            className="register-input"
                            placeholder="(00) 0000-0000"
                            maxLength={14}
                          />
                        </div>
                        {errors.phone && <p className="error-message">{errors.phone}</p>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="mobilePhone" className="register-label">
                          Celular
                        </label>
                        <div className={`input-container ${errors.mobilePhone ? 'error' : ''}`}>
                          <Phone className="input-icon" />
                          <input
                            type="text"
                            id="mobilePhone"
                            name="mobilePhone"
                            value={formData.mobilePhone}
                            onChange={(e) => handleMaskedChange(e, maskPhone)}
                            className="register-input"
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                          />
                        </div>
                        {errors.mobilePhone && <p className="error-message">{errors.mobilePhone}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h4 className="section-subtitle">Endereço</h4>
                    
                    <div className="form-group">
                      <label htmlFor="zipCode" className="register-label">
                        CEP <span className="required">*</span>
                      </label>
                      <div className={`input-container ${errors.zipCode ? 'error' : ''}`}>
                        <MapPin className="input-icon" />
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleMaskedChange(e, maskZipCode)}
                          className="register-input"
                          placeholder="00000-000"
                          maxLength={9}
                        />
                        <button 
                          type="button" 
                          onClick={lookupCEP}
                          className="cep-lookup-button"
                        >
                          Buscar
                        </button>
                      </div>
                      {errors.zipCode && <p className="error-message">{errors.zipCode}</p>}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group street-group">
                        <label htmlFor="street" className="register-label">
                          Rua <span className="required">*</span>
                        </label>
                        <div className={`input-container ${errors.street ? 'error' : ''}`}>
                          <MapPin className="input-icon" />
                          <input
                            type="text"
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className="register-input"
                            placeholder="Nome da rua"
                          />
                        </div>
                        {errors.street && <p className="error-message">{errors.street}</p>}
                      </div>
                      
                      <div className="form-group number-group">
                        <label htmlFor="number" className="register-label">
                          Número <span className="required">*</span>
                        </label>
                        <div className={`input-container ${errors.number ? 'error' : ''}`}>
                          <MapPin className="input-icon" />
                          <input
                            type="text"
                            id="number"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            className="register-input"
                            placeholder="Nº"
                          />
                        </div>
                        {errors.number && <p className="error-message">{errors.number}</p>}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="complement" className="register-label">
                        Complemento
                      </label>
                      <div className={`input-container ${errors.complement ? 'error' : ''}`}>
                        <MapPin className="input-icon" />
                        <input
                          type="text"
                          id="complement"
                          name="complement"
                          value={formData.complement}
                          onChange={handleChange}
                          className="register-input"
                          placeholder="Apto, Bloco, etc."
                        />
                      </div>
                      {errors.complement && <p className="error-message">{errors.complement}</p>}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="neighborhood" className="register-label">
                          Bairro <span className="required">*</span>
                        </label>
                        <div className={`input-container ${errors.neighborhood ? 'error' : ''}`}>
                          <MapPin className="input-icon" />
                          <input
                            type="text"
                            id="neighborhood"
                            name="neighborhood"
                            value={formData.neighborhood}
                            onChange={handleChange}
                            className="register-input"
                            placeholder="Seu bairro"
                          />
                        </div>
                        {errors.neighborhood && <p className="error-message">{errors.neighborhood}</p>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="city" className="register-label">
                          Cidade <span className="required">*</span>
                        </label>
                        <div className={`input-container ${errors.city ? 'error' : ''}`}>
                          <MapPin className="input-icon" />
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="register-input"
                            placeholder="Sua cidade"
                          />
                        </div>
                        {errors.city && <p className="error-message">{errors.city}</p>}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="state" className="register-label">
                        Estado <span className="required">*</span>
                      </label>
                      <div className={`input-container ${errors.state ? 'error' : ''}`}>
                        <MapPin className="input-icon" />
                        <select
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="register-input"
                        >
                          <option value="">Selecione</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                        </select>
                      </div>
                      {errors.state && <p className="error-message">{errors.state}</p>}
                    </div>
                  </div>
                  
                  <div className="form-navigation">
                    <button
                      type="button"
                      className="prev-button"
                      onClick={handlePrevStep}
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      className="next-button"
                      onClick={handleNextStep}
                    >
                      Continuar
                    </button>
                  </div>
                </motion.div>
              )}
              
              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="form-step"
                >
                  <h3 className="step-title">Dados Financeiros e Segurança</h3>
                  
                  <div className="form-section">
                    <h4 className="section-subtitle">Informações Financeiras</h4>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="profession" className="register-label">
                          Profissão <span className="required">*</span>
                        </label>
                        <div className={`input-container ${errors.profession ? 'error' : ''}`}>
                          <FileText className="input-icon" />
                          <input
                            type="text"
                            id="profession"
                            name="profession"
                            value={formData.profession}
                            onChange={handleChange}
                            className="register-input"
                            placeholder="Sua profissão atual"
                          />
                        </div>
                        {errors.profession && <p className="error-message">{errors.profession}</p>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="monthlyIncome" className="register-label">
                          Renda Mensal <span className="required">*</span>
                        </label>
                        <div className={`input-container ${errors.monthlyIncome ? 'error' : ''}`}>
                          <DollarSign className="input-icon" />
                          <input
                            type="text"
                            id="monthlyIncome"
                            name="monthlyIncome"
                            value={formData.monthlyIncome}
                            onChange={(e) => handleMaskedChange(e, maskCurrency)}
                            className="register-input"
                            placeholder="R$ 0,00"
                          />
                        </div>
                        {errors.monthlyIncome && <p className="error-message">{errors.monthlyIncome}</p>}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="incomeProofFile" className="register-label">
                        Comprovante de Renda
                      </label>
                      <div className="file-upload-container">
                        <label htmlFor="incomeProofFile" className="file-upload-label">
                          <Upload className="upload-icon" size={20} />
                          <span>
                            {formData.incomeProofFile 
                              ? formData.incomeProofFile.name 
                              : "Clique para anexar um arquivo"}
                          </span>
                        </label>
                        <input
                          type="file"
                          id="incomeProofFile"
                          name="incomeProofFile"
                          onChange={handleFileChange}
                          className="file-input"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </div>
                      <p className="help-text">Formatos aceitos: PDF, JPG, PNG. Tamanho máximo: 5MB</p>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h4 className="section-subtitle">Credenciais de Acesso</h4>
                    
                    <div className="form-group">
                      <label htmlFor="password" className="register-label">
                        Senha <span className="required">*</span>
                      </label>
                      <div className={`input-container ${errors.password ? 'error' : ''}`}>
                        <Lock className="input-icon" />
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="register-input"
                          placeholder="Crie uma senha segura"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="password-toggle"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.password && <p className="error-message">{errors.password}</p>}
                      <p className="help-text">A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.</p>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="register-label">
                        Confirme sua senha <span className="required">*</span>
                      </label>
                      <div className={`input-container ${errors.confirmPassword ? 'error' : ''}`}>
                        <Lock className="input-icon" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="register-input"
                          placeholder="Confirme sua senha"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="password-toggle"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <h4 className="section-subtitle">Termos e Condições</h4>
                    
                    <div className="checkbox-group">
                      <div className={`checkbox-container ${errors.acceptTerms ? 'error' : ''}`}>
                        <input
                          type="checkbox"
                          id="acceptTerms"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="checkbox-input"
                        />
                        <label htmlFor="acceptTerms" className="checkbox-label">
                          Li e concordo com os <Link href="/termos-de-uso" target="_blank" className="highlight-link">Termos de Uso</Link> <span className="required">*</span>
                        </label>
                      </div>
                      {errors.acceptTerms && <p className="error-message">{errors.acceptTerms}</p>}
                      
                      <div className={`checkbox-container ${errors.acceptDataCollection ? 'error' : ''}`}>
                        <input
                          type="checkbox"
                          id="acceptDataCollection"
                          name="acceptDataCollection"
                          checked={formData.acceptDataCollection}
                          onChange={handleChange}
                          className="checkbox-input"
                        />
                        <label htmlFor="acceptDataCollection" className="checkbox-label">
                          Li e concordo com a <Link href="/politica-de-privacidade" target="_blank" className="highlight-link">Política de Privacidade</Link> e autorizo o processamento dos meus dados pessoais para os fins descritos <span className="required">*</span>
                        </label>
                      </div>
                      {errors.acceptDataCollection && <p className="error-message">{errors.acceptDataCollection}</p>}
                      
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          id="acceptMarketingEmails"
                          name="acceptMarketingEmails"
                          checked={formData.acceptMarketingEmails}
                          onChange={handleChange}
                          className="checkbox-input"
                        />
                        <label htmlFor="acceptMarketingEmails" className="checkbox-label">
                          Desejo receber informações sobre produtos, serviços e oportunidades de investimento
                        </label>
                      </div>
                    </div>
                    
                    <div className="privacy-info">
                      <p>
                        Seus dados pessoais serão tratados de acordo com a Lei Geral de Proteção de Dados Pessoais (LGPD) 
                        e nossa <Link href="/politica-de-privacidade" target="_blank" className="highlight-link">Política de Privacidade</Link>.
                      </p>
                      <p>
                        Você pode solicitar acesso, correção, eliminação, portabilidade ou limitação do tratamento dos seus 
                        dados pessoais a qualquer momento através da nossa 
                        <Link href="/central-de-privacidade" className="highlight-link"> Central de Privacidade</Link>.
                      </p>
                    </div>
                  </div>
                  
                  <div className="form-navigation">
                    <button
                      type="button"
                      className="prev-button"
                      onClick={handlePrevStep}
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner"></div>
                          <span>Processando...</span>
                        </>
                      ) : (
                        <>
                          <span>Concluir Cadastro</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default RegisterForm;
