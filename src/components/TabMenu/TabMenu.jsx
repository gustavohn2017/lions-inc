import { useState, useEffect } from 'react';
import styles from './TabMenu.module.css';

export default function TabMenu() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Ativar animações após o componente ser montado
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <section className={styles.tabMenuContainer}>
      <div className={styles.tabMenuWrapper}>
        <h1 className={styles.title}>Sobre Nós</h1>
        
        <div className={styles.tabsWrapper}>
          <div className={styles.tabsHeader}>
            {tabs.map((tab, index) => (
              <button 
                key={index}
                className={`${styles.tabButton} ${activeTab === index ? styles.active : ''}`}
                onClick={() => handleTabChange(index)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          
          <div className={styles.tabContent}>
            {tabs[activeTab].content}
          </div>
        </div>
      </div>
    </section>
  );
}
