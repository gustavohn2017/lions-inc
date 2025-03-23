"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home, Car, BuildingIcon, Briefcase } from 'lucide-react';
import './consortium-section.css';

// Consortium types data
const consortiumTypes = [
  {
    id: 'real-estate',
    icon: <Home className="h-8 w-8 text-[#AF8E41]" />,
    title: 'Consórcio Imobiliário',
    description: 'Realize o sonho da casa própria com parcelas que cabem no seu orçamento.',
    benefits: [
      'Sem juros, apenas taxa de administração',
      'Parcelas acessíveis e flexíveis',
      'Planejamento de longo prazo'
    ]
  },
  {
    id: 'auto',
    icon: <Car className="h-8 w-8 text-[#AF8E41]" />,
    title: 'Consórcio de Veículos',
    description: 'Adquira veículos sem comprometer seu orçamento com juros altos.',
    benefits: [
      'Economia de até 30% comparado a financiamentos',
      'Parcelas reduzidas e previsíveis',
      'Contemplação por lance ou sorteio'
    ]
  },
  {
    id: 'business',
    icon: <BuildingIcon className="h-8 w-8 text-[#AF8E41]" />,
    title: 'Consórcio Empresarial',
    description: 'Soluções para expandir sua empresa sem impactar o capital de giro.',
    benefits: [
      'Planejamento financeiro para crescimento',
      'Preservação das linhas de crédito bancário',
      'Dedução fiscal para empresas'
    ]
  },
  {
    id: 'heavy',
    icon: <Briefcase className="h-8 w-8 text-[#AF8E41]" />,
    title: 'Consórcio de Maquinário',
    description: 'Equipamentos e maquinário para impulsionar sua produção e eficiência.',
    benefits: [
      'Renovação planejada de frota',
      'Protege seu fluxo de caixa',
      'Opções para diversos setores'
    ]
  }
];

const ConsortiumSection: React.FC = () => {
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

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCalculationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const calculatorSection = document.getElementById('calculadora');
    if (calculatorSection) {
      const headerOffset = 80;
      const elementPosition = calculatorSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="consorcios" className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#262A34] to-[#1E2028]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#AF8E41] font-['Cormorant_Garamond'] font-bold tracking-wide mb-2">
            CONSÓRCIOS PERSONALIZADOS
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-3"></div>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Planeje suas conquistas sem comprometer seu orçamento com os juros de financiamentos tradicionais.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {consortiumTypes.map((type) => (
            <motion.div
              key={type.id}
              variants={itemVariants}
              className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg overflow-hidden hover:border-[#AF8E41]/40 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col h-full"
            >
              <div className="p-5 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <div className="bg-[#343941] p-2 rounded-md mr-3 flex-shrink-0">
                    {type.icon}
                  </div>
                  <h3 className="text-base font-bold text-white">{type.title}</h3>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{type.description}</p>
                
                <div className="mt-auto">
                  <ul className="space-y-2 mb-4">
                    {type.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-300 text-xs sm:text-sm group"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#AF8E41] mt-0.5 mr-2 flex-shrink-0 group-hover:scale-110 transition-all duration-200" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={handleContactClick}
                    className="inline-flex items-center text-[#AF8E41] hover:text-[#C6A052] text-xs sm:text-sm font-medium transition-colors group"
                  >
                    Quero saber mais
                    <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8 lg:mt-10">
          <button 
            onClick={handleCalculationClick}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-[#AF8E41] to-[#C6A052] text-white rounded-lg transition-all duration-300 text-sm font-medium hover:from-[#C6A052] hover:to-[#D6B062] hover:shadow-lg hover:shadow-[#AF8E41]/10"
          >
            Simular seu consórcio agora
            <ArrowRight size={14} className="ml-2" />
          </button>
          <p className="text-gray-400 text-xs mt-3">
            *Consulte nossos especialistas para uma simulação personalizada sem compromisso.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsortiumSection;
