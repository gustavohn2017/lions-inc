"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarItemProps {
  name: string;
  link: string;
}

const NavbarItem = ({ name, link }: NavbarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link 
      href={link}
      className={`
        px-3 py-2 rounded-md text-sm font-medium
        transition-all duration-300
        ${isActive 
          ? 'text-[#FFD700] bg-[#2C3033]' 
          : 'text-[#DAA520] hover:text-[#FFD700] hover:bg-[#2C3033]/50'
        }
        relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#FFD700]
        after:w-0 hover:after:w-full after:transition-all after:duration-300
      `}
    >
      {name}
    </Link>
  );
};

export default NavbarItem;