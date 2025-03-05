"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export function Hero() {
    return (
        <section className="relative bg-[#000000] text-white pb-20 md:h-90 mb-6 overflow-hidden">
            <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center h-full px-4">
                <article className="w-full md:w-1/2 relative">
                    <div className='mt-20 md:pt-0 relative z-20'>
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

                    <div className="absolute inset-0 flex items-center justify-center p-4"> {/* Adicionado div para centralizar */}
                        <img 
                            src='https://placehold.co/280x300' 
                            alt="Imagem de exemplo" 
                            className="w-full h-auto object-contain opacity-30" // Ajustes aqui
                        />
                    </div>
                </article>

                <article className="w-full md:w-1/2 relative md:block hidden">
                    <img 
                        src='https://placehold.co/280x300' 
                        alt="Imagem de exemplo" 
                        className="w-full h-auto" 
                    />
                </article>
            </div>
        </section>
    );
}