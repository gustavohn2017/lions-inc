import React from "react";
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo_lions_bank from '@assets/logo_lions_bank.png';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1E] text-white pt-8 sm:pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Column 1 - Logo and About */}
          <div className="flex flex-col">
            <div className="mb-3">
              <Image 
                src={logo_lions_bank} 
                alt="Lions Bank Logo" 
                width={150} 
                height={50}
                className="w-28 xs:w-32 sm:w-40"
              />
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">
              Oferecemos soluções financeiras personalizadas para atender às suas necessidades e ajudar a alcançar seus objetivos.
            </p>
            <div className="flex space-x-4 mt-auto">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#AF8E41] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} className="sm:size-[18px]" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#AF8E41] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#AF8E41] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#AF8E41] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-[#AF8E41]">Links Rápidos</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#AF8E41] transition-colors text-xs sm:text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#AF8E41] transition-colors text-xs sm:text-sm">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-gray-400 hover:text-[#AF8E41] transition-colors text-xs sm:text-sm">
                  Produtos e Serviços
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#AF8E41] transition-colors text-xs sm:text-sm">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-[#AF8E41] transition-colors text-xs sm:text-sm">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#AF8E41] transition-colors text-xs sm:text-sm">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[#AF8E41]">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/produtos#credito" className="text-gray-400 hover:text-[#AF8E41] transition-colors text-sm">
                  Crédito com Garantia
                </Link>
              </li>
              <li>
                <Link href="/produtos#financiamento" className="text-gray-400 hover:text-[#AF8E41] transition-colors text-sm">
                  Financiamentos
                </Link>
              </li>
              <li>
                <Link href="/produtos#capital" className="text-gray-400 hover:text-[#AF8E41] transition-colors text-sm">
                  Capital de Giro
                </Link>
              </li>
              <li>
                <Link href="/produtos#consultoria" className="text-gray-400 hover:text-[#AF8E41] transition-colors text-sm">
                  Consultoria Financeira
                </Link>
              </li>
              <li>
                <Link href="/produtos#avaliacao" className="text-gray-400 hover:text-[#AF8E41] transition-colors text-sm">
                  Avaliação de Imóveis
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-[#AF8E41]">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-[#AF8E41] mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Av. Paulista, 1000 - Bela Vista, São Paulo - SP
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-[#AF8E41] mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm">(11) 99999-9999</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-[#AF8E41] mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm">contato@lionsbank.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-5 sm:my-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-xxs xs:text-xs sm:text-sm">
            © {new Date().getFullYear()} Lions Bank - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
