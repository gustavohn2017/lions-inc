import React from 'react';
import NavbarItem from './NavbarItem';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Brand</div>
      <div className="flex space-x-4">
        <NavbarItem name="Home" link="/" />
        <NavbarItem name="About" link="/about" />
        <NavbarItem name="Contact" link="/contact" />
      </div>
    </nav>
  );
};

export default Navbar;
