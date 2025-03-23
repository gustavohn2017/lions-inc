"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Using the GSAP-like smooth scroll calculation
    const scrollTopPosition = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollStep = Math.PI / (1000 / 15); // Smooth animation step
    const cosParameter = scrollTopPosition / 2;
    let scrollCount = 0;
    let scrollMargin;
    
    // Smoother animation function
    const scrollAnimation = () => {
      if (document.documentElement.scrollTop || document.body.scrollTop > 0) {
        scrollCount += 1;
        scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        
        document.documentElement.scrollTop = document.body.scrollTop = scrollTopPosition - scrollMargin;
        requestAnimationFrame(scrollAnimation);
      }
    };
    
    requestAnimationFrame(scrollAnimation);
    
    // For accessibility, also set focus to the top of the document
    setTimeout(() => {
      const firstFocusableElement = document.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusableElement) {
        (firstFocusableElement as HTMLElement).focus();
      }
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToTop();
            }
          }}
          className="fixed bottom-5 left-5 z-30 w-10 h-10 rounded-full bg-[#AF8E41] text-white shadow-lg flex items-center justify-center hover:bg-[#C6A052] transition-all duration-300 stable-animation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AF8E41]"
          aria-label="Voltar ao topo"
          tabIndex={0}
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
