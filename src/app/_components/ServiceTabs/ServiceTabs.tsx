"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Building, CreditCard, TrendingUp, Check, ArrowRight } from 'lucide-react';
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
  
  return (
    <section id="produtos" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1E1F23] to-[#242729]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-capricho text-3xl sm:text-4xl md:text-5xl text-[#AF8E41] mb-4">
            NOSSOS SERVIÇOS
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-6"></div>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Soluções financeiras personalizadas para cada necessidade, com atendimento diferenciado e resultados comprovados
          </p>
        </motion.div>

        <Tabs 
          defaultValue="consortium" 
          onValueChange={setActiveTab} 
          className="w-full service-tabs"
        >
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 p-1 bg-[#2A2D31] rounded-lg mb-8">
            {services.map((service) => (
              <TabsTrigger 
                key={service.id} 
                value={service.id}
                className="service-tab flex items-center gap-2 py-3"
              >
                {service.icon}
                <span className="hidden sm:inline">{service.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
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
                className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg p-6 sm:p-8 shadow-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <div className="col-span-3">
                    <motion.h3 
                      variants={itemVariants}
                      className="font-capricho text-2xl sm:text-3xl text-[#AF8E41] mb-4"
                    >
                      {service.title}
                    </motion.h3>
                    <motion.p 
                      variants={itemVariants}
                      className="text-gray-300 text-base mb-6"
                    >
                      {service.description}
                    </motion.p>
                    
                    <motion.div variants={itemVariants}>
                      <h4 className="font-semibold text-white mb-3">Principais benefícios:</h4>
                      <ul className="space-y-2 mb-6">
                        {service.benefits.map((benefit, index) => (
                          <motion.li 
                            key={index}
                            variants={itemVariants}
                            className="flex items-start text-gray-300 group"
                          >
                            <Check 
                              className="h-5 w-5 text-[#AF8E41] mt-0.5 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" 
                            />
                            <span>{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    <motion.button
                      variants={itemVariants}
                      onClick={handleContactClick}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#AF8E41] to-[#C6A052] hover:from-[#C6A052] hover:to-[#AF8E41] text-white rounded-lg transition-all duration-300 text-sm font-medium"
                    >
                      Saiba mais sobre {service.name}
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="col-span-2"
                  >
                    <div className="rounded-lg overflow-hidden border border-[#AF8E41]/20 shadow-md h-full">
                      <img 
                        src={service.imageSrc} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ServiceTabs;
