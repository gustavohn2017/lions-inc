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
    
    // Opcional: scroll suave para os links de ancoragem
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = ((e as MouseEvent).currentTarget as HTMLAnchorElement).getAttribute('href');
        if (!href) return;
        document.querySelector(href)?.scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <section 
      className="relative overflow-hidden min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]"
      aria-label="Seção principal Lions Bank Invest"
    >
      {/* Camada de fundo com gradientes e texturas */}
      <div className="absolute inset-0">
        {/* Base de cor com degradê sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1D25] to-[#252933]" />

        {/* Padrão de textura refined com linhas diagonais */}
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

        {/* Efeitos de luz para profundidade */}
        <div className="absolute inset-0">
          {/* Gradiente vertical para profundidade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
          
          {/* Gradiente radial para foco central */}
          <div className="absolute inset-0 bg-[radial-gradient(65%_65%_at_50%_35%,rgba(30,32,40,0)_0%,rgba(10,12,18,0.3)_100%)]" />
          
          {/* Sutil acento dourado nas bordas */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#AF8E41]/[0.02] via-transparent to-[#AF8E41]/[0.02]" />
        </div>
      </div>

      {/* Container principal de conteúdo */}
      <div className="container mx-auto relative z-20 px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col md:flex-row items-center w-full py-8 sm:py-10 md:py-12">
          {/* Área de conteúdo textual */}
          <div className={`flex flex-col w-full md:w-3/5 items-center md:items-start hero-content-animate ${isLoaded ? 'is-loaded' : ''}`}>
            <h1 className="hero-title text-center md:text-left">
              LIONS BANK INVEST
            </h1>
            
            <h2 className="text-base sm:text-lg text-[#C6A052] font-medium mb-3 text-center md:text-left">
              Investimentos inteligentes para o seu futuro financeiro
            </h2>
            
            <p className="text-sm sm:text-base text-gray-100/90 drop-shadow-sm
               text-center md:text-left mb-4 max-w-md leading-relaxed">
              Soluções financeiras personalizadas com garantia e qualidade superior.
              Consultores especializados à sua disposição para um planejamento sem compromisso.
            </p>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 md:pt-3 justify-center md:justify-start w-full sm:w-auto">
              <a
                href="#servicos"
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 
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
              </a>

              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 
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
              </a>
            </div>
          </div>

          {/* Área do logotipo - Visível apenas em desktop */}
          <div className="relative md:w-2/5 mt-8 md:mt-0 md:ml-auto hidden lg:block">
            <div 
              className={`hero-image-wrapper ${isLoaded ? 'is-loaded' : ''}`}
            >
              <Image 
                src={logo_lions_bank}
                alt="Lions Bank Invest Logo"
                width={400}
                height={240}
                priority
                className="hero-image-animate object-contain"
                style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logo background para mobile e tablet */}
      <div 
        className={`absolute inset-0 lg:hidden z-10 bg-contain bg-no-repeat bg-center hero-background-image ${isLoaded ? 'is-loaded' : ''}`}
        style={{ 
          backgroundImage: `url(${logo_lions_bank.src})`,
          opacity: 0
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>
    </section>
  );
}