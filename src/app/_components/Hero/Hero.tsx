"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logo_lions_bank from '@assets/logo_lions_bank.png';
import './hero-animations.css';

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[200px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[280px]">
      {/* Background with Subtle Silver Stripes */}
      <div className="absolute inset-0">
        {/* Base Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E2028] to-[#262A34]" />

        {/* Subtle Silver Stripes */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 4px,
                rgba(220,220,220,0.01) 4px,
                rgba(220,220,220,0.01) 5px
              )
            `,
            backgroundSize: '100px 100px'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 4px,
                rgba(220,220,220,0.008) 4px,
                rgba(220,220,220,0.008) 5px
              )
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Light Effects */}
        <div className="absolute inset-0">
          {/* Vertical Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

          {/* Radial Gradient for Depth */}
          <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />

          {/* Subtle Gold Accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#AF8E41]/[0.01] via-transparent to-[#AF8E41]/[0.01]" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto relative z-20 px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col md:flex-row items-center w-full py-4 sm:py-5 md:py-6">
          {/* Left Content - Text and Buttons */}
          <div className="flex flex-col w-full md:w-3/5 items-center md:items-start hero-content-animate">
            <h1 className="hero-title text-center md:text-left text-3xl sm:text-4xl md:text-5xl">
              LIONS BANK INVEST
            </h1>

            <p className="text-sm sm:text-base text-gray-100/90 drop-shadow-sm backdrop-blur-[2px] 
               text-center md:text-left mb-3 max-w-md">
              Todo o nosso trabalho é realizado com garantia e qualidade superior!
              Oferecemos orçamentos sem compromisso.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1 md:pt-2 justify-center md:justify-start w-full sm:w-auto">
              <a
                href="#servicos"
                className="flex-1 sm:flex-initial text-center px-4 sm:px-5 py-2 
                bg-gradient-to-r from-[#AF8E41] to-[#C6A052] hover:from-[#C6A052] hover:to-[#AF8E41]
                text-white rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium
                hover:shadow-[0_0_15px_rgba(175,142,65,0.25)] hover:-translate-y-0.5
                border border-[#AF8E41]/10"
              >
                Conheça os nossos Serviços
              </a>

              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center px-4 sm:px-5 py-2 bg-[#075e54] hover:bg-[#128c7e] text-white rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium hover:shadow-md hover:-translate-y-0.5 group border border-emerald-700/10"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="mr-2 h-3 sm:h-4 transition-transform duration-300 group-hover:scale-110"
                />
                Contato via WhatsApp
              </a>
            </div>
          </div>

          {/* Right Side - Logo as Background Image */}
          <div className="relative md:w-2/5 mt-6 md:mt-0 md:ml-auto hidden lg:block">
            <div 
              className="w-full h-[220px] lg:h-[260px] bg-contain bg-center bg-no-repeat hero-image-animate"
              style={{ 
                backgroundImage: `url(${logo_lions_bank.src})`,
                backgroundPosition: 'center right'
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Logo Background - Only visible on mobile and tablet */}
      <div 
        className="absolute inset-0 lg:hidden z-10 opacity-30 bg-contain bg-center bg-no-repeat hero-background-image"
        style={{ backgroundImage: `url(${logo_lions_bank.src})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>
    </section>
  );
}