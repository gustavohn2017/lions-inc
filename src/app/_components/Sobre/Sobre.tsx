'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaLightbulb, FaBullseye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
      content: "Somos uma empresa inovadora fundada em 2010, dedicada a fornecer soluções de alta qualidade para nossos clientes. Com uma equipe de profissionais qualificados e experientes, construímos uma reputação sólida baseada na excelência, integridade e comprometimento com resultados excepcionais em todos os projetos que realizamos.",
      icon: <FaUsers className="text-5xl text-[#DAA520]" />
    },
    {
      id: 'vision',
      title: "Nossa Visão",
      content: "Ser reconhecida como referência de excelência em nosso setor, promovendo inovação e soluções sustentáveis que impactam positivamente a sociedade e estabelecem novos padrões no mercado. Buscamos constantemente antecipar tendências e desenvolver tecnologias que transformam desafios em oportunidades.",
      icon: <FaLightbulb className="text-5xl text-[#DAA520]" />
    },
    {
      id: 'mission',
      title: "Nossa Missão",
      content: "Oferecer produtos e serviços de alta qualidade que atendam às necessidades de nossos clientes, enquanto mantemos um compromisso inabalável com a ética nos negócios, responsabilidade social e desenvolvimento sustentável em todas as nossas operações.",
      icon: <FaBullseye className="text-5xl text-[#DAA520]" />
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
        <h2 className="text-3xl md:text-4xl text-[#DAA520] font-bold text-center mb-12">
          Sobre a Lions Bank
        </h2>
        
        {isMobile ? (
          <div className="relative h-[500px]">
            <div className="h-[400px] mb-8">
              <Slider ref={sliderRef} {...sliderSettings}>
                {content.map((item) => (
                  <div key={item.id} className="!h-[400px]">
                    <motion.div
                      variants={itemVariants}
                      className="bg-[#2A2D31] rounded-lg shadow-lg p-8 h-full"
                    >
                      <div className="flex flex-col items-center h-full">
                        <div className="mb-6 transform hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <h3 className="text-2xl font-semibold text-[#DAA520] mb-4 text-center">
                          {item.title}
                        </h3>
                        <div className="overflow-y-auto flex-1 scrollbar-hide">
                          <p className="text-gray-300 leading-relaxed text-center">
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
                className="p-2 text-[#DAA520] disabled:opacity-30 transition-opacity focus:outline-none"
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
                        ? 'bg-[#DAA520] scale-125' 
                        : 'bg-[#DAA520] opacity-30'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={() => sliderRef.current?.slickNext()}
                disabled={activeSlide === content.length - 1}
                className="p-2 text-[#DAA520] disabled:opacity-30 transition-opacity focus:outline-none"
                aria-label="Next slide"
              >
                <FaChevronRight size={24} />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
            {content.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="bg-[#2A2D31] rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full"
              >
                <div className="p-8 flex flex-col items-center h-full">
                  <div className="mb-6 transform hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-[#DAA520] mb-4 text-center">
                    {item.title}
                  </h3>
                  <div className="overflow-y-auto flex-1 scrollbar-hide">
                    <p className="text-gray-300 leading-relaxed text-center">
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