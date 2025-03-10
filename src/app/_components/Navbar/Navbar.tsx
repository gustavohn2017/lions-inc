"use client";
import React, { useState } from 'react';
import NavbarItem from './NavbarItem';

import Image from 'next/image';
import branco from '../../../../public/assets/branco.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex flex-wrap justify-between items-center p-4 bg-gray-800 text-white relative">
      <div className="flex items-center">
      <Image src={branco} alt="logo Lions" className="h-8 w-fit" />
      </div>
      <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-gray-400 transition duration-300"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      </div>
      <div
      className={`w-full md:w-auto md:flex transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-[500px]' : 'max-h-0'
      } md:max-h-full`}
      >
      <div className="flex flex-col items-center md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4 md:mt-0">
        <NavbarItem name="Home" link="/" />
        <NavbarItem name="Quem somos" link="/about" />
        <NavbarItem name="Contato" link="/contact" />
        <NavbarItem name="Produtos e Serviços" link="/contact" />
      </div>
      </div>
    </nav>
  );
};

export default Navbar;