"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import LC from '../../../../public/assets/LC.png';
import './hero-animations.css';

export function Hero() {
  return (
    <section className="relative bg-[#1E2124] text-white overflow-hidden min-h-[320px] md:min-h-[380px] lg:min-h-[320px]">
      {/* Background Pattern - Mobile and Tablet */}
      <div className="absolute inset-0 md:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2124]/90 to-[#1E2124] z-10" />
        <Image
          src={LC}
          alt="Background Logo"
          fill
          className="opacity-30 object-contain p-4 hero-image-animate"
          priority
          sizes="100vw"
        />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto relative z-20 px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center py-6 lg:py-8 min-h-[320px] md:min-h-[380px] lg:min-h-[320px]">
          {/* Left Content */}
          <div className="flex flex-col space-y-4 max-w-xl mx-auto lg:mx-0 hero-content-animate">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#DAA520] leading-tight">
              Lions Incorporadora e Serviços
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300">
              Todo o nosso trabalho é realizado com garantia e qualidade superior! 
              Oferecemos orçamentos sem compromisso.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href="#servicos" 
                className="flex-1 sm:flex-none text-center px-5 py-2.5 bg-[#2C3033] hover:bg-[#363B40] 
                text-[#DAA520] rounded-lg transition-all duration-300 text-sm font-medium
                hover:shadow-lg hover:-translate-y-0.5"
              >
                Conheça os nossos Serviços
              </a>
              
              <a 
                href="https://wa.me/yourwhatsappnumber" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 sm:flex-none flex items-center justify-center px-5 py-2.5 
                bg-[#075e54] hover:bg-[#128c7e] text-white rounded-lg transition-all 
                duration-300 text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 group"
              >
                <FontAwesomeIcon 
                  icon={faWhatsapp} 
                  className="mr-2 h-4 transition-transform duration-300 group-hover:scale-110" 
                />
                Contato via WhatsApp
              </a>
            </div>
          </div>

          {/* Right Image - Desktop Only */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs">
              <div className="relative aspect-square">
                <Image
                  src={LC}
                  alt="Logo Lions"
                  fill
                  className="object-contain opacity-85 hero-image-animate"
                  priority
                  sizes="(max-width: 1024px) 0vw, 300px"
                  style={{ 
                    filter: 'drop-shadow(0 0 20px rgba(218, 165, 32, 0.1))',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}