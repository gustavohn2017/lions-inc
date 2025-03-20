import React from "react";

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
  return (
    <section className="py-12 bg-gradient-to-br from-[#1E2028] to-[#262A34]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="hero-title text-4xl font-bold text-center mb-8">
          O que nossos clientes dizem
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-md flex flex-col justify-between items-center w-full h-auto border border-gray-700/30"
            >
              {/* Avatar e Nome */}
              <div className="flex flex-col items-center text-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4 border-2 border-[#AF8E41]"
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
                <p className="text-gray-300 text-center mt-3">
                  {testimonial.comment}
                </p>
              </div>

              {/* Linha Divisória */}
              <div className="w-full border-t border-gray-300 my-4"></div>

              {/* Área de Mídia */}
              <div className="w-full flex justify-center">
                {testimonial.mediaType === "video" ? (
                  <iframe
                    className="w-full h-40 rounded-lg"
                    src={testimonial.media}
                    title="Vídeo do depoimento"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    className="w-full h-40 rounded-lg object-cover"
                    src={testimonial.media}
                    alt="Imagem do depoimento"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
