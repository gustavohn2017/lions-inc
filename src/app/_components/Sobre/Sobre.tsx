"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SobreImage from '../../../../public/assets/todo preto2.png';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const Sobre = () => {
  const [index, setIndex] = useState(0);
  const items = [
    {
      title: 'Quem somos',
      content: (
        <div className='text-base md:text-lg text-gray-700 text-justify p-2 pb-4 md:pb-8'>
          Somos um grupo especializado em Serviços Financeiros de alta performance com o objetivo de oferecer as melhores soluções para nossos clientes.
          Sendo referência em créditos imobiliários, temos proporcionado a conquista de sonhos e projetos daqueles que depositam sua confiança em nosso trabalho.
          Nossos Valores estão atrelados a condutas profissionais como ética, transparência, comprometimento, segurança, relacionamentos benéficos, responsabilidade e parceria.
        </div>
      ),
    },
    {
      title: 'Missão',
      content: (
        <div className='text-base md:text-lg text-gray-700 text-justify p-2 pb-4 md:pb-8'>
          Nossa missão é impulsionar o sucesso financeiro de nossos clientes, oferecendo soluções inovadoras e personalizadas com excelência e integridade.
        </div>
      ),
    },
    {
      title: 'Visão',
      content: (
        <div className='text-base md:text-lg text-gray-700 text-justify p-2 pb-4 md:pb-8'>
          Ser a principal referência no mercado de serviços financeiros, reconhecida pela qualidade, confiança e impacto positivo na vida de nossos clientes e parceiros.
        </div>
      ),
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 90000); // 90 segundos em milissegundos

    return () => clearInterval(intervalId);
  }, [items.length]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-8 bg-gray-100 rounded-lg shadow-md">
      {/* Carousel Section */}
      <section className="bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-md rounded-lg shadow-inner flex-1">
        <h2 className='text-xl md:text-2xl font-semibold mb-2 p-2 text-gray-800 text-center'>
          Sobre a Lions
        </h2>
        <Carousel
          className="w-full max-w-xl mx-auto"
        >
          <CarouselContent>
            {items.map((item, i) => (
              <CarouselItem key={i} className={cn("w-full")}>
                <div className="p-2 flex flex-col items-center justify-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">{item.title}</h3>
                  {item.content}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-gray-300 text-gray-700 hover:bg-gray-400" />
          <CarouselNext className="bg-gray-300 text-gray-700 hover:bg-gray-400" />
        </Carousel>
      </section>

      {/* Image Section */}
      <section className="bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-md rounded-lg shadow-inner p-2 md:p-4 flex justify-center flex-1">
        <div className="w-full max-w-md">
          <Image
            src={SobreImage}
            alt="LogoLions"
            width={200}
            height={200}
            className="h-auto w-full object-contain rounded-md"
          />
        </div>
      </section>
    </div>
  );
};

export default Sobre;