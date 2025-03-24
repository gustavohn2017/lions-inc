"use client";

import React, { useEffect } from 'react';
import { Navbar } from './_components/Navbar/Navbar';
import { Hero } from './_components/Hero/Hero';
import AboutSection from './_components/About/AboutSection';
import InvestmentOptions from './_components/InvestmentOptions/InvestmentOptions';
import BusinessCalculator from './_components/BusinessCalculator/BusinessCalculator';
import ServiceTabs from './_components/ServiceTabs/ServiceTabs';
import FeaturedServices from './_components/FeaturedServices/FeaturedServices';
import ConsortiumSection from './_components/ConsortiumSection/ConsortiumSection';
import ContactForm from './_components/ContactForm/ContactForm';
import Footer from './_components/Footer/Footer';
import FloatingWhatsApp from './_components/FloatingWhatsApp/FloatingWhatsApp';
import BackToTop from './_components/BackToTop/BackToTop';

export default function Home() {
  // Initialize smooth scroll implementation
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
        <AboutSection />
      </section>
      
      <section id="investimentos" className="scroll-mt-20">
        <InvestmentOptions />
      </section>
      
      <section id="calculadora" className="scroll-mt-20">
        <BusinessCalculator />
      </section>
      
      <section id="produtos" className="scroll-mt-20">
        <ServiceTabs />
      </section>
      
      <section id="servicos-destaque" className="scroll-mt-20">
        <FeaturedServices />
      </section>
      
      <section id="consorcios" className="scroll-mt-20">
        <ConsortiumSection />
      </section>
      
      <section id="contato" className="scroll-mt-20">
        <ContactForm />
      </section>
      
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </main>
  );
}
