import { useState, useEffect } from 'react';
import styles from './TabMenu.module.css';

export default function TabMenu() {
  // Estados para controlar a aba ativa e animações
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  // Estado para controlar o modo de exibição em telas pequenas
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Ativar animações após o componente ser montado
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    // Função para detectar o tamanho da tela e ajustar o layout
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar o tamanho inicial da tela
    handleResize();
    
    // Adicionar event listener para redimensionamento
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Dados das abas
  const tabs = [
    {
      title: 'Quem Somos',
      content: 'Somos uma empresa focada em inovação e qualidade. Nossa missão é proporcionar as melhores soluções para nossos clientes, com compromisso e excelência em cada projeto que realizamos.'
    },
    {
      title: 'O que Fazemos',
      content: 'Desenvolvemos tecnologias de ponta para resolver problemas complexos. Nossos produtos são reconhecidos pela excelência e desempenho, atendendo às necessidades específicas de cada cliente.'
    },
    {
      title: 'Como Trabalhamos',
      content: 'Aplicamos metodologias ágeis e focamos no trabalho em equipe. A colaboração e a comunicação são valores fundamentais para nós, sempre buscando a melhoria contínua e resultados excepcionais.'
    }
  ];

  // Função para mudar a aba ativa
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <section className={`${styles.tabMenuContainer} bg-gradient-to-b from-[#1E2028] to-[#262A34] py-12 sm:py-16 px-4 sm:px-6 lg:px-8`}>
      {/* Container principal com largura máxima e centralização */}
      <div className={`${styles.tabMenuWrapper} max-w-4xl mx-auto`}>
        {/* Título da seção com espaçamento responsivo */}
        <h1 className={`${styles.title} text-[#AF8E41] text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 font-['Cormorant_Garamond'] tracking-wider`}>
          SOBRE NÓS
        </h1>
        
        {/* Wrapper das abas com espaçamento responsivo */}
        <div className={`${styles.tabsWrapper} bg-[#2A2D31] rounded-lg p-4 sm:p-6 md:p-8 shadow-lg border border-[#AF8E41]/20`}>
          {/* Cabeçalho das abas - layout diferente para mobile e desktop */}
          <div className={`${styles.tabsHeader} ${isMobile ? 'flex flex-col space-y-2' : 'flex flex-wrap justify-center gap-2 sm:gap-3 mb-6'}`}>
            {tabs.map((tab, index) => (
              <button 
                key={index}
                className={`
                  ${styles.tabButton} 
                  ${activeTab === index ? styles.active : ''} 
                  px-4 py-2 sm:py-3 rounded-md text-base sm:text-lg font-medium transition-all duration-200
                  ${activeTab === index 
                    ? 'bg-[#AF8E41] text-white shadow-md' 
                    : 'bg-[#343941] text-gray-300 hover:bg-[#3A4149] hover:text-white'}
                  ${isMobile ? 'w-full' : 'flex-initial'}
                `}
                onClick={() => handleTabChange(index)}
              >
                <span className="line-clamp-1">{tab.title}</span>
              </button>
            ))}
          </div>
          
          {/* Conteúdo da aba ativa com controle de texto responsivo */}
          <div className={`
            ${styles.tabContent} 
            mt-4 sm:mt-6 text-gray-300 
            text-sm sm:text-base md:text-lg 
            leading-relaxed break-words
            p-3 sm:p-4 bg-[#343941]/50 rounded-lg
          `}>
            {/* Controle de quebra de texto para evitar overflow */}
            <div className="text-wrap overflow-wrap-normal">
              {tabs[activeTab].content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
