"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MailCheck, AlertCircle, Send } from 'lucide-react';
import './contact-form.css';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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
    
    setFormStatus('sending');
    
    // Simulating API call
    try {
      // In a real app, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success scenario
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        service: ''
      });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      
      // Reset error state after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section id="contato" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1E1F23] to-[#1A1A1E]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-capricho text-3xl sm:text-4xl md:text-5xl text-[#AF8E41] mb-4">
            ENTRE EM CONTATO
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-6"></div>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Estamos prontos para ajudar com soluções financeiras personalizadas para suas necessidades
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg p-6 sm:p-8 shadow-lg"
          >
            <motion.h3 
              variants={itemVariants}
              className="font-capricho text-2xl text-[#AF8E41] mb-6"
            >
              Informações de Contato
            </motion.h3>
            
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="contact-info-item">
                <h4 className="text-white font-semibold mb-1">Endereço:</h4>
                <p className="text-gray-300">Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100</p>
              </div>
              
              <div className="contact-info-item">
                <h4 className="text-white font-semibold mb-1">Email:</h4>
                <a href="mailto:contato@lionsbank.com.br" className="text-[#AF8E41] hover:text-[#C6A052] transition-colors">
                  contato@lionsbank.com.br
                </a>
              </div>
              
              <div className="contact-info-item">
                <h4 className="text-white font-semibold mb-1">Telefone:</h4>
                <a href="tel:+551199999999" className="text-[#AF8E41] hover:text-[#C6A052] transition-colors">
                  (11) 99999-9999
                </a>
              </div>
              
              <div className="contact-info-item">
                <h4 className="text-white font-semibold mb-1">Horário de Atendimento:</h4>
                <p className="text-gray-300">Segunda à Sexta: 09:00 - 18:00</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-8">
              <div className="aspect-video rounded-lg overflow-hidden border border-[#AF8E41]/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976521246224!2d-46.65390508502211!3d-23.563404784679045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7f481fd9f%3A0x9982bfde4df54830!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1625584998018!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Lions Bank Localização"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg p-6 sm:p-8 shadow-lg"
          >
            <motion.h3 
              variants={itemVariants}
              className="font-capricho text-2xl text-[#AF8E41] mb-6"
            >
              Envie-nos uma mensagem
            </motion.h3>
            
            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-message"
              >
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <MailCheck className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Mensagem Enviada!</h4>
                  <p className="text-gray-300">
                    Agradecemos seu contato. Nossa equipe responderá em breve.
                  </p>
                </div>
              </motion.div>
            ) : formStatus === 'error' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="error-message"
              >
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Erro no Envio</h4>
                  <p className="text-gray-300">
                    Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Nome <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Seu nome completo"
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="seu.email@exemplo.com"
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">
                      Serviço de Interesse
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Selecione um serviço</option>
                      <option value="consortium">Consórcio</option>
                      <option value="financing">Financiamento</option>
                      <option value="capital">Capital de Giro</option>
                      <option value="consulting">Consultoria Empresarial</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Assunto da mensagem"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    rows={5}
                    placeholder="Descreva como podemos ajudar você..."
                  ></textarea>
                  {errors.message && <p className="error-text">{errors.message}</p>}
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="contact-submit-button"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <div className="spinner"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
