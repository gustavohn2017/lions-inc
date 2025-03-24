"use client";

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import logo from '@assets/logo_lions_bank.png';
import './hero-animations.css';

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Scroll to services section
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const servicesSection = document.getElementById('produtos');
    if (servicesSection) {
      const headerOffset = 80;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Open WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = '5511999999999';
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços do Lions Bank Invest.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section
      className="hero-section relative min-h-[70vh] flex items-center bg-[#1A1A1E] overflow-hidden"
      aria-label="Seção principal Lions Bank Invest"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A2D31] to-[#1A1A1E] z-0"></div>

      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-grid-pattern"></div>
      </div>

      {/* Logo background on mobile */}
      {isMobile && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center">
          <Image
            src={logo}
            alt="Lions Bank Logo Background"
            className="opacity-30 w-4/5 max-w-[300px]"
          />
        </div>
      )}

      {/* Main content container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex ${isMobile ? 'flex-col items-center text-center' : 'flex-row items-center justify-between'}`}>

          {/* Left column - Content (always shown) */}
          <div className={`${isMobile ? 'w-full' : 'w-1/2'} hero-content`}>
            {/* Title and description */}
            <div className="mb-8">
              <h1 className="font-capricho text-4xl sm:text-5xl md:text-6xl text-[#AF8E41] mb-4">
                Soluções financeiras para seu sucesso
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Consultoria qualificada para empresas e pessoas físicas em consórcios, financiamentos,
                capital de giro e gestão financeira empresarial.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
              <button
                onClick={scrollToServices}
                className="flex items-center justify-center gap-2 px-6 py-3 
                bg-gradient-to-r from-[#AF8E41] to-[#C6A052] hover:from-[#C6A052] hover:to-[#AF8E41]
                text-white rounded-lg transition-all duration-300 text-sm font-medium
                hover:shadow-[0_0_20px_rgba(175,142,65,0.3)] hover:-translate-y-0.5
                border border-[#AF8E41]/10 group"
                aria-label="Ver nossos serviços"
              >
                Conheça Nossos Serviços
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

          {/* Right column - Logo (desktop only) */}
          {!isMobile && (
            <div className="w-1/2 flex justify-center">
              <img
                src={logo.src}
                alt="Lions Bank Logo"
                className="hero-logo-animate max-w-md"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1A1A1E] to-transparent pointer-events-none"></div>
    </section>
  );
}