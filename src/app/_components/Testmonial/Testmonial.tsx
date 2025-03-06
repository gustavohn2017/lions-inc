'use client';

import Image from 'next/image';
import { useState } from 'react';

const Testimonial = () => {
  const [testimonials] = useState([
    {
      id: 1,
      name: 'Maria Silva',
      avatarUrl: '/avatar1.png', // Substitua pelo caminho da sua imagem ou URL
      rating: 5,
      comment:
        'Excelente serviço! A equipe foi muito atenciosa e o produto superou minhas expectativas. Recomendo a todos!',
      mediaType: 'image',
      mediaUrl: '/product1.png', // Substitua pelo caminho da sua imagem ou URL
    },
    {
      id: 2,
      name: 'João Pedro',
      avatarUrl: '/avatar2.png', // Substitua pelo caminho da sua imagem ou URL
      rating: 4,
      comment:
        'Gostei bastante! O processo de compra foi fácil e a entrega rápida. Apenas alguns detalhes poderiam ser melhorados.',
      mediaType: 'video',
      mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Substitua pelo link do seu vídeo
    },
    {
      id: 3,
      name: 'Ana Clara',
      avatarUrl: '/avatar3.png', // Substitua pelo caminho da sua imagem ou URL
      rating: 5,
      comment:
        'Incrível! Produto de alta qualidade e atendimento impecável. Com certeza voltarei a comprar.',
      mediaType: 'image',
      mediaUrl: '/product2.png', // Substitua pelo caminho da sua imagem ou URL
    },
    {
      id: 4,
      name: 'Ricardo Souza',
      avatarUrl: '/avatar4.png', // Substitua pelo caminho da sua imagem ou URL
      rating: 3,
      comment:
        'Bom serviço, mas um pouco demorado. O produto é bom, mas esperava mais pela demora na entrega.',
      mediaType: 'none', // Sem mídia
      mediaUrl: '',
    },
  ]);

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i}>&#9733;</span>); // Estrela preenchida
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Estrela vazia
      }
    }
    return <div className="text-yellow-500">{stars}</div>;
  };

  const renderMedia = (testimonial: { mediaType: string; mediaUrl: string; name: string }) => {
    if (testimonial.mediaType === 'image' && testimonial.mediaUrl) {
      return (
        <Image
          src={testimonial.mediaUrl}
          alt={`Imagem do produto de ${testimonial.name}`}
          width={500}
          height={300}
          className="rounded-md object-cover w-full h-48"
        />
      );
    } else if (testimonial.mediaType === 'video' && testimonial.mediaUrl) {
      return (
        <iframe
          src={testimonial.mediaUrl}
          title={`Vídeo depoimento de ${testimonial.name}`}
          className="w-full h-48 rounded-md"
          allowFullScreen
        ></iframe>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Depoimentos de Clientes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <Image
                      src={testimonial.avatarUrl}
                      alt={`Avatar de ${testimonial.name}`}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <div className="text-sm text-gray-500">
                      {renderRatingStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{testimonial.comment}</p>
              </div>
              {testimonial.mediaType !== 'none' && (
                <div className="p-6 border-t border-gray-200">
                  {renderMedia(testimonial)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;