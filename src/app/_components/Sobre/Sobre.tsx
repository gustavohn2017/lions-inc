import React from 'react';
import Image from 'next/image';
import SobreImage from '../../../../public/assets/todo preto2.png';

const Sobre = () => {
  return (
    <section className='p-6 md:p-12 bg-[#c2c2c2] bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg flex flex-col md:flex-row'>
      <div className='flex-1 flex flex-col justify-center'>
        <h1 className='text-2xl md:text-4xl font-bold mb-4 p-3'>
          Sobre a Lions
        </h1>
        <div className='text-base md:text-lg text-gray-700 text-justify p-3 pb-6 md:pb-12'>
          Somos um grupo especializado em Serviços Financeiros de alta performance com o objetivo de oferecer as melhores soluções para nossos clientes.
          Sendo referência em créditos imobiliários, temos proporcionado a conquista de sonhos e projetos daqueles que depositam sua confiança em nosso trabalho.
          Nossos Valores estão atrelados a condutas profissionais como ética, transparência, comprometimento, segurança, relacionamentos benéficos, responsabilidade e parceria.
        </div>
      </div>
      <div className='flex-1 flex justify-center md:hidden mt-6 w-[50%]'>
        <Image
          src={SobreImage}
          alt='LogoLions'
          width={400}
          height={400}
          className='h-auto max-w-xs sm:max-w-sm md:max-w-md w-[50%] '
        />
      </div>
      <div className='flex-1 hidden md:flex justify-center mt-6 md:mt-0 md:pl-12 w-[50%]'>
        <Image
          src={SobreImage}
          alt='LogoLions'
          width={400}
          height={400}
          className='h-auto max-w-xs sm:max-w-sm md:max-w-md w-[50%]'
        />
      </div>
    </section>
  );
};

export default Sobre;
