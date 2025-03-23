"use client";

import React, { useEffect } from 'react';
import { Navbar } from './_components/Navbar/Navbar';
import { Hero } from './_components/Hero/Hero';
import About from './_components/Sobre/Sobre';
import InvestmentOptions from './_components/InvestmentOptions/InvestmentOptions';
import FinancialCalculator from './_components/FinancialCalculator/FinancialCalculator';
import ProductSection from './_components/ProductSection/ProductSection';
import Testimonial from './_components/Testmonial/Testmonial';
import ConsortiumSection from './_components/ConsortiumSection/ConsortiumSection';
import FinancialEducation from './_components/FinancialEducation/FinancialEducation';
import Contato from './_components/Contato/Contato';
import Footer from './_components/Footer/Footer';
import FloatingWhatsApp from './_components/FloatingWhatsApp/FloatingWhatsApp';
import BackToTop from './_components/BackToTop/BackToTop';

export default function Home() {
  // Initialize AOS animation library
  useEffect(() => {
    // Smooth scroll implementation for hash links
    const handleHashLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#') && link.origin === window.location.origin) {
        e.preventDefault();
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          // Add offset for fixed header
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleHashLinkClick);

    return () => {
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section id="home">
        <Hero />
      </section>
      
      <section id="sobre" className="scroll-mt-20">
        <About />
      </section>
      
      <section id="investimentos" className="scroll-mt-20">
        <InvestmentOptions />
      </section>
      
      <section id="calculadora" className="scroll-mt-20">
        <FinancialCalculator />
      </section>
      
      <section id="produtos" className="scroll-mt-20">
        <ProductSection />
      </section>
      
      <section id="consorcios" className="scroll-mt-20">
        <ConsortiumSection />
      </section>
      
      <section id="educacao-financeira" className="scroll-mt-20">
        <FinancialEducation />
      </section>
      
      <section id="testimonial" className="scroll-mt-20">
        <Testimonial />
      </section>
      
      <section id="contato" className="scroll-mt-20">
        <Contato />
      </section>
      
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </main>
  );
}
