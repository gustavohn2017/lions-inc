"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import logo_lions_bank from '@assets/logo_lions_bank.png';

// Definição de tipos
type NavItem = {
  id: string;
  label: string;
  href: string;
  isPrimary?: boolean;
};

const Navbar: React.FC = () => {
  // Estados
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Itens de navegação
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'sobre', label: 'Quem Somos', href: '#sobre' },
    { id: 'produtos', label: 'Soluções', href: '#produtos' },
    { id: 'testimonial', label: 'Depoimentos', href: '#testimonial' },
    { id: 'contato', label: 'Contato', href: '#contato', isPrimary: true },
  ];

  // Detectar seção ativa durante a rolagem
  const detectActiveSection = useCallback(() => {
    const sections = navItems.map(item => item.id);
    
    // Verificar qual seção está mais visível
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section);
          break;
        }
      }
    }
    
    // Detectar se a página foi rolada
    setIsScrolled(window.scrollY > 10);
  }, [navItems]);

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
      // Verifica se o clique foi no botão do menu ou dentro do menu
      const target = event.target as HTMLElement;
      const menuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      
      // Não fecha o menu se o clique foi no botão ou dentro do menu
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  // Handler para toggle do menu mobile
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1A1A1E]/85 backdrop-blur-sm' 
          : 'bg-[#1A1A1E]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#home" onClick={() => scrollToSection('home')}>
              <Image 
                src={logo_lions_bank} 
                alt="Lions Bank" 
                className="h-9 w-auto"
                height={36}
                width={120}
                priority
              />
            </a>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
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
                  <span className="block h-0.5 w-2/3 mx-auto mt-0.5 bg-[#AF8E41] rounded-full" />
                )}
              </a>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-button"
              type="button"
              className="flex items-center justify-center p-2 rounded-md text-[#AF8E41] hover:bg-[#28282E]/30 focus:outline-none"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? (
                // Ícone X quando aberto
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Ícone hamburger quando fechado
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
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
            className="md:hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1 bg-[#1E1E22] border-t border-[#333]/30">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`
                    block px-3 py-2.5 rounded-md text-base font-medium transition-all duration-200
                    ${item.isPrimary 
                      ? 'bg-gradient-to-r from-[#AF8E41] to-[#C6A052] text-white' 
                      : activeSection === item.id
                        ? 'text-[#C6A052] bg-[#28282E]'
                        : 'text-gray-300 hover:text-[#C6A052] hover:bg-[#28282E]/50'
                    }
                  `}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;