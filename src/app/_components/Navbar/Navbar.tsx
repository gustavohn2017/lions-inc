"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import logo_lions_bank from '@assets/logo_lions_bank.png';
import { User, Menu, X, ChevronDown } from 'lucide-react';

// Definição de tipos
type NavItem = {
  id: string;
  label: string;
  href: string;
  isPrimary?: boolean;
  subItems?: {id: string, label: string, href: string}[];
};

export const Navbar: React.FC = () => {
  // Estados
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  // Itens de navegação
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'sobre', label: 'Quem Somos', href: '#sobre' },
    { 
      id: 'produtos', 
      label: 'Soluções', 
      href: '#produtos',
      subItems: [
        {id: 'investimentos', label: 'Investimentos', href: '#investimentos'},
        {id: 'consorcios', label: 'Consórcios', href: '#consorcios'},
        {id: 'produtos-financeiros', label: 'Produtos Financeiros', href: '#produtos'},
      ]
    },
    { id: 'educacao-financeira', label: 'Educação Financeira', href: '#educacao-financeira' },
    { id: 'testimonial', label: 'Depoimentos', href: '#testimonial' },
    { id: 'contato', label: 'Contato', href: '#contato', isPrimary: true },
  ];

  // Detectar seção ativa durante a rolagem
  const detectActiveSection = useCallback(() => {
    const sections = [
      'home', 'sobre', 'investimentos', 'calculadora', 'produtos', 
      'consorcios', 'educacao-financeira', 'testimonial', 'contato'
    ];
    
    // Verificar qual seção está mais visível
    let currentSection = activeSection;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const visiblePercentage = Math.min(
          Math.max(0, rect.bottom) - Math.max(0, rect.top), 
          window.innerHeight
        ) / window.innerHeight;
        
        if (visiblePercentage > 0.3) {
          currentSection = section;
          break;
        }
      }
    }
    
    setActiveSection(currentSection);
    
    // Detectar se a página foi rolada
    setIsScrolled(window.scrollY > 10);
  }, [activeSection]);

  // Efeito para detectar a seção ativa e rolagem
  useEffect(() => {
    window.addEventListener('scroll', detectActiveSection);
    detectActiveSection(); // Verificar inicialmente
    
    return () => {
      window.removeEventListener('scroll', detectActiveSection);
    };
  }, [detectActiveSection]);

  // Efeito para fechar o menu mobile ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      
      if (
        menuButton && menuButton.contains(target) || 
        mobileMenu && mobileMenu.contains(target)
      ) {
        return;
      }
      
      if (isMenuOpen) setIsMenuOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Função para navegação suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMenuOpen(false);
      setOpenSubMenu(null);
    }
  };

  // Handler para toggle do menu mobile
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = (id: string) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 prevent-flicker ${
        isScrolled 
          ? 'bg-[#1A1A1E]/90 backdrop-blur-md shadow-lg' 
          : 'bg-[#1A1A1E]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" onClick={() => scrollToSection('home')} aria-label="Home">
              <Image 
                src={logo_lions_bank} 
                alt="Lions Bank" 
                className="h-8 sm:h-9 w-auto"
                height={36}
                width={120}
                priority
              />
            </a>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-1.5 lg:space-x-2">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.subItems ? (
                  <div className="inline-block">
                    <button
                      onClick={() => toggleSubMenu(item.id)}
                      className={`
                        px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 inline-flex items-center
                        ${activeSection === item.id 
                          ? 'text-[#C6A052] bg-[#28282E]'
                          : 'text-gray-300 hover:text-[#C6A052] hover:bg-[#28282E]/70'
                        }
                      `}
                    >
                      {item.label}
                      <ChevronDown size={14} className="ml-1 transition-transform duration-200" />
                      {activeSection === item.id && (
                        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-2/3 bg-[#AF8E41] rounded-full" />
                      )}
                    </button>
                    
                    <div className="absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg bg-[#222228] ring-1 ring-black ring-opacity-5 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                      <div className="py-1">
                        {item.subItems.map(subItem => (
                          <a
                            key={subItem.id}
                            href={subItem.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(subItem.id);
                            }}
                            className={`
                              block px-4 py-2 text-xs lg:text-sm transition-colors duration-200
                              ${activeSection === subItem.id 
                                ? 'text-[#C6A052] bg-[#2A2D31]'
                                : 'text-gray-300 hover:text-[#C6A052] hover:bg-[#2A2D31]/70'
                              }
                            `}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`
                      px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 inline-block relative
                      ${item.isPrimary 
                        ? `bg-gradient-to-r from-[#AF8E41] to-[#C6A052] text-white shadow-sm 
                          hover:shadow-md hover:from-[#C6A052] hover:to-[#D6B062]` 
                        : activeSection === item.id
                          ? 'text-[#C6A052] bg-[#28282E]'
                          : 'text-gray-300 hover:text-[#C6A052] hover:bg-[#28282E]/70'
                      }
                    `}
                  >
                    {item.label}
                    {!item.isPrimary && activeSection === item.id && (
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-2/3 bg-[#AF8E41] rounded-full" />
                    )}
                  </a>
                )}
              </div>
            ))}
            
            {/* Client Login Button */}
            <a 
              href="#" 
              className="ml-2 flex items-center px-3 py-2 rounded-md text-xs lg:text-sm text-white bg-[#343941] hover:bg-[#3A4149] transition-all duration-200"
            >
              <User size={14} className="mr-1.5" />
              Área do Cliente
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-button"
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#AF8E41] hover:bg-[#28282E]/30 focus:outline-none"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden prevent-flicker"
          >
            <div className="px-3 pt-2 pb-3 space-y-1 bg-[#1E1E22] border-t border-[#333]/30">
              {navItems.map((item) => (
                <div key={item.id}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleSubMenu(item.id)}
                        className={`
                          w-full flex justify-between items-center px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200
                          ${activeSection === item.id 
                            ? 'text-[#C6A052] bg-[#28282E]'
                            : 'text-gray-300 hover:text-[#C6A052] hover:bg-[#28282E]/70'
                          }
                        `}
                      >
                        {item.label}
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-200 ${
                            openSubMenu === item.id ? 'transform rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {openSubMenu === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 space-y-1 mt-1"
                          >
                            {item.subItems.map(subItem => (
                              <a
                                key={subItem.id}
                                href={subItem.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToSection(subItem.id);
                                }}
                                className={`
                                  block px-3 py-2 rounded-md text-sm transition-colors duration-200
                                  ${activeSection === subItem.id 
                                    ? 'text-[#C6A052] bg-[#2A2D31]'
                                    : 'text-gray-300 hover:text-[#C6A052] hover:bg-[#2A2D31]/70'
                                  }
                                `}
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className={`
                        block px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200
                        ${item.isPrimary 
                          ? `bg-gradient-to-r from-[#AF8E41] to-[#C6A052] text-white shadow-sm 
                            hover:shadow-md hover:from-[#C6A052] hover:to-[#D6B062]` 
                          : activeSection === item.id
                            ? 'text-[#C6A052] bg-[#28282E]'
                            : 'text-gray-300 hover:text-[#C6A052] hover:bg-[#28282E]/70'
                        }
                      `}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}

              {/* Client Login in Mobile Menu */}
              <a 
                href="#" 
                className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-white bg-[#343941] hover:bg-[#3A4149] transition-all duration-200"
              >
                <User size={16} className="mr-2" />
                Área do Cliente
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};