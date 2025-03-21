"use client";
import React, { useState, useEffect } from 'react';
import NavbarItem from './NavbarItem';
import Image from 'next/image';
import logo_lions_bank from '@assets/logo_lions_bank.png';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
    };
    
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, [isOpen]);
  
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex flex-wrap justify-between items-center px-4 py-3 
                 ${scrolled ? 'bg-[#1A1A1E]/95 backdrop-blur-sm shadow-lg' : 'bg-[#1E2124]'} text-[#AF8E41]`}
    >
      <div className="flex items-center">
        <Image 
          src={logo_lions_bank} 
          alt="logo Lions" 
          width={120}
          height={40}
          className="h-10 sm:h-12 w-auto hover:opacity-90 transition-opacity duration-300" 
        />
      </div>
      
      <div className="md:hidden">
        <button
          onClick={handleMenuToggle}
          className="text-[#AF8E41] hover:text-[#FFD700] transition duration-300 p-2"
          aria-label="Toggle menu"
        >
          <div className={`w-6 flex flex-col items-end gap-1.5 transition-all ${isOpen ? 'gap-0' : ''}`}>
            <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-0.5' : 'w-6'}`}></span>
            <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0 w-6' : 'w-4'}`}></span>
            <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-0.5' : 'w-5'}`}></span>
          </div>
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
        <NavbarItem name="Home" link="/" />
        <NavbarItem name="Quem somos" link="/about" />
        <NavbarItem name="Contato" link="/contact" />
        <NavbarItem name="Produtos e Serviços" link="/produtos" />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full md:hidden overflow-hidden mt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              className="flex flex-col items-center space-y-4 py-4 bg-[#2A2D31] rounded-lg shadow-xl border border-[#AF8E41]/10"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <NavbarItem name="Home" link="/" />
              <NavbarItem name="Quem somos" link="/about" />
              <NavbarItem name="Contato" link="/contact" />
              <NavbarItem name="Produtos e Serviços" link="/produtos" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;