import React from 'react';
import Link from 'next/link';

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'ghost' | 'accent' | 'mobile' | 'accent-mobile';
  isActive?: boolean;
  onClick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ 
  href, 
  children, 
  className = '', 
  variant = 'ghost',
  isActive = false,
  onClick
}) => {
  const baseStyles = "transition-all duration-300 text-sm font-medium";
  
  const variantStyles = {
    'ghost': `${isActive 
      ? "text-[#C6A052] bg-[#2A2D31]/40" 
      : "text-gray-200 hover:text-[#C6A052]"} px-3 py-2 rounded-md hover:bg-[#2A2D31]/30`,
    
    'accent': `${isActive 
      ? "text-white bg-[#C6A052] shadow-md" 
      : "text-white bg-[#AF8E41] hover:bg-[#C6A052]"} px-4 py-2 rounded-md border border-[#AF8E41]/30 shadow-sm transition-all duration-300 hover:shadow ease-in-out`,
    
    'mobile': `w-full text-center ${isActive 
      ? "text-[#C6A052] bg-[#2A2D31]/70" 
      : "text-gray-200 hover:text-[#C6A052]"} py-2.5 px-4 hover:bg-[#2A2D31]/50 rounded-md`,
    
    'accent-mobile': `w-full text-center ${isActive 
      ? "text-white bg-[#C6A052]" 
      : "text-white bg-[#AF8E41] hover:bg-[#C6A052]"} py-2.5 px-4 rounded-md border border-[#AF8E41]/30 shadow-sm`
  };

  // Se for link interno (anchor), use o comportamento de rolagem suave
  const handleClick = (e: React.MouseEvent) => {
    // Se começar com #, é um link de âncora
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
        
        // Chamada de callback para fechar menu no mobile, etc.
        if (onClick) onClick();
      }
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default NavbarItem;