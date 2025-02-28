import React from 'react';
import Link from 'next/link';

interface NavbarItemProps {
  name: string;
  link: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ name, link }) => {
  return (
    <Link href={link} className="text-white hover:text-grey-400 transition duration-300">
      {name}
    </Link>
  );
};

export default NavbarItem;
