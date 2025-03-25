"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, Shield, TrendingUp, FileText, 
  RefreshCw, Landmark, BarChart2, HardHat, 
  Home, Users, ChevronLeft, ChevronRight
} from 'lucide-react';
import './featured-services.css';

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const FeaturedServices: React.FC = () => {
  const services: ServiceCard[] = [
    {
      id: 'credit-letters',
      title: 'Cartas de Crédito',
      description: 'Facilitamos o acesso a cartas de crédito para aquisição de bens e serviços com condições diferenciadas.',
      icon: <CreditCard className="service-icon" />
    },
    {
      id: 'secured-credit',
      title: 'Crédito com Garantia',
      description: 'Obtenha crédito com taxas reduzidas oferecendo garantias que valorizam seu patrimônio.',
      icon: <Shield className="service-icon" />
    },
    {
      id: 'heritage',
      title: 'Expansão de Patrimônio',
      description: 'Estratégias personalizadas para crescimento patrimonial sustentável e seguro.',
      icon: <TrendingUp className="service-icon" />
    },
    {
      id: 'financial-consulting',
      title: 'Consultoria Financeira',
      description: 'Orientação especializada para tomada de decisões financeiras inteligentes.',
      icon: <FileText className="service-icon" />
    },
    {
      id: 'debt-renegotiation',
      title: 'Renegociação de Dívidas',
      description: 'Soluções para reorganizar suas finanças e melhorar seu fluxo de caixa.',
      icon: <RefreshCw className="service-icon" />
    },
    {
      id: 'loans',
      title: 'Empréstimos',
      description: 'Opções de crédito com taxas competitivas e prazos adequados à sua necessidade.',
      icon: <Landmark className="service-icon" />
    },
    {
      id: 'portfolio',
      title: 'Administração de Carteira',
      description: 'Gestão profissional do seu portfólio de investimentos para maximizar resultados.',
      icon: <BarChart2 className="service-icon" />
    },
    {
      id: 'construction',
      title: 'Administração de Obras',
      description: 'Acompanhamento especializado para projetos de construção e reforma.',
      icon: <HardHat className="service-icon" />
    },
    {
      id: 'real-estate',
      title: 'Regularizações de Bens Imóveis',
      description: 'Suporte completo para documentação e regularização de imóveis.',
      icon: <Home className="service-icon" />
    },
    {
      id: 'retirement',
      title: 'Aposentadoria',
      description: 'Planejamento financeiro para uma aposentadoria tranquila e segura.',
      icon: <Users className="service-icon" />
    },
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.07
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Group services into chunks of 4
  const serviceGroups = [];
  for (let i = 0; i < services.length; i += 4) {
    serviceGroups.push(services.slice(i, i + 4));
  }
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Navigate to a specific group
  const navigateToGroup = (index: number) => {
    setActiveGroup(index);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * scrollContainerRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };
  
  // Handle scroll event to update active group
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const newActiveGroup = Math.round(scrollPosition / containerWidth);
      
      if (newActiveGroup !== activeGroup) {
        setActiveGroup(newActiveGroup);
      }
    }
  };
  
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#242729] to-[#1E1F23]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-capricho text-3xl sm:text-4xl md:text-5xl text-[#AF8E41] mb-4">
            SERVIÇOS EM DESTAQUE
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-6"></div>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Conheça nossa linha completa de soluções financeiras para pessoas físicas e empresas
          </p>
        </motion.div>

        {isMobile ? (
          <div className="mobile-cards-wrapper">
            <div 
              className="mobile-cards-scroll-container"
              ref={scrollContainerRef}
              onScroll={handleScroll}
            >
              {serviceGroups.map((group, groupIndex) => (
                <div 
                  key={`group-${groupIndex}`} 
                  className="mobile-cards-group"
                >
                  {group.map((service) => (
                    <div
                      key={service.id}
                      className="service-card bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:border-[#AF8E41]/40 group"
                    >
                      <div className="service-icon-container mb-3 group-hover:bg-[#AF8E41]/20">
                        {service.icon}
                      </div>
                      <h3 className="font-capricho text-[#AF8E41] mb-1">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 mobile-card-description">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {serviceGroups.length > 1 && (
              <div className="mobile-pagination-controls">
                <button 
                  onClick={() => navigateToGroup((activeGroup - 1 + serviceGroups.length) % serviceGroups.length)}
                  className="mobile-pagination-arrow left"
                  disabled={activeGroup === 0}
                  aria-label="Previous group"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="mobile-pagination-dots">
                  {serviceGroups.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => navigateToGroup(index)}
                      className={`pagination-dot ${activeGroup === index ? 'active' : ''}`}
                      aria-label={`Go to group ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={() => navigateToGroup((activeGroup + 1) % serviceGroups.length)}
                  className="mobile-pagination-arrow right"
                  disabled={activeGroup === serviceGroups.length - 1}
                  aria-label="Next group"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="service-card bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:border-[#AF8E41]/40 group"
              >
                <div className="service-icon-container mb-4 group-hover:bg-[#AF8E41]/20">
                  {service.icon}
                </div>
                <h3 className="font-capricho text-lg text-[#AF8E41] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedServices;
