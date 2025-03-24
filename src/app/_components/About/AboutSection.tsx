"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Users, Target, Eye } from 'lucide-react';
import './about-section.css';

type AboutCard = {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
};

const AboutSection: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const aboutCards: AboutCard[] = [
    {
      id: 'who-we-are',
      title: 'Quem Somos',
      content: 'Lions Bank é uma empresa especializada em soluções financeiras personalizadas, com um histórico de sucesso e credibilidade no mercado financeiro. Nossa equipe de especialistas trabalha para oferecer as melhores estratégias para nossos clientes, sempre com foco em resultados e transparência.',
      icon: <Users size={36} className="text-[#AF8E41]" />
    },
    {
      id: 'mission',
      title: 'Nossa Missão',
      content: 'Nossa missão é proporcionar soluções financeiras inteligentes e personalizadas que impulsionem o crescimento patrimonial de nossos clientes, através de um atendimento diferenciado e processos transparentes que garantam segurança e tranquilidade em todas as etapas.',
      icon: <Target size={36} className="text-[#AF8E41]" />
    },
    {
      id: 'vision',
      title: 'Nossa Visão',
      content: 'Ser reconhecida como a empresa referência em soluções financeiras personalizadas no mercado brasileiro, construindo relações duradouras baseadas em confiança e resultados consistentes, contribuindo efetivamente para o sucesso financeiro de nossos clientes.',
      icon: <Eye size={36} className="text-[#AF8E41]" />
    }
  ];
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  const nextCard = () => {
    setCurrentCard((prev) => (prev === aboutCards.length - 1 ? 0 : prev + 1));
  };
  
  const prevCard = () => {
    setCurrentCard((prev) => (prev === 0 ? aboutCards.length - 1 : prev - 1));
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <section id="sobre" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#222529] to-[#1E1F23]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-capricho text-3xl sm:text-4xl md:text-5xl text-[#AF8E41] mb-4">
            SOBRE A LIONS BANK
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-6"></div>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Conheça nossa história, missão e valores que guiam nossa trajetória de sucesso
          </p>
        </motion.div>

        {/* Desktop view - Cards side by side */}
        {!isMobile && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {aboutCards.map((card) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                className="about-card flex flex-col items-center bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg p-6 shadow-lg hover:border-[#AF8E41]/40 transition-all duration-300"
              >
                <div className="about-icon-container mb-4">
                  {card.icon}
                </div>
                <h3 className="font-capricho text-xl sm:text-2xl text-[#AF8E41] mb-3 text-center">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-base text-center">
                  {card.content}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Mobile view - Carousel */}
        {isMobile && (
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out" 
                style={{ transform: `translateX(-${currentCard * 100}%)` }}
              >
                {aboutCards.map((card) => (
                  <div 
                    key={card.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="about-card flex flex-col items-center bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg p-6 shadow-lg">
                      <div className="about-icon-container mb-4">
                        {card.icon}
                      </div>
                      <h3 className="font-capricho text-xl text-[#AF8E41] mb-3 text-center">
                        {card.title}
                      </h3>
                      <p className="text-gray-300 text-sm text-center">
                        {card.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel controls */}
            <button 
              onClick={prevCard}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 rounded-full bg-[#2A2D31] border border-[#AF8E41]/20 flex items-center justify-center text-white shadow-lg focus:outline-none"
              aria-label="Cartão anterior"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button 
              onClick={nextCard}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 rounded-full bg-[#2A2D31] border border-[#AF8E41]/20 flex items-center justify-center text-white shadow-lg focus:outline-none"
              aria-label="Próximo cartão"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {aboutCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCard(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    currentCard === index ? 'bg-[#AF8E41]' : 'bg-gray-500'
                  }`}
                  aria-label={`Ir para o cartão ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
