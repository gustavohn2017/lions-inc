"use client";

import React from 'react';
// ...existing code...
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import logo_lions_bank from '@assets/logo_lions_bank.png';
import './hero-animations.css';
// Remove or comment out this line:
// import '@/app/fonts.css';
// ...existing code...
export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[320px] md:min-h-[420px] lg:min-h-[380px] xl:min-h-[420px]">
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

      {/* Background Pattern - Mobile Only */}
      <div className="absolute inset-0 md:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 z-10" />
        <Image
          src={logo_lions_bank}
          alt="Background Logo"
          fill
          style={{ opacity: 0.4 }}
          className="object-contain p-4 hero-image-animate"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto relative z-20 px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center py-6 md:py-8 lg:py-10 min-h-[320px] md:min-h-[420px] lg:min-h-[380px] xl:min-h-[420px]">
          {/* Left Content */}
            <div className="flex flex-col max-w-xl mx-auto lg:mx-0 hero-content-animate md:pt-0 lg:pt-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold font-capricho hero-title bg-gradient-to-r from-[#AF8E41] to-[#AF8E41] bg-clip-text text-transparent">
              LIONS BANK INVEST
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-100/90 drop-shadow-sm
  backdrop-blur-[2px] relative z-10 md:max-w-md lg:max-w-lg">
              Todo o nosso trabalho é realizado com garantia e qualidade superior!
              Oferecemos orçamentos sem compromisso.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 md:pt-4">
              <a
                href="#servicos"
                className="flex-1 sm:flex-none text-center px-5 py-2.5 
                bg-gradient-to-r from-[#AF8E41] to-[#C6A052] hover:from-[#C6A052] hover:to-[#AF8E41]
                text-white rounded-lg transition-all duration-300 text-sm md:text-base font-medium
                hover:shadow-[0_0_15px_rgba(175,142,65,0.25)] hover:-translate-y-0.5
                border border-[#AF8E41]/10"
              >
                Conheça os nossos Serviços
              </a>

              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center px-5 py-2.5 
                bg-[#075e54] hover:bg-[#128c7e] text-white rounded-lg transition-all 
                duration-300 text-sm md:text-base font-medium hover:shadow-md hover:-translate-y-0.5 group
                border border-emerald-700/10"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="mr-2 h-4 transition-transform duration-300 group-hover:scale-110"
                />
                Contato via WhatsApp
              </a>
            </div>
          </div>

          {/* Right Image - Tablet and Desktop */}
          <div className="hidden md:block relative h-full">
            <Image
              src={logo_lions_bank}
              alt="Background Logo"
              fill
              style={{ opacity: 0.85 }}
              className="object-contain p-4 hero-image-animate"
              priority
              sizes="(max-width: 1024px) 50vw, 40vw"
            />
          </div>

          {/* Removed duplicate Background Pattern since it was defined earlier */}
        </div>
      </div>
    </section>
  );
}