"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Tipo para testimonials
interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  mediaType: "image" | "video" | "none";
  media?: string;
}

// Dados de exemplo - em produção, estes viriam de uma API ou CMS
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ana Silva",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    comment: "O atendimento do Lions Bank superou todas as minhas expectativas. Consegui diversificar meus investimentos e aumentar meu patrimônio em apenas 6 meses.",
    mediaType: "image",
    media: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: 2,
    name: "Carlos Mendes",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    comment: "Profissionais extremamente capacitados. Me ajudaram a entender melhor o mercado financeiro e a fazer escolhas mais seguras para meu futuro.",
    mediaType: "video",
    media: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 3,
    name: "Juliana Costa",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    comment: "Excelente experiência! O Lions Bank me proporcionou opções de investimento que se alinharam perfeitamente aos meus objetivos de longo prazo.",
    mediaType: "none"
  },
  // Pode adicionar mais depoimentos conforme necessário
];

export default function Testimonial() {
  // Estados para controlar slides e animação
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [width, setWidth] = useState(0);
  const [isTablet, setIsTablet] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Atualiza a largura do carrossel ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.offsetWidth);
      }
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    handleResize(); // Inicializa
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, []);

  // Funções para controle manual do carrossel
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    resetAutoplay();
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    resetAutoplay();
  };

  // Configura rolagem automática
  const startAutoplay = () => {
    autoplayTimeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 6000); // Muda a cada 6 segundos
  };

  const resetAutoplay = () => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    startAutoplay();
  };

  // Inicia o autoplay
  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [currentSlide]);

  // Variantes de animação para o carrossel
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? width : -width,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? width : -width,
      opacity: 0
    })
  };

  return (
    <section id="depoimentos" className="py-16 md:py-20 bg-gradient-to-b from-[#1E2028] to-[#262A34]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da seção */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
            O Que Nossos Clientes Dizem
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#AF8E41] to-[#C6A052] mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Conheça as experiências de quem já investiu com a Lions Bank e transformou sua vida financeira.
          </p>
        </div>

        {/* Desktop View - Grid Layout */}
        <div className="hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 backdrop-blur-sm p-5 rounded-lg shadow-md flex flex-col justify-between border border-gray-700/30 hover:border-[#AF8E41]/30 transition-all duration-300 h-full"
              >
                {/* Área do Avatar e Nome */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mb-3 border-2 border-[#AF8E41] object-cover"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-cormorant font-bold text-[#C6A052] mb-1">
                    {testimonial.name}
                  </h3>
                  <div className="flex my-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={18}
                        className={`text-yellow-500 ${
                          index < testimonial.rating ? "fill-yellow-500" : "fill-transparent opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-center mt-1 text-sm line-clamp-4 md:line-clamp-none">
                    {testimonial.comment}
                  </p>
                </div>

                {/* Divisor */}
                <div className="w-full border-t border-gray-700/30 my-4"></div>

                {/* Área de Mídia */}
                <div className="w-full">
                  {testimonial.mediaType === "video" ? (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        className="w-full h-full"
                        src={testimonial.media}
                        title={`Vídeo de ${testimonial.name}`}
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  ) : testimonial.mediaType === "image" ? (
                    <img
                      className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                      src={testimonial.media}
                      alt={`Imagem de ${testimonial.name}`}
                      loading="lazy"
                    />
                  ) : null}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tablet View - Two-column layout */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="col-span-2 bg-white/5 backdrop-blur-sm p-5 rounded-lg shadow-md flex flex-col sm:flex-row items-center border border-gray-700/30 hover:border-[#AF8E41]/30 transition-all duration-300"
            >
              <div className="sm:w-1/4 flex flex-col items-center text-center mb-4 sm:mb-0">
                <img
                  src={testimonials[currentSlide].avatar}
                  alt={testimonials[currentSlide].name}
                  className="w-16 h-16 rounded-full mb-2 border-2 border-[#AF8E41] object-cover"
                />
                <h3 className="text-xl font-cormorant font-bold text-[#C6A052]">
                  {testimonials[currentSlide].name}
                </h3>
                <div className="flex my-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={`text-yellow-500 ${
                        index < testimonials[currentSlide].rating ? "fill-yellow-500" : "fill-transparent opacity-30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="sm:w-3/4 sm:pl-5 sm:border-l border-gray-700/30">
                <p className="text-gray-300 text-center sm:text-left mb-4">
                  {testimonials[currentSlide].comment}
                </p>
                
                {testimonials[currentSlide].mediaType !== "none" && (
                  <div className="w-full mt-4">
                    {testimonials[currentSlide].mediaType === "video" ? (
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          className="w-full h-full"
                          src={testimonials[currentSlide].media}
                          title={`Vídeo de ${testimonials[currentSlide].name}`}
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    ) : testimonials[currentSlide].mediaType === "image" ? (
                      <img
                        className="w-full h-auto rounded-lg object-cover aspect-[16/9]"
                        src={testimonials[currentSlide].media}
                        alt={`Imagem de ${testimonials[currentSlide].name}`}
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                )}
              </div>
            </motion.div>
            
            <div className="col-span-2 flex justify-between items-center mt-6">
              <button 
                onClick={prevSlide}
                className="flex items-center justify-center bg-[#2A2D31]/80 text-[#AF8E41] p-2 rounded-full backdrop-blur-sm hover:bg-[#AF8E41]/20 transition-colors duration-300"
              >
                <ChevronLeft size={20} />
                <span className="ml-1 text-sm">Anterior</span>
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentSlide ? 1 : -1);
                      setCurrentSlide(index);
                      resetAutoplay();
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "w-6 bg-[#AF8E41]" : "w-2 bg-gray-500/50"
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextSlide}
                className="flex items-center justify-center bg-[#2A2D31]/80 text-[#AF8E41] p-2 rounded-full backdrop-blur-sm hover:bg-[#AF8E41]/20 transition-colors duration-300"
              >
                <span className="mr-1 text-sm">Próximo</span>
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="col-span-1">
              {testimonials[(currentSlide + 1) % testimonials.length] && (
                <motion.div 
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1, scale: 1.02 }}
                  onClick={() => {
                    setDirection(1);
                    setCurrentSlide((currentSlide + 1) % testimonials.length);
                    resetAutoplay();
                  }}
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-700/30 hover:border-[#AF8E41]/30 transition-all duration-300 cursor-pointer h-full"
                >
                  <div className="flex items-center mb-3">
                    <img
                      src={testimonials[(currentSlide + 1) % testimonials.length].avatar}
                      alt={testimonials[(currentSlide + 1) % testimonials.length].name}
                      className="w-10 h-10 rounded-full border border-[#AF8E41] object-cover"
                    />
                    <div className="ml-2">
                      <h3 className="text-sm font-medium text-[#C6A052]">
                        {testimonials[(currentSlide + 1) % testimonials.length].name}
                      </h3>
                      <div className="flex">
                        {Array.from({ length: testimonials[(currentSlide + 1) % testimonials.length].rating }).map((_, i) => (
                          <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {testimonials[(currentSlide + 1) % testimonials.length].comment}
                  </p>
                </motion.div>
              )}
            </div>
            
            <div className="col-span-1">
              {testimonials[(currentSlide + 2) % testimonials.length] && (
                <motion.div 
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1, scale: 1.02 }}
                  onClick={() => {
                    setDirection(1);
                    setCurrentSlide((currentSlide + 2) % testimonials.length);
                    resetAutoplay();
                  }}
                  className="bg-white/5 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-700/30 hover:border-[#AF8E41]/30 transition-all duration-300 cursor-pointer h-full"
                >
                  <div className="flex items-center mb-3">
                    <img
                      src={testimonials[(currentSlide + 2) % testimonials.length].avatar}
                      alt={testimonials[(currentSlide + 2) % testimonials.length].name}
                      className="w-10 h-10 rounded-full border border-[#AF8E41] object-cover"
                    />
                    <div className="ml-2">
                      <h3 className="text-sm font-medium text-[#C6A052]">
                        {testimonials[(currentSlide + 2) % testimonials.length].name}
                      </h3>
                      <div className="flex">
                        {Array.from({ length: testimonials[(currentSlide + 2) % testimonials.length].rating }).map((_, i) => (
                          <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {testimonials[(currentSlide + 2) % testimonials.length].comment}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View - Carrossel */}
        <div className="md:hidden relative" ref={carouselRef}>
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <div className="px-2">
                  <div 
                    className="bg-white/5 backdrop-blur-sm p-5 rounded-lg shadow-md flex flex-col justify-between border border-gray-700/30 min-h-[420px]"
                  >
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={testimonials[currentSlide].avatar}
                        alt={testimonials[currentSlide].name}
                        className="w-16 h-16 rounded-full mb-3 border-2 border-[#AF8E41] object-cover"
                      />
                      <h3 className="text-xl font-cormorant font-bold text-[#C6A052]">
                        {testimonials[currentSlide].name}
                      </h3>
                      <div className="flex my-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={16}
                            className={`text-yellow-500 ${
                              index < testimonials[currentSlide].rating ? "fill-yellow-500" : "fill-transparent opacity-30"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-300 text-center mt-2 text-sm">
                        {testimonials[currentSlide].comment}
                      </p>
                    </div>

                    <div className="w-full border-t border-gray-700/30 my-4"></div>

                    <div className="w-full">
                      {testimonials[currentSlide].mediaType === "video" ? (
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <iframe
                            className="w-full h-full"
                            src={testimonials[currentSlide].media}
                            title={`Vídeo de ${testimonials[currentSlide].name}`}
                            allowFullScreen
                          />
                        </div>
                      ) : testimonials[currentSlide].mediaType === "image" ? (
                        <img
                          className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                          src={testimonials[currentSlide].media}
                          alt={`Imagem de ${testimonials[currentSlide].name}`}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Botões de navegação */}
          <div className="flex items-center justify-between absolute top-1/2 left-0 right-0 z-10 transform -translate-y-1/2 px-2">
            <button 
              onClick={prevSlide}
              className="bg-[#2A2D31]/80 text-[#AF8E41] p-2 rounded-full backdrop-blur-sm hover:bg-[#AF8E41]/20 transition-colors duration-300"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="bg-[#2A2D31]/80 text-[#AF8E41] p-2 rounded-full backdrop-blur-sm hover:bg-[#AF8E41]/20 transition-colors duration-300"
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Indicadores de slide */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                  resetAutoplay();
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-6 bg-[#AF8E41]" : "w-2 bg-gray-500/50"
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
