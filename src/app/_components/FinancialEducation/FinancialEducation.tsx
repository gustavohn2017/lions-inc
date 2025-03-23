"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, Download, ExternalLink } from 'lucide-react';
import './financial-education.css';

// Types
type ResourceCategory = 'article' | 'video' | 'ebook';
type ResourceType = {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  image: string;
  link: string;
  date: string;
  readTime?: string;
  videoLength?: string;
  pdfSize?: string;
};

// Sample resources data
const resources: ResourceType[] = [
  {
    id: '1',
    title: 'Como diversificar investimentos para reduzir riscos',
    description: 'Aprenda estratégias eficazes para distribuir seus investimentos e proteger seu patrimônio.',
    category: 'article',
    image: '/assets/diversification.jpg',
    link: '#',
    date: '12 Jun 2023',
    readTime: '8 min'
  },
  {
    id: '2',
    title: 'Planejamento financeiro para aposentadoria',
    description: 'Um guia completo sobre como preparar suas finanças para garantir uma aposentadoria tranquila.',
    category: 'ebook',
    image: '/assets/retirement.jpg',
    link: '#',
    date: '25 Mar 2023',
    pdfSize: '3.2 MB'
  },
  {
    id: '3',
    title: 'Entendendo a Bolsa de Valores para iniciantes',
    description: 'Uma análise simplificada do funcionamento do mercado de ações para iniciantes.',
    category: 'video',
    image: '/assets/stock-market.jpg',
    link: '#',
    date: '08 Mai 2023',
    videoLength: '15:28'
  },
  {
    id: '4',
    title: 'Renda Fixa x Renda Variável: O que escolher?',
    description: 'Compare diferentes modalidades de investimentos e descubra qual se alinha melhor aos seus objetivos.',
    category: 'article',
    image: '/assets/investment-types.jpg',
    link: '#',
    date: '30 Abr 2023',
    readTime: '6 min'
  }
];

const FinancialEducation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Filter resources based on selected category
  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory as ResourceCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Handle resource action based on category
  const handleResourceAction = (resource: ResourceType, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (resource.category === 'ebook') {
      // Download ebook (would be real functionality in production)
      alert(`Downloading: ${resource.title}`);
    } else if (resource.category === 'video') {
      // Open video in a modal or redirect to video page
      window.open(resource.link, '_blank');
    } else {
      // Read article
      window.open(resource.link, '_blank');
    }
  };

  // Get category icon component
  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case 'article': return <FileText size={16} className="mr-1.5" />;
      case 'video': return <Video size={16} className="mr-1.5" />;
      case 'ebook': return <BookOpen size={16} className="mr-1.5" />;
    }
  };

  // Get category info text
  const getCategoryInfo = (resource: ResourceType) => {
    switch (resource.category) {
      case 'article':
        return (
          <div className="flex items-center text-gray-400 text-xs">
            <FileText size={14} className="mr-1" />
            <span>Artigo • {resource.readTime} de leitura</span>
          </div>
        );
      case 'video':
        return (
          <div className="flex items-center text-gray-400 text-xs">
            <Video size={14} className="mr-1" />
            <span>Vídeo • {resource.videoLength}</span>
          </div>
        );
      case 'ebook':
        return (
          <div className="flex items-center text-gray-400 text-xs">
            <BookOpen size={14} className="mr-1" />
            <span>E-book • {resource.pdfSize}</span>
          </div>
        );
    }
  };

  return (
    <section id="educacao-financeira" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1A1D20] to-[#232527]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#AF8E41] font-['Cormorant_Garamond'] font-bold tracking-wide mb-2">
            EDUCAÇÃO FINANCEIRA
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-3"></div>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Conteúdos exclusivos para apoiar sua jornada financeira e ajudar a tomar decisões mais conscientes.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-[#2A2D31] rounded-lg p-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-md transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#AF8E41] text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveCategory('article')}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-md transition-all flex items-center ${
                activeCategory === 'article'
                  ? 'bg-[#AF8E41] text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <FileText size={14} className="mr-1" />
              Artigos
            </button>
            <button
              onClick={() => setActiveCategory('video')}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-md transition-all flex items-center ${
                activeCategory === 'video'
                  ? 'bg-[#AF8E41] text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Video size={14} className="mr-1" />
              Vídeos
            </button>
            <button
              onClick={() => setActiveCategory('ebook')}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-md transition-all flex items-center ${
                activeCategory === 'ebook'
                  ? 'bg-[#AF8E41] text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <BookOpen size={14} className="mr-1" />
              E-books
            </button>
          </div>
        </div>

        {/* Content cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              variants={itemVariants}
              className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg overflow-hidden hover:border-[#AF8E41]/40 transition-all duration-300 shadow-md hover:shadow-lg group flex flex-col h-full"
              onClick={(e) => handleResourceAction(resource, e)}
              role="button"
              tabIndex={0}
              aria-label={`Ver ${resource.title}`}
            >
              <div className="relative w-full pt-[60%] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1E]/80 to-transparent z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105"
                  style={{ backgroundImage: `url(${resource.image})` }}
                ></div>
                <div className="absolute bottom-3 left-3 z-20">
                  {getCategoryInfo(resource)}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="text-gray-400 text-xs mb-2">{resource.date}</div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-[#C6A052] transition-colors line-clamp-2">
                  {resource.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 line-clamp-2 flex-grow">
                  {resource.description}
                </p>
                <div className="flex items-center mt-auto text-[#AF8E41] text-xs sm:text-sm group-hover:text-[#C6A052] transition-colors">
                  {resource.category === 'ebook' ? (
                    <>
                      <Download size={14} className="mr-1" />
                      <span>Baixar E-book</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink size={14} className="mr-1" />
                      <span>Ler mais</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <div className="text-center mt-8">
          <a 
            href="/conteudos"
            className="inline-flex items-center justify-center px-5 py-2 bg-[#343941] hover:bg-[#3A4149] text-white rounded-lg transition-all duration-300 text-sm font-medium"
          >
            Ver todos os conteúdos
            <ExternalLink size={14} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinancialEducation;
