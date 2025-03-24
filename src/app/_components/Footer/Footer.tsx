"use client";

import React from 'react';
import Image from 'next/image';
import logo_lions_bank from '@assets/logo_lions_bank.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faMap, faEnvelope, faPhone, faAngleRight, faShield, faLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import './footer.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
    <footer className="bg-[#1A1A1E] border-t border-[#AF8E41]/20 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Short About */}
          <div className="footer-col">
            <div className="mb-4">
              <Image 
                src={logo_lions_bank}
                alt="Lions Bank Logo"
                width={170}
                height={60}
                className="mb-4"
              />
              <p className="text-gray-400 text-sm">
                Oferecemos soluções financeiras personalizadas de alta qualidade para impulsionar o seu sucesso.
              </p>
            </div>
            <div className="flex space-x-3 mt-5">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faFacebookF} className="w-3.5 h-3.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faYoutube} className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Links Rápidos</h4>
            <ul className="footer-links">
              <li>
                <a href="#sobre" onClick={(e) => handleLinkClick(e, 'sobre')}>
                  <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-[#AF8E41]" />
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#produtos" onClick={(e) => handleLinkClick(e, 'produtos')}>
                  <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-[#AF8E41]" />
                  Serviços
                </a>
              </li>
              <li>
                <a href="#calculadora" onClick={(e) => handleLinkClick(e, 'calculadora')}>
                  <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-[#AF8E41]" />
                  Calculadoras Financeiras
                </a>
              </li>
              <li>
                <a href="#consorcios" onClick={(e) => handleLinkClick(e, 'consorcios')}>
                  <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-[#AF8E41]" />
                  Consórcios
                </a>
              </li>
              <li>
                <a href="#contato" onClick={(e) => handleLinkClick(e, 'contato')}>
                  <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-[#AF8E41]" />
                  Contato
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Informações de Contato</h4>
            <ul className="footer-contact">
              <li>
                <FontAwesomeIcon icon={faMap} className="contact-icon" />
                <span>Av. Paulista, 1000 - Bela Vista,<br />São Paulo - SP, 01310-100</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                <a href="mailto:contato@lionsbank.com.br">contato@lionsbank.com.br</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                <a href="tel:+551199999999">(11) 99999-9999</a>
              </li>
            </ul>
          </div>
          
          {/* Secure & Legal */}
          <div className="footer-col">
            <h4 className="footer-heading">Segurança e Compliance</h4>
            <div className="bg-[#22242A] p-4 rounded-lg border border-[#AF8E41]/10">
              <div className="flex items-center mb-3">
                <FontAwesomeIcon icon={faShield} className="text-[#AF8E41] w-5 h-5 mr-3" />
                <div>
                  <h5 className="text-white text-sm font-medium">Navegação Segura</h5>
                  <p className="text-gray-400 text-xs">Certificado SSL de 256 bits</p>
                </div>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLock} className="text-[#AF8E41] w-5 h-5 mr-3" />
                <div>
                  <h5 className="text-white text-sm font-medium">Dados Protegidos</h5>
                  <p className="text-gray-400 text-xs">LGPD Compliant</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <a 
                  href="#" 
                  className="text-white hover:text-[#AF8E41] text-xs flex items-center justify-center transition-colors"
                >
                  Acessar Área do Cliente
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-[#AF8E41]/10 mt-12 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">
              © {year} Lions Bank Invest. Todos os direitos reservados.
            </p>
            <div className="mt-4 sm:mt-0 space-x-4 text-xs text-gray-400">
              <Link href="/politica-de-privacidade" className="hover:text-[#AF8E41] transition-colors">
                Política de Privacidade
              </Link>
              <span>|</span>
              <Link href="/termos-de-uso" className="hover:text-[#AF8E41] transition-colors">
                Termos de Uso
              </Link>
              <span>|</span>
              <button 
                onClick={scrollToTop}
                className="hover:text-[#AF8E41] transition-colors"
              >
                Voltar ao Topo
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
