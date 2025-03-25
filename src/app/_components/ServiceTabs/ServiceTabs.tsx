"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Building, CreditCard, TrendingUp, Check, ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';
import './service-tabs.css';

type ServiceTab = {
  id: string;
  name: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  imageSrc: string;
};

const ServiceTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('consortium');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  
  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  const services: ServiceTab[] = [
    {
      id: 'consortium',
      name: 'Consórcio',
      icon: <Briefcase className="h-5 w-5" />,
      title: 'Consórcios Personalizados',
      description: 'Planeje a aquisição de bens com parcelas que cabem no seu bolso, sem juros e com total flexibilidade. Nossa consultoria especializada encontra a melhor solução para seus objetivos.',
      benefits: [
        'Sem juros, apenas taxa de administração',
        'Parcelas reduzidas e previsíveis',
        'Planejamento financeiro de longo prazo',
        'Contemplação por lance ou sorteio'
      ],
      imageSrc: 'https://placehold.co/400x300/333/AF8E41?text=Consórcio'
    },
    {
      id: 'financing',
      name: 'Financiamentos',
      icon: <CreditCard className="h-5 w-5" />,
      title: 'Financiamentos Estratégicos',
      description: 'Obtenha as melhores condições para financiar seus projetos e aquisições. Trabalhamos com as principais instituições financeiras para garantir taxas competitivas.',
      benefits: [
        'Taxas diferenciadas do mercado',
        'Análise personalizada de crédito',
        'Aprovação rápida e desburocratizada',
        'Parcelas adequadas ao seu orçamento'
      ],
      imageSrc: 'https://placehold.co/400x300/333/AF8E41?text=Financiamento'
    },
    {
      id: 'capital',
      name: 'Capital de Giro',
      icon: <Building className="h-5 w-5" />,
      title: 'Capital de Giro para Empresas',
      description: 'Mantenha sua empresa em pleno funcionamento com nossas soluções de capital de giro. Acesso rápido aos recursos necessários para enfrentar sazonalidades e aproveitar oportunidades.',
      benefits: [
        'Liberação rápida de recursos',
        'Taxas competitivas para empresas',
        'Análise financeira personalizada',
        'Flexibilidade nas formas de pagamento'
      ],
      imageSrc: 'https://placehold.co/400x300/333/AF8E41?text=Capital+de+Giro'
    },
    {
      id: 'consulting',
      name: 'Consultoria Empresarial',
      icon: <TrendingUp className="h-5 w-5" />,
      title: 'Consultoria Financeira Empresarial',
      description: 'Maximize os resultados da sua empresa com nossa consultoria especializada. Análise detalhada da saúde financeira e implementação de estratégias para crescimento sustentável.',
      benefits: [
        'Diagnóstico financeiro completo',
        'Estratégias para redução de custos',
        'Planejamento tributário otimizado',
        'Reestruturação de dívidas'
      ],
      imageSrc: 'https://placehold.co/400x300/333/AF8E41?text=Consultoria'
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  const mobileCardVariants = {
    collapsed: { height: "auto", overflow: "hidden" },
    expanded: { height: "auto", overflow: "visible" }
  };
  
  const handleContactClick = () => {
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  // Find the active service
  const activeService = services.find(service => service.id === activeTab);
  
  // Mobile accordion toggle
  const toggleMobileDetails = () => {
    setShowMobileDetails(!showMobileDetails);
  };
  
  return (
    <section id="produtos" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1E1F23] to-[#242729]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-capricho text-3xl sm:text-4xl md:text-5xl text-[#AF8E41] mb-3 sm:mb-4">
            NOSSOS SERVIÇOS
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Soluções financeiras personalizadas para cada necessidade, com atendimento diferenciado e resultados comprovados
          </p>
        </motion.div>

        {/* Desktop and Tablet View */}
        {!isMobile && (
          <Tabs 
            defaultValue="consortium" 
            value={activeTab}
            onValueChange={setActiveTab} 
            className="w-full service-tabs hidden sm:block"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 p-1 bg-[#2A2D31] rounded-lg mb-6 md:mb-8">
              {services.map((service) => (
                <TabsTrigger 
                  key={service.id} 
                  value={service.id}
                  className="service-tab flex items-center gap-2 py-3"
                >
                  {service.icon}
                  <span className={`${isTablet ? 'text-xs' : 'text-sm'}`}>{service.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <AnimatePresence mode="wait">
              {services.map((service) => (
                <TabsContent 
                  key={service.id} 
                  value={service.id}
                  className="focus:outline-none"
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg p-6 md:p-8 shadow-lg"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                      <div className="col-span-1 lg:col-span-3">
                        <motion.h3 
                          variants={itemVariants}
                          className="font-capricho text-xl md:text-2xl lg:text-3xl text-[#AF8E41] mb-3 md:mb-4"
                        >
                          {service.title}
                        </motion.h3>
                        <motion.p 
                          variants={itemVariants}
                          className="text-gray-300 text-sm md:text-base mb-4 md:mb-6"
                        >
                          {service.description}
                        </motion.p>
                        
                        <motion.div variants={itemVariants}>
                          <h4 className="font-semibold text-white text-sm md:text-base mb-2 md:mb-3">Principais benefícios:</h4>
                          <ul className="space-y-1.5 md:space-y-2 mb-5 md:mb-6">
                            {service.benefits.map((benefit, index) => (
                              <motion.li 
                                key={index}
                                variants={itemVariants}
                                className="benefit-item"
                              >
                                <Check className="benefit-icon mt-0.5 mr-2 h-4 w-4 md:h-5 md:w-5" />
                                <span className="benefit-text text-sm md:text-base">{benefit}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                        
                        <motion.button
                          variants={itemVariants}
                          onClick={handleContactClick}
                          className="service-button"
                        >
                          Saiba mais sobre {service.name}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </motion.button>
                      </div>
                      
                      <motion.div 
                        variants={itemVariants}
                        className="col-span-1 lg:col-span-2 mt-4 lg:mt-0"
                      >
                        <div className="rounded-lg overflow-hidden border border-[#AF8E41]/20 shadow-md h-full">
                          <img 
                            src={service.imageSrc} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        )}

        {/* Mobile View */}
        {isMobile && (
          <div className="w-full mobile-services-tabs">
            {/* Mobile tabs navigation */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`mobile-tab-button flex flex-col items-center justify-center p-3 rounded-md ${
                    activeTab === service.id ? 'active' : ''
                  }`}
                >
                  <div className="p-2 rounded-full bg-[#2A2D31] mb-1">
                    {service.icon}
                  </div>
                  <span className="text-xs font-medium">{service.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile service content */}
            <AnimatePresence mode="wait">
              {activeService && (
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="w-full aspect-video relative">
                    <img 
                      src={activeService.imageSrc} 
                      alt={activeService.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1F23] to-transparent"></div>
                    <h3 className="absolute bottom-3 left-4 font-capricho text-xl text-[#AF8E41]">
                      {activeService.title}
                    </h3>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-300 text-sm mb-3">
                      {activeService.description}
                    </p>
                    
                    <div className="mobile-accordion">
                      <button 
                        onClick={toggleMobileDetails}
                        className="flex items-center justify-between w-full py-2 border-t border-[#AF8E41]/20"
                      >
                        <span className="font-medium text-white text-sm">Principais benefícios</span>
                        {showMobileDetails ? (
                          <ChevronDown className="h-4 w-4 text-[#AF8E41]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#AF8E41]" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {showMobileDetails && (
                          <motion.div
                            variants={mobileCardVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            className="py-2"
                          >
                            <ul className="space-y-1.5 mb-3">
                              {activeService.benefits.map((benefit, index) => (
                                <li 
                                  key={index}
                                  className="flex items-start text-sm"
                                >
                                  <Check className="h-4 w-4 text-[#AF8E41] mt-0.5 mr-2 flex-shrink-0" />
                                  <span className="text-gray-300">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <button
                      onClick={handleContactClick}
                      className="w-full flex items-center justify-center gap-1 px-4 py-2.5 mt-3 bg-gradient-to-r from-[#AF8E41] to-[#C6A052] text-white rounded-md transition-all duration-300 text-sm font-medium"
                    >
                      Saiba mais sobre {activeService.name}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceTabs;
