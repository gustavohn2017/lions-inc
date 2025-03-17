// components/Sobre.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type TabType = 'who' | 'vision' | 'mission';

const Sobre: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('who');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detectar viewport para responsividade
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Inicialização
    handleResize();

    // Listener para redimensionamento
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const tabContent = {
    who: {
      title: "Quem Somos",
      content: "Somos uma empresa inovadora fundada em 2010, dedicada a fornecer soluções de alta qualidade para nossos clientes. Com uma equipe de profissionais qualificados e experientes, construímos uma reputação sólida baseada na excelência, integridade e comprometimento com resultados excepcionais em todos os projetos que realizamos. Nossa abordagem centrada no cliente nos permite entender profundamente as necessidades específicas de cada parceiro de negócios."
    },
    vision: {
      title: "Nossa Visão",
      content: "Ser reconhecida como referência de excelência em nosso setor, promovendo inovação e soluções sustentáveis que impactam positivamente a sociedade e estabelecem novos padrões no mercado. Buscamos constantemente antecipar tendências e desenvolver tecnologias que transformam desafios em oportunidades, criando valor duradouro para nossos clientes, colaboradores e para a comunidade."
    },
    mission: {
      title: "Nossa Missão",
      content: "Oferecer produtos e serviços de alta qualidade que atendam às necessidades de nossos clientes, enquanto mantemos um compromisso inabalável com a ética nos negócios, responsabilidade social e desenvolvimento sustentável em todas as nossas operações. Trabalhamos incansavelmente para superar expectativas, cultivar relacionamentos de longo prazo e contribuir para um futuro mais promissor através da excelência operacional e inovação contínua."
    }
  };

  return (
    <section className="w-full min-h-screen py-16 bg-[#1E2124] flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-[#DAA520] mb-12 text-center">Sobre</h2>

        {/* Tabs Navigation */}
        <div className={`flex ${isMobile ? 'flex-col' : 'justify-center'} mb-8 gap-2`}>
          <div className={`${isMobile ? 'w-full' : 'inline-flex'} rounded-lg shadow-lg overflow-hidden`}>
            <button
              onClick={() => setActiveTab('who')}
              className={`${isMobile ? 'w-full' : 'px-8'} py-4 font-medium text-base md:text-lg transition-all duration-300 relative overflow-hidden group
                ${activeTab === 'who'
                  ? 'bg-[#2C3033] text-[#DAA520]'
                  : 'bg-[#242729] text-[#A0A0A0] hover:text-[#DAA520]'
                } ${isMobile ? 'rounded-t-lg' : 'rounded-l-lg'}`}
            >
              <span className="relative z-10">Quem Somos</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#DAA520] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              {activeTab === 'who' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#DAA520]"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('vision')}
              className={`${isMobile ? 'w-full' : 'px-8'} py-4 font-medium text-base md:text-lg transition-all duration-300 relative overflow-hidden group
                ${activeTab === 'vision'
                  ? 'bg-[#2C3033] text-[#DAA520]'
                  : 'bg-[#242729] text-[#A0A0A0] hover:text-[#DAA520]'
                }`}
            >
              <span className="relative z-10">Visão</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#DAA520] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              {activeTab === 'vision' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#DAA520]"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('mission')}
              className={`${isMobile ? 'w-full' : 'px-8'} py-4 font-medium text-base md:text-lg transition-all duration-300 relative overflow-hidden group
                ${activeTab === 'mission'
                  ? 'bg-[#2C3033] text-[#DAA520]'
                  : 'bg-[#242729] text-[#A0A0A0] hover:text-[#DAA520]'
                } ${isMobile ? 'rounded-b-lg' : 'rounded-r-lg'}`}
            >
              <span className="relative z-10">Missão</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#DAA520] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              {activeTab === 'mission' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#DAA520]"></span>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full mx-auto bg-[#242729] rounded-xl shadow-2xl overflow-hidden">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={tabVariants}
            className="p-6 md:p-10 min-h-64"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-[#DAA520] mb-6 border-l-4 border-[#DAA520] pl-4">
              {tabContent[activeTab].title}
            </h3>
            <p className="text-gray-300 leading-relaxed md:text-lg">
              {tabContent[activeTab].content}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;