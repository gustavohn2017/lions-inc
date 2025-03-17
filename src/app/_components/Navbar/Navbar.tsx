"use client";
import React, { useState } from 'react';
import NavbarItem from './NavbarItem';
import Image from 'next/image';
import logo_lions_bank from '../../../../public/assets/logo_lions_bank.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex flex-wrap justify-between items-center px-4 py-3 bg-[#1E2124] text-[#DAA520] relative shadow-md">
      <div className="flex items-center">
        <Image 
          src={logo_lions_bank} 
          alt="logo Lions" 
          className="h-12 w-fit hover:opacity-90 transition-opacity duration-300" 
        />
      </div>
      
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#AF8E41] hover:text-[#FFD700] transition duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      <div
        className={`w-full md:w-auto md:flex transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 md:max-h-full opacity-0 md:opacity-100'
        }`}
      >
        <div className="flex flex-col items-center md:flex-row md:space-x-6 space-y-4 md:space-y-0 mt-4 md:mt-0">
          <NavbarItem name="Home" link="/" />
          <NavbarItem name="Quem somos" link="/about" />
          <NavbarItem name="Contato" link="/contact" />
          <NavbarItem name="Produtos e Serviços" link="/produtos" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;