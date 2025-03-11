"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import LC from '../../../../public/assets/LC.png';

export function Hero() {
  return (
    <section className="relative bg-[#000000] text-white pb-20 md:pb-0 mb-6 overflow-hidden h-[20%]">
      <div className="container mx-auto pt-4 pb-4 relative z-10 flex flex-col md:flex-row items-center h-full px-4">
        {/* Conteúdo do lado esquerdo */}
        <article className="w-full md:w-1/2 relative p-[9px]">
          <div className='mt-20 md:mt-0 relative z-20'>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Lions Incorporadora e Serviços
            </h1>
            <p className="text-lg lg:text-2xl mb-6">
              Todo o nosso trabalho é realizado com garantia e qualidade superior! Oferecemos orçamentos sem compromisso.
            </p>
          </div>
          <div className="mt-12 relative z-20">
            <a className="w-fit mt-6 bg-gray-600 text-white p-4 rounded-md" href="#">
              Conheça os nossos Serviços!
            </a>
          </div>
          <div className="mt-12 mb-6 relative z-20">
            <a className="w-fit bg-gray-600 text-white p-4 rounded-md flex items-center" href="#">
              <FontAwesomeIcon icon={faWhatsapp} className="mr-2 h-5 max-w-8" />
              Contato via WhatsApp
            </a>
          </div>
        </article>

        {/* Imagem do lado direito (reduzida) */}
        <article className="w-[50%] relative p-[9px] flex justify-end">
          <div className="hidden md:block container relative w-[50%] h-auto">
            <Image
              src={LC}
              alt="Imagem de exemplo"
              className="object-contain w-full h-full opacity-30 md:opacity-100"
              width={250} // Reduzindo a largura da imagem              
              sizes='(max-width: 768px) 0vw, 50vw (max-width: 1023px) 50vw, 25vw'
            />
          </div>
        </article>
      </div>
    </section>
  );
}