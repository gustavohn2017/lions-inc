import React from 'react';

const Sobre = () => {
  return (
    <section className='mb-8 p-6 md:p-12 mx-4 md:mx-20 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg flex flex-col md:flex-row'>
      <div className='flex-1'>
        <h1 className='text-2xl font-bold mb-4 p-3'>
          Sobre nós
        </h1>
        <div className='text-lg text-gray-700 text-justify p-3 max-w-120'>
          Somos um grupo especializado em Serviços Financeiros de alta performance com o objetivo de oferecer as melhores soluções para nossos clientes.
          Sendo referência em créditos imobiliários, temos proporcionado a conquista de sonhos e projetos daqueles que depositam sua confiança em nosso trabalho.
          Nossos Valores estão atrelados a condutas profissionais como ética, transparência, comprometimento, segurança, relacionamentos benéficos, responsabilidade e parceria.
        </div>
      </div>
      <img
        src='https://placehold.co/300x300'
        alt='Placeholder'
        className='mt-4 md:mb-0 md:pb-0 md:mt-0 md:ml-4 rounded-lg shadow-lg w-full md:w-auto rover:scale-110 duration-300 '
      />
    </section>
  );
};

export default Sobre;