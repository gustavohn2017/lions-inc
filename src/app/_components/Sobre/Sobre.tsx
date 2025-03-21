'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaLightbulb, FaBullseye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './sobre.css';

const Sobre: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const content = [
    {
      id: 'who',
      title: "Quem Somos",
      content: "A lions, fundada em 2022, lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
      icon: <FaUsers className="text-6xl text-[#AF8E41]" />
    },
    {
      id: 'vision',
      title: "Nossa Visão",
      content: "Ser reconhecida como referência de excelência na prestação de serviços financeiros, com foco na satisfação do cliente e na geração de valor para a sociedade.",
      icon: <FaLightbulb className="text-6xl text-[#AF8E41]" />
    },
    {
      id: 'mission',
      title: "Nossa Missão",
      content: "Oferecer serviços com a maior qualidade e atenção ao cliente, garantindo a satisfação de suas necessidades e expectativas. ",
      icon: <FaBullseye className="text-6xl text-[#AF8E41]" />
    }
  ];

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    adaptiveHeight: false
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="h-[800px] bg-gradient-to-b from-[#1E2124] to-[#242729] py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-6xl mx-auto h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="title-main text-4xl md:text-5xl text-[#AF8E41] font-bold text-center mb-16 font-['Cormorant_Garamond'] tracking-wider">
          SOBRE A LIONS BANK
        </h2>
        
        {isMobile ? (
          <div className="relative h-[460px] md:h-[500px]">
            <div className="h-[380px] mb-8">
              <Slider ref={sliderRef} {...sliderSettings}>
                {content.map((item) => (
                  <div key={item.id} className="!h-[380px]">
                    <motion.div
                      variants={itemVariants}
                      className="bg-[#2A2D31] rounded-lg shadow-lg p-5 sm:p-8 h-full"
                    >
                      <div className="flex flex-col items-center h-full">
                        <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <h3 className="title-card text-2xl sm:text-3xl font-semibold text-[#AF8E41] mb-4 sm:mb-6 text-center font-['Cormorant_Garamond'] tracking-wide">
                          {item.title}
                        </h3>
                        <div className="overflow-y-auto flex-1 scrollbar-hide px-1 max-h-[200px]">
                          <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-center">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between pt-4">
              <button 
                onClick={() => sliderRef.current?.slickPrev()}
                disabled={activeSlide === 0}
                className="p-2 text-[#AF8E41] disabled:opacity-30 transition-opacity focus:outline-none hover:scale-110 duration-300"
                aria-label="Previous slide"
              >
                <FaChevronLeft size={24} />
              </button>

              <div className="flex items-center space-x-3">
                {content.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => sliderRef.current?.slickGoTo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                      activeSlide === index 
                        ? 'bg-[#AF8E41] scale-125' 
                        : 'bg-[#AF8E41] opacity-30'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={() => sliderRef.current?.slickNext()}
                disabled={activeSlide === content.length - 1}
                className="p-2 text-[#AF8E41] disabled:opacity-30 transition-opacity focus:outline-none hover:scale-110 duration-300"
                aria-label="Next slide"
              >
                <FaChevronRight size={24} />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-auto md:h-[500px]">
            {content.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-[#2A2D31] rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full"
              >
                <div className="p-5 sm:p-8 flex flex-col items-center h-full">
                  <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="title-card text-2xl sm:text-3xl font-semibold text-[#AF8E41] mb-4 sm:mb-6 text-center font-['Cormorant_Garamond'] tracking-wide">
                    {item.title}
                  </h3>
                  <div className="overflow-y-auto flex-1 scrollbar-hide px-1">
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-center">
                      {item.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Sobre;