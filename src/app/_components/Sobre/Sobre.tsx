import React from 'react';
import Image from 'next/image';
import SobreImage from '../../../../public/assets/todo preto2.png';

const Sobre = () => {
  return (
    <section className='mb-8 p-6 md:p-12 mx-4 md:mx-20 bg-[#c2c2c2] bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg flex flex-col md:flex-row'>
      <div className='flex-1 justify-items-center'>
        <h1 className='text-4xl font-bold mb-4 p-3'>
          Sobre a Lions
        </h1>
        <div className='text-lg text-gray-700 text-justify p-3 pb-12 '>
          Somos um grupo especializado em Serviços Financeiros de alta performance com o objetivo de oferecer as melhores soluções para nossos clientes.
          Sendo referência em créditos imobiliários, temos proporcionado a conquista de sonhos e projetos daqueles que depositam sua confiança em nosso trabalho.
          Nossos Valores estão atrelados a condutas profissionais como ética, transparência, comprometimento, segurança, relacionamentos benéficos, responsabilidade e parceria.
        </div>
      </div>
      <div className='flex-1 flex display:block md:hidden justify-center'>
        <Image
          src={SobreImage}
          alt='LogoLions'
          width={500} // Adjust the width as needed
          height={500} // Adjust the height as needed
          className='w-1/2 h-auto rounded-lg'
        />
      </div>

      <div className='flex-1 justify-end display-block hidden md:flex'>
        <Image
          src={SobreImage}
          alt='LogoLions'
          width={500} // Adjust the width as needed
          height={500} // Adjust the height as needed
          className='w-1/2 h-auto rounded-lg'
        />
      </div>
    </section>
  );
};

export default Sobre;