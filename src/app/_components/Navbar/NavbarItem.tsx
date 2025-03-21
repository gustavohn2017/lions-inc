import React from 'react';
import Link from 'next/link';

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="text-white hover:text-[#AF8E41] transition-colors duration-300 text-base font-medium"
    >
      {children}
    </Link>
  );
};

export default NavbarItem;