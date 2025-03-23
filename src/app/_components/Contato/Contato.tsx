"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Contato: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log('Form submitted:', formState);
        // Reset form after submission
        setFormState({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
    };

    return (
        <section id="contato" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#242729] to-[#1A1D20]">
            <div className="max-w-6xl mx-auto">
                <motion.div 
                    className="text-center mb-8 sm:mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.5,
                        ease: "easeOut" // Adding easing for smoother animation
                    }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#AF8E41] font-bold mb-3 font-['Cormorant_Garamond'] tracking-wider">
                        ENTRE EM CONTATO
                    </h2>
                    <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                        Estamos prontos para atender suas necessidades financeiras e esclarecer todas as suas dúvidas
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
                    {/* Contact Information - Improved spacing */}
                    <motion.div 
                        className="w-full lg:w-1/3 space-y-6 sm:space-y-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                            duration: 0.4, // Slightly faster
                            delay: 0.1, // Reduced delay
                            ease: "easeOut" 
                        }}
                    >
                        <div className="bg-[#2A2D31] p-5 sm:p-6 md:p-8 rounded-lg border border-[#AF8E41]/20 shadow-md">
                            <h3 className="text-xl sm:text-2xl text-[#AF8E41] font-['Cormorant_Garamond'] font-bold mb-5 sm:mb-6">
                                Informações de Contato
                            </h3>
                            <div className="space-y-4 sm:space-y-5">
                                <div className="flex items-start">
                                    <div className="bg-[#343941] p-2 rounded-md mr-3 sm:mr-4">
                                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#AF8E41]" />
                                    </div>
                                    <div>
                                        <h4 className="text-white text-xs sm:text-sm font-medium mb-1">Localização</h4>
                                        <p className="text-gray-400 text-xs sm:text-sm">Av. Paulista, 1000 - Bela Vista, São Paulo - SP</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-[#343941] p-2 rounded-md mr-3 sm:mr-4">
                                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#AF8E41]" />
                                    </div>
                                    <div>
                                        <h4 className="text-white text-xs sm:text-sm font-medium mb-1">Telefone</h4>
                                        <p className="text-gray-400 text-xs sm:text-sm">(11) 99999-9999</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-[#343941] p-2 rounded-md mr-3 sm:mr-4">
                                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#AF8E41]" />
                                    </div>
                                    <div>
                                        <h4 className="text-white text-xs sm:text-sm font-medium mb-1">E-mail</h4>
                                        <p className="text-gray-400 text-xs sm:text-sm">contato@lionsbank.com.br</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#AF8E41]/20">
                                <h4 className="text-white text-xs sm:text-sm font-medium mb-2 sm:mb-3">Horário de Atendimento</h4>
                                <p className="text-gray-400 text-xs sm:text-sm mb-1">Segunda - Sexta: 9h às 18h</p>
                                <p className="text-gray-400 text-xs sm:text-sm">Sábado: 9h às 13h</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        className="w-full lg:w-2/3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="bg-[#2A2D31] p-5 sm:p-6 md:p-8 rounded-lg border border-[#AF8E41]/20 shadow-md">
                            <h3 className="text-xl sm:text-2xl text-[#AF8E41] font-['Cormorant_Garamond'] font-bold mb-5 sm:mb-6">
                                Envie sua Mensagem
                            </h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-white text-sm mb-2">Nome Completo *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-md bg-[#343941] border border-[#AF8E41]/20 p-3 text-white text-sm focus:outline-none focus:border-[#AF8E41]/50 transition-colors"
                                            placeholder="Seu nome"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="email" className="block text-white text-sm mb-2">E-mail *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-md bg-[#343941] border border-[#AF8E41]/20 p-3 text-white text-sm focus:outline-none focus:border-[#AF8E41]/50 transition-colors"
                                            placeholder="seu@email.com"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="phone" className="block text-white text-sm mb-2">Telefone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formState.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-md bg-[#343941] border border-[#AF8E41]/20 p-3 text-white text-sm focus:outline-none focus:border-[#AF8E41]/50 transition-colors"
                                        placeholder="(11) 99999-9999"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-white text-sm mb-2">Mensagem *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full rounded-md bg-[#343941] border border-[#AF8E41]/20 p-3 text-white text-sm focus:outline-none focus:border-[#AF8E41]/50 resize-none transition-colors"
                                        placeholder="Escreva sua mensagem aqui..."
                                    />
                                </div>
                                
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#AF8E41] to-[#C6A052] hover:from-[#C6A052] hover:to-[#AF8E41] 
                                                text-white rounded-md text-sm font-medium transition-all duration-300 
                                                hover:shadow-[0_0_15px_rgba(175,142,65,0.25)] hover:-translate-y-0.5 flex items-center justify-center"
                                    >
                                        <Send className="h-4 w-4 mr-2" />
                                        Enviar Mensagem
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contato;