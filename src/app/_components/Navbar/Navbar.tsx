"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo_lions_bank from '@assets/logo_lions_bank.png';
import { ChevronDown, User } from 'lucide-react';
import './navbar.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Check if page has scrolled to add background
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = [
        'home',
        'sobre',
        'investimentos',
        'calculadora',
        'produtos',
        'consorcios',
        'testimonial',
        'contato'
      ];

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dropdown hover handlers with delay
  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    // Set a timeout to close the dropdown after 500ms
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 500); // 500ms delay before closing
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Update mobile menu height when opened/closed
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        const height = mobileMenuRef.current.scrollHeight;
        mobileMenuRef.current.style.height = `${height}px`;
      } else {
        mobileMenuRef.current.style.height = '0px';
      }
    }
  }, [isMenuOpen]);

  // Scroll to section handler
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#1A1A1E]/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Removed "INVEST" text */}
          <div className="flex-shrink-0">
            <a href="#home" onClick={(e) => handleNavigation(e, 'home')} className="flex items-center">
              <Image
                src={logo_lions_bank}
                alt="Lions Bank"
                width={120}
                height={40}
                priority
                className="h-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex space-x-6 items-center">
              <a
                href="#home"
                onClick={(e) => handleNavigation(e, 'home')}
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              >
                Home
              </a>
              <a
                href="#sobre"
                onClick={(e) => handleNavigation(e, 'sobre')}
                className={`nav-link ${activeSection === 'sobre' ? 'active' : ''}`}
              >
                Sobre
              </a>
              
              {/* Services Dropdown */}
              <div className="relative">
                <button
                  className={`nav-link group flex items-center ${
                    ['produtos', 'investimentos', 'consorcios'].includes(activeSection) ? 'active' : ''
                  }`}
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                >
                  Serviços
                  <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
                </button>
                {servicesDropdownOpen && (
                  <div
                    className="dropdown-menu"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <a
                      href="#produtos"
                      onClick={(e) => handleNavigation(e, 'produtos')}
                      className="dropdown-item"
                    >
                      Nossos Serviços
                    </a>
                    <a
                      href="#investimentos"
                      onClick={(e) => handleNavigation(e, 'investimentos')}
                      className="dropdown-item"
                    >
                      Investimentos
                    </a>
                    <a
                      href="#consorcios"
                      onClick={(e) => handleNavigation(e, 'consorcios')}
                      className="dropdown-item"
                    >
                      Consórcios
                    </a>
                  </div>
                )}
              </div>
              
              <a
                href="#calculadora"
                onClick={(e) => handleNavigation(e, 'calculadora')}
                className={`nav-link ${activeSection === 'calculadora' ? 'active' : ''}`}
              >
                Calculadoras
              </a>
              <a
                href="#contato"
                onClick={(e) => handleNavigation(e, 'contato')}
                className={`nav-link ${activeSection === 'contato' ? 'active' : ''}`}
              >
                Contato
              </a>
            </div>
          </div>

          {/* Client Area Button */}
          <div className="hidden sm:block">
            <Link
              href="/cliente/login"
              className="client-area-btn"
            >
              <User size={16} className="mr-2" />
              Área do Cliente
            </Link>
          </div>

          {/* Mobile menu button - Custom hamburger icon */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-gray-800/30 hover:text-white focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Abrir menu principal</span>
              <div className={`hamburger-button ${isMenuOpen ? 'active' : ''}`}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div 
        ref={mobileMenuRef}
        className={`lg:hidden mobile-menu ${isMenuOpen ? 'open' : ''}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#home"
            onClick={(e) => handleNavigation(e, 'home')}
            className={`mobile-nav-link ${activeSection === 'home' ? 'active' : ''}`}
          >
            Home
          </a>
          <a
            href="#sobre"
            onClick={(e) => handleNavigation(e, 'sobre')}
            className={`mobile-nav-link ${activeSection === 'sobre' ? 'active' : ''}`}
          >
            Sobre
          </a>
          <a
            href="#produtos"
            onClick={(e) => handleNavigation(e, 'produtos')}
            className={`mobile-nav-link ${activeSection === 'produtos' ? 'active' : ''}`}
          >
            Serviços
          </a>
          <a
            href="#investimentos"
            onClick={(e) => handleNavigation(e, 'investimentos')}
            className={`mobile-nav-link ${activeSection === 'investimentos' ? 'active' : ''}`}
          >
            Investimentos
          </a>
          <a
            href="#consorcios"
            onClick={(e) => handleNavigation(e, 'consorcios')}
            className={`mobile-nav-link ${activeSection === 'consorcios' ? 'active' : ''}`}
          >
            Consórcios
          </a>
          <a
            href="#calculadora"
            onClick={(e) => handleNavigation(e, 'calculadora')}
            className={`mobile-nav-link ${activeSection === 'calculadora' ? 'active' : ''}`}
          >
            Calculadoras
          </a>
          <a
            href="#contato"
            onClick={(e) => handleNavigation(e, 'contato')}
            className={`mobile-nav-link ${activeSection === 'contato' ? 'active' : ''}`}
          >
            Contato
          </a>
          
          <div className="pt-4 pb-3 border-t border-gray-700">
            <Link
              href="/cliente/login"
              className="mobile-client-btn"
            >
              <User size={16} className="mr-2" />
              Área do Cliente
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}