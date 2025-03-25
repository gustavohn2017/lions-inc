"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Home, Car, BuildingIcon, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import './consortium-section.css';

// Consortium types data
const consortiumTypes = [
  {
    id: 'real-estate',
    icon: <Home className="consortium-icon-svg" />,
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
    icon: <Car className="consortium-icon-svg" />,
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
    icon: <BuildingIcon className="consortium-icon-svg" />,
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
    icon: <Briefcase className="consortium-icon-svg" />,
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check screen size on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === consortiumTypes.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? consortiumTypes.length - 1 : prev - 1));
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
    <section id="consorcios" className="consortium-section">
      <div className="consortium-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <h2 className="section-title">CONSÓRCIOS PERSONALIZADOS</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Planeje suas conquistas sem comprometer seu orçamento com os juros de financiamentos tradicionais.
          </p>
        </motion.div>
        
        {/* Mobile Design */}
        <div className="consortium-mobile-view">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="mobile-card"
            >
              <div className="mobile-card-header">
                <div className="mobile-icon-wrapper">
                  {consortiumTypes[activeIndex].icon}
                </div>
                <h3 className="mobile-card-title">
                  {consortiumTypes[activeIndex].title}
                </h3>
              </div>
              
              <p className="mobile-card-description">
                {consortiumTypes[activeIndex].description}
              </p>
              
              <div className="mobile-benefits-list">
                {consortiumTypes[activeIndex].benefits.map((benefit, idx) => (
                  <div key={idx} className="mobile-benefit-item">
                    <CheckCircle className="benefit-check" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleContactClick}
                className="mobile-learn-more"
              >
                Quero saber mais
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </AnimatePresence>
          
          <div className="mobile-navigation">
            <button 
              onClick={prevSlide}
              className="mobile-nav-button prev"
              aria-label="Consórcio anterior"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="mobile-dots">
              {consortiumTypes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(idx)}
                  className={`mobile-dot ${activeIndex === idx ? 'active' : ''}`}
                  aria-label={`Ir para ${consortiumTypes[idx].title}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="mobile-nav-button next"
              aria-label="Próximo consórcio"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Desktop Design */}
        <div className="consortium-desktop-view">
          {/* Navigation Tabs */}
          <div className="desktop-navigation">
            {consortiumTypes.map((type, idx) => (
              <button
                key={type.id}
                onClick={() => handleNavClick(idx)}
                className={`desktop-tab ${activeIndex === idx ? 'active' : ''}`}
                aria-selected={activeIndex === idx}
              >
                <div className="desktop-tab-icon">
                  {type.icon}
                </div>
                <span>{type.title}</span>
                {activeIndex === idx && <div className="active-indicator" />}
              </button>
            ))}
          </div>
          
          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="desktop-content-area"
            >
              <div className="desktop-content-grid">
                <div className="desktop-content-left">
                  <h3 className="desktop-content-title">
                    {consortiumTypes[activeIndex].title}
                  </h3>
                  <p className="desktop-content-description">
                    {consortiumTypes[activeIndex].description}
                  </p>
                  <button 
                    onClick={handleContactClick}
                    className="desktop-learn-more"
                  >
                    Quero saber mais
                    <ArrowRight size={16} />
                  </button>
                </div>
                
                <div className="desktop-content-right">
                  <h4 className="benefits-title">Principais vantagens</h4>
                  <div className="desktop-benefits-list">
                    {consortiumTypes[activeIndex].benefits.map((benefit, idx) => (
                      <motion.div 
                        key={idx} 
                        className="desktop-benefit-item"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <CheckCircle className="benefit-check" />
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="action-button-container">
          <button 
            onClick={handleCalculationClick}
            className="simulation-button"
          >
            Simular seu consórcio agora
            <ArrowRight className="arrow-icon" />
          </button>
          <p className="disclaimer-text">
            *Consulte nossos especialistas para uma simulação personalizada sem compromisso.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConsortiumSection;
