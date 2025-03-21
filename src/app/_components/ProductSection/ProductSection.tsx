"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";

// Categorias de soluções
const categories = [
  { id: "all", name: "Todos" },
  { id: "credit", name: "Crédito" },
  { id: "advisory", name: "Assessoria" },
  { id: "evaluation", name: "Avaliação" },
  { id: "financing", name: "Financiamento" },
];

// Dados das soluções com categorias
const products = [
  {
    id: 1,
    title: "Crédito com garantia imobiliária",
    description: "Utilize seu imóvel como garantia para obter crédito com taxas reduzidas e condições flexíveis de pagamento.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    category: "credit"
  },
  {
    id: 2,
    title: "Crédito pelo fundo imobiliário",
    description: "Acesse recursos financeiros por meio de fundos imobiliários com condições exclusivas para investidores.",
    image: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=800&auto=format&fit=crop&q=80",
    category: "credit"
  },
  {
    id: 3,
    title: "Avaliação de imóveis",
    description: "Determine o valor justo do seu imóvel com nossa avaliação profissional e certificada.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=80",
    category: "evaluation"
  },
  {
    id: 4,
    title: "Assessoria imobiliária",
    description: "Suporte completo para transações imobiliárias, desde a negociação até a finalização do contrato.",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&auto=format&fit=crop&q=80",
    category: "advisory"
  },
  {
    id: 5,
    title: "GERIC da C.E.F",
    description: "Gerenciamento de risco de crédito junto à Caixa Econômica Federal para aprovação facilitada de financiamentos.",
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&auto=format&fit=crop&q=80",
    category: "credit"
  },
  {
    id: 6,
    title: "Financiamento de Obras",
    description: "Recursos financeiros para construtoras e incorporadoras viabilizarem seus empreendimentos.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80",
    category: "financing"
  },
  {
    id: 7,
    title: "Antecipação de recebíveis futuros",
    description: "Converta receitas futuras em capital imediato para sua empresa com condições competitivas.",
    image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&auto=format&fit=crop&q=80",
    category: "credit"
  },
  {
    id: 8,
    title: "Administração de carteiras de clientes",
    description: "Potencialize resultados com gestão otimizada de relacionamentos e investimentos.",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&auto=format&fit=crop&q=80",
    category: "advisory"
  },
  {
    id: 9,
    title: "Expansão de patrimônio",
    description: "Estratégias personalizadas para crescimento patrimonial com segurança e rentabilidade.",
    image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&auto=format&fit=crop&q=80",
    category: "advisory"
  },
  {
    id: 10,
    title: "Assessoria financeira - PJ",
    description: "Consultoria especializada em planejamento financeiro empresarial e otimização de recursos.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    category: "advisory"
  },
  {
    id: 11,
    title: "Portabilidade de dívidas",
    description: "Transfira suas dívidas e reduza juros, melhorando seu fluxo de caixa com condições vantajosas.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=80",
    category: "credit"
  },
  {
    id: 12,
    title: "Empréstimos",
    description: "Soluções de crédito ágeis com taxas competitivas para atender suas necessidades financeiras.",
    image: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=800&auto=format&fit=crop&q=80",
    category: "credit"
  },
  {
    id: 13,
    title: "Créditos pelo BNDES",
    description: "Acesso facilitado às linhas do BNDES com suporte na elaboração e aprovação de projetos.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&auto=format&fit=crop&q=80",
    category: "credit"
  },
  {
    id: 14,
    title: "Crédito pelo fundo de investimento",
    description: "Oportunidades exclusivas de crédito através de fundos de investimento nacionais e internacionais.",
    image: "https://images.unsplash.com/photo-1621501103258-3e135c8c1753?w=800&auto=format&fit=crop&q=80",
    category: "credit"
  },
];

const ProductsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = isMobile ? 2 : 4; // Changed from 6 to 4 cards per page

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    // Reset to first page when category or search changes
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Filter products based on active category and search term
  const filteredProducts = products.filter(product => 
    (activeCategory === "all" || product.category === activeCategory) &&
    (product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Navigate between pages
  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Função para renderizar uma paginação limitada com elipses
  const renderPaginationButtons = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      // Se tivermos 5 ou menos páginas, mostramos todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Sempre mostrar a primeira página
      pageNumbers.push(1);
      
      // Lógica para páginas do meio
      if (currentPage <= 3) {
        // Se estiver nas primeiras páginas
        pageNumbers.push(2, 3);
        pageNumbers.push("ellipsis1");
      } else if (currentPage >= totalPages - 2) {
        // Se estiver nas últimas páginas
        pageNumbers.push("ellipsis1");
        pageNumbers.push(totalPages - 2, totalPages - 1);
      } else {
        // Se estiver no meio
        pageNumbers.push("ellipsis1");
        pageNumbers.push(currentPage);
        pageNumbers.push("ellipsis2");
      }
      
      // Sempre mostrar a última página
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers.map((number, index) => {
      if (number === "ellipsis1" || number === "ellipsis2") {
        return (
          <span key={`ellipsis-${index}`} className="w-6 h-8 flex items-center justify-center text-gray-400">
            ...
          </span>
        );
      }
      
      return (
        <button
          key={number}
          onClick={() => paginate(number as number)}
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
            currentPage === number
              ? "bg-[#AF8E41] text-black font-medium"
              : "bg-[#2A2D31] text-gray-300 hover:bg-[#AF8E41]/20"
          }`}
        >
          {number}
        </button>
      );
    });
  };

  // Product Card Component
  interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
  }

  const ProductCard = ({ product }: { product: Product }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    
    const handleImageError = () => {
      setImageError(true);
      setImageLoading(false);
    };
    
    const handleImageLoad = () => {
      setImageLoading(false);
    };
    
    return (
      <motion.div 
        variants={itemVariants}
        className="bg-[#2A2D31] rounded-lg overflow-hidden border border-[#AF8E41]/20 shadow-md 
                hover:shadow-lg hover:border-[#AF8E41]/40 transition-all duration-300 h-full flex flex-col"
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex flex-col mb-3">
            <div className="w-full mb-3">
              <div className="rounded-md overflow-hidden border border-[#AF8E41]/20 relative" style={{minHeight: "140px"}}>
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1A1D20]/50">
                    <div className="w-8 h-8 border-2 border-[#AF8E41] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={imageError ? "/fallback-image.jpg" : product.image}
                  alt={product.title}
                  className={`w-full h-full aspect-[3/2] object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-base md:text-lg text-[#AF8E41] font-['Cormorant_Garamond'] tracking-wide font-bold mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-300 text-xs md:text-sm line-clamp-3">
                {product.description}
              </p>
            </div>
          </div>
          <Link 
            href="#contato" 
            className="inline-flex items-center text-[#AF8E41] hover:text-[#C6A052] font-semibold transition-colors text-xs md:text-sm mt-auto self-end"
          >
            Tenho interesse <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-[#1A1D20] to-[#242729] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-6 sm:mb-8" variants={itemVariants}>
          <h2 className="text-2xl sm:text-3xl md:text-5xl text-[#AF8E41] font-bold mb-2 sm:mb-3 font-['Cormorant_Garamond'] tracking-wider">
            NOSSAS SOLUÇÕES {/* Changed from PRODUTOS to SOLUÇÕES */}
          </h2>
          <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-2 sm:mb-3"></div>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light">
            Encontre a solução financeira ideal para suas necessidades
          </p>
        </motion.div>

        {/* Search and Filter Controls - Improved responsive layout */}
        <motion.div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4" variants={itemVariants}>
          {/* Category Filters - Scrollable on mobile */}
          <div className="flex flex-nowrap overflow-x-auto md:flex-wrap justify-start md:justify-start gap-2 w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category.id
                    ? "bg-[#AF8E41] text-black font-medium"
                    : "bg-[#2A2D31] text-gray-300 hover:bg-[#AF8E41]/20"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Search Input */}
          <div className="relative w-full md:w-auto mt-3 md:mt-0">
            <input
              type="text"
              placeholder="Buscar soluções..." /* Changed from produtos to soluções */
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 pl-9 pr-3 w-full md:w-64 bg-[#2A2D31] border border-[#AF8E41]/20 rounded-md text-gray-200 
                       focus:outline-none focus:border-[#AF8E41]/50 text-sm"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" /* Changed to 4 columns and increased gap */
              variants={containerVariants}
            >
              {currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
            
            {/* Pagination Controls - Updated for mobile responsiveness */}
            {totalPages > 1 && (
              <motion.div className="mt-8 flex justify-center items-center" variants={itemVariants}>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    aria-label="Página anterior"
                    className={`w-8 h-8 flex items-center justify-center rounded border ${
                      currentPage === 1 
                        ? "border-gray-600 text-gray-600 cursor-not-allowed" 
                        : "border-[#AF8E41]/30 text-[#AF8E41] hover:bg-[#AF8E41]/10"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  <div className="flex space-x-1 mx-1">
                    {renderPaginationButtons()}
                  </div>
                  
                  <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    aria-label="Próxima página"
                    className={`w-8 h-8 flex items-center justify-center rounded border ${
                      currentPage === totalPages 
                        ? "border-gray-600 text-gray-600 cursor-not-allowed" 
                        : "border-[#AF8E41]/30 text-[#AF8E41] hover:bg-[#AF8E41]/10"
                    }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div className="text-center py-10" variants={itemVariants}>
            <p className="text-gray-400">Nenhuma solução encontrada com esses critérios.</p> {/* Changed from produto to solução */}
            <button 
              onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
              className="mt-2 text-[#AF8E41] hover:underline"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}
        
      </motion.div>
    </section>
  );
};

export default ProductsSection;