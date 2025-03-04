"use client"; // Adicione esta linha no topo do arquivo
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <section className="relative bg-[#000000] text-white pb-4 md:h-96 mb-6 overflow-hidden">
            <div className="mt-12 md:mt-0 container mx-auto relative z-10 flex flex-col md:flex-row items-center h-full px-4">
                <article>
                    <div className='pt-12'>
                        <h1 className="text-4xl font-bold mb-4 lg:text-6xl leading-10">
                            Lions Incorporadora e Serviços
                        </h1>
                        <p className="text-lg lg:text-2xl mb-6">
                            Todo o nosso trabalho é realizado com garantia e qualidade superior! Oferecemos orçamentos sem compromisso.
                        </p>
                        <button onClick={openModal} className="text-lg text-[#f5d366] text-justify p-3 max-w-200 BOLD">
                            NOTA DO DESENVOLVEDOR (sim, eu sou um botão. clique em mim.)
                        </button>
                    </div>

                    <div className="mt-12">
                        <a className="w-fit mt-6 bg-gray-600 text-white p-4 rounded-md" href="#">
                            Conheça os nossos Serviços!
                        </a>
                    </div>

                    <div className="mt-12 mb-6">
                        <a className="w-fit bg-gray-600 text-white p-4 rounded-md flex items-center" href="#">
                            <FontAwesomeIcon icon={faWhatsapp} className="mr-2 h-5 max-w-8" />
                            Contato via WhatsApp
                        </a>
                    </div>
                </article>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-6 rounded-lg max-w-lg w-full overflow-y-auto max-h-[80vh]"> {/* Ajuste max-h */}
                        <h1 className="text-lg text-[#0e0e0e] text-justify p-3 max-w-120 BOLD">NOTA DO DESENVOLVEDOR:</h1>
                        <p className="text-lg text-[#030303] text-justify p-3 max-w-120 BOLD">
                            <br />
                            Sistema ainda em produção, em ambiente de testes. <br />
                            Ainda serão implementadas algumas funcionalidades, como Carousel, Contatos, e outros. <br />
                            A ideia é que o sistema seja responsivo, e que possa ser utilizado em qualquer dispositivo. Portanto este foi meu foco inicial. <br />
                            Estou trabalhando nos detalhes, já com algumas funcionalidades na pipeline para a implementação, porém fazem-se necessários ajustes. <br />
                            Estarei colocando os assets (logos, imagens, etc) logo depois que o layout estiver completamente responsivo. <br />
                            Utilizei tecnologias mais atuais, como next-js e tailwindcss, para que o sistema seja mais rápido e eficiente, além de permitir a implementação de um CRM na própria plataforma posteriormente. <br />
                        </p>
                        <button onClick={closeModal} className="mt-4 bg-gray-600 text-white p-2 rounded-md">
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}