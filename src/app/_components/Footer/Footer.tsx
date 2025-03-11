import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#333] text-white py-6">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row px-6">
        {/* Texto do Rodapé */}
        <p className="text-sm text-gray-400">© 2022 - Lions - Incorporadora e Serviços. | Todos os direitos reservados.</p>
    
        {/* Ícones das redes sociais */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition"
            aria-label="YouTube"
          >
            <Youtube size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
