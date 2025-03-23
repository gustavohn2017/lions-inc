"use client";

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import logo_lions_bank from '@assets/logo_lions_bank.png';
import Image from 'next/image';
import './hero-animations.css';

export function Hero() {
  // Estado para controlar animações após carregamento
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ativa animações após componente montar
    setIsLoaded(true);
    
    // Scroll suave para os links de ancoragem
    const handleSmoothScroll = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      if (target.hash && target.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };
    
    // Adicionando event listener para todos os links dentro do Hero
    document.querySelectorAll('.hero-section a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });
    
    return () => {
      document.querySelectorAll('.hero-section a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const servicesSection = document.getElementById('produtos');
    if (servicesSection) {
      const headerOffset = 80;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = '5511999999999';
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços do Lions Bank Invest.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section 
      className="hero-section relative min-h-[90vh] flex items-center overflow-hidden"
      aria-label="Seção principal Lions Bank Invest"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1D25] to-[#252933]" />

        {/* Texture pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 5px,
                rgba(220,220,220,0.01) 5px,
                rgba(220,220,220,0.01) 6px
              )
            `,
            backgroundSize: '120px 120px'
          }}
        />

        {/* Light effects for depth */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
          <div className="absolute inset-0 bg-[radial-gradient(65%_65%_at_50%_35%,rgba(30,32,40,0)_0%,rgba(10,12,18,0.3)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#AF8E41]/[0.02] via-transparent to-[#AF8E41]/[0.02]" />
        </div>
      </div>

      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text content area */}
          <div className={`flex flex-col w-full md:w-1/2 items-center md:items-start hero-content-animate ${isLoaded ? 'is-loaded' : ''}`}>
            <h1 className="hero-title text-center md:text-left max-w-[90%] md:max-w-none break-words">
              LIONS BANK INVEST
            </h1>
            
            <h2 className="text-base sm:text-lg md:text-xl text-[#C6A052] font-medium mb-4 text-center md:text-left max-w-[90%] md:max-w-none">
              Investimentos inteligentes para seu futuro financeiro
            </h2>
            
            <p className="text-sm sm:text-base text-gray-100/90 drop-shadow-sm
               text-center md:text-left mb-6 max-w-md leading-relaxed">
              Soluções financeiras personalizadas com garantia e qualidade superior.
              Consultores especializados à sua disposição para um planejamento sem compromisso.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full sm:w-auto">
              <button
                onClick={scrollToServices}
                className="flex items-center justify-center gap-2 px-6 py-3 
                bg-gradient-to-r from-[#AF8E41] to-[#C6A052] hover:from-[#C6A052] hover:to-[#AF8E41]
                text-white rounded-lg transition-all duration-300 text-sm font-medium
                hover:shadow-[0_0_20px_rgba(175,142,65,0.3)] hover:-translate-y-0.5
                border border-[#AF8E41]/10 group"
                aria-label="Ver nossos serviços"
              >
                Conheça nossos Serviços
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className="h-3.5 transition-transform duration-300 group-hover:translate-x-1" 
                />
              </button>

              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2 px-6 py-3 
                bg-[#075e54] hover:bg-[#128c7e] text-white rounded-lg transition-all 
                duration-300 text-sm font-medium hover:shadow-md hover:-translate-y-0.5 
                group border border-emerald-700/10"
                aria-label="Contato via WhatsApp"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="h-4 transition-transform duration-300 group-hover:scale-110"
                />
                Fale Conosco
              </button>
            </div>
          </div>

          {/* Logo area - Visible on all screen sizes now */}
          <div className="relative md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
            <div className={`hero-image-wrapper ${isLoaded ? 'is-loaded' : ''}`}>
              <Image 
                src={logo_lions_bank}
                alt="Lions Bank Invest Logo"
                width={400}
                height={240}
                priority
                className="hero-image-animate object-contain max-w-[280px] sm:max-w-[320px] md:max-w-[400px]"
                style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background overlay gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A1D20] to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#1A1D20]/30 to-transparent"></div>
      </div>
    </section>
  );
}