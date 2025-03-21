"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "João Silva",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    comment: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. ",
    media: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mediaType: "video",
  },
  {
    id: 2,
    name: "Maria Souza",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    comment: "Atendimento rápido e eficiente. Recomendo!",
    media: "https://placehold.co/200x200",
    mediaType: "image",
  },
  {
    id: 3,
    name: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
    comment: "Graças à lions, pude realizar meu sonho de uma casa nova, sem burocracias e com as menores taxas no mercado.",
    media: "https://placehold.co/200x200",
    mediaType: "image",
  },
  {
    id: 4,
    name: "André Alves",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    comment: "Com a lions, consegui comprar meu carro novo sem dor de cabeça. Recomendo!",
    media: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mediaType: "video",
  },
];

const Testimonial: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(testimonials.length);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setTotalSlides(isMobile ? testimonials.length : Math.ceil(testimonials.length / 3));
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [isMobile]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // For mobile, we show one testimonial at a time with swipe/buttons
  // For desktop, we show all testimonials in a grid
  
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-[#1E2028] to-[#262A34]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="hero-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            O que nossos clientes dizem
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            As experiências de quem confiou na Lions Bank para suas soluções financeiras
          </p>
        </motion.div>

        {/* Desktop View - Grid Layout */}
        <div className="hidden md:block">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-lg shadow-md flex flex-col justify-between items-center h-full border border-gray-700/30 hover:border-[#AF8E41]/30 transition-all duration-300"
              >
                {/* Avatar e Nome */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mb-4 border-2 border-[#AF8E41] object-cover"
                  />
                  <h3 className="text-xl font-cormorant font-bold text-[#C6A052] mb-1">
                    {testimonial.name}
                  </h3>
                  <div className="flex my-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={`text-yellow-500 text-xl ${
                          index < testimonial.rating ? "opacity-100" : "opacity-30"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-300 text-center mt-2 text-sm sm:text-base">
                    {testimonial.comment}
                  </p>
                </div>

                {/* Linha Divisória */}
                <div className="w-full border-t border-gray-700/30 my-4"></div>

                {/* Área de Mídia */}
                <div className="w-full">
                  {testimonial.mediaType === "video" ? (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        className="w-full h-full"
                        src={testimonial.media}
                        title="Vídeo do depoimento"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <img
                      className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                      src={testimonial.media}
                      alt="Imagem do depoimento"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="flex items-center justify-between absolute top-1/2 left-0 right-0 z-10 transform -translate-y-1/2 px-2">
                <button 
                  onClick={prevSlide}
                  className="bg-[#2A2D31]/80 text-[#AF8E41] p-2 rounded-full backdrop-blur-sm"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="bg-[#2A2D31]/80 text-[#AF8E41] p-2 rounded-full backdrop-blur-sm"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div 
                className="transition-all duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="flex">
                  {testimonials.map((testimonial) => (
                    <div 
                      key={testimonial.id}
                      className="w-full flex-shrink-0"
                    >
                      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg shadow-md flex flex-col justify-between items-center min-h-[400px] border border-gray-700/30 mx-4">
                        <div className="flex flex-col items-center text-center">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full mb-3 border-2 border-[#AF8E41]"
                          />
                          <h3 className="text-xl font-cormorant font-bold text-[#C6A052]">
                            {testimonial.name}
                          </h3>
                          <div className="flex my-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <span
                                key={index}
                                className={`text-yellow-500 text-xl ${
                                  index < testimonial.rating ? "opacity-100" : "opacity-30"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-300 text-center mt-2 text-sm">
                            {testimonial.comment}
                          </p>
                        </div>

                        <div className="w-full border-t border-gray-700/30 my-4"></div>

                        <div className="w-full">
                          {testimonial.mediaType === "video" ? (
                            <div className="aspect-video rounded-lg overflow-hidden">
                              <iframe
                                className="w-full h-full"
                                src={testimonial.media}
                                title="Vídeo do depoimento"
                                allowFullScreen
                              ></iframe>
                            </div>
                          ) : (
                            <img
                              className="w-full h-auto rounded-lg object-cover"
                              src={testimonial.media}
                              alt="Imagem do depoimento"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: testimonials.length }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full ${
                      currentSlide === index ? "bg-[#AF8E41]" : "bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
