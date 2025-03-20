"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { ArrowRight, Search } from "lucide-react";

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
    image: "https://placehold.co/200x150",
    category: "credit"
  },
  {
    id: 2,
    title: "Crédito pelo fundo imobiliário",
    description: "Acesse recursos financeiros por meio de fundos imobiliários com condições exclusivas para investidores.",
    image: "https://placehold.co/200x150",
    category: "credit"
  },
  {
    id: 3,
    title: "Avaliação de imóveis",
    description: "Determine o valor justo do seu imóvel com nossa avaliação profissional e certificada.",
    image: "https://placehold.co/200x150",
    category: "evaluation"
  },
  {
    id: 4,
    title: "Assessoria imobiliária",
    description: "Suporte completo para transações imobiliárias, desde a negociação até a finalização do contrato.",
    image: "https://placehold.co/200x150",
    category: "advisory"
  },
  {
    id: 5,
    title: "GERIC da C.E.F",
    description: "Gerenciamento de risco de crédito junto à Caixa Econômica Federal para aprovação facilitada de financiamentos.",
    image: "https://placehold.co/200x150",
    category: "credit"
  },
  {
    id: 6,
    title: "Financiamento de Obras",
    description: "Recursos financeiros para construtoras e incorporadoras viabilizarem seus empreendimentos.",
    image: "https://placehold.co/200x150",
    category: "financing"
  },
  {
    id: 7,
    title: "Antecipação de recebíveis futuros",
    description: "Converta receitas futuras em capital imediato para sua empresa com condições competitivas.",
    image: "https://placehold.co/200x150",
    category: "credit"
  },
  {
    id: 8,
    title: "Administração de carteiras de clientes",
    description: "Potencialize resultados com gestão otimizada de relacionamentos e investimentos.",
    image: "https://placehold.co/200x150",
    category: "advisory"
  },
  {
    id: 9,
    title: "Expansão de patrimônio",
    description: "Estratégias personalizadas para crescimento patrimonial com segurança e rentabilidade.",
    image: "https://placehold.co/200x150",
    category: "advisory"
  },
  {
    id: 10,
    title: "Assessoria financeira - PJ",
    description: "Consultoria especializada em planejamento financeiro empresarial e otimização de recursos.",
    image: "https://placehold.co/200x150",
    category: "advisory"
  },
  {
    id: 11,
    title: "Portabilidade de dívidas",
    description: "Transfira suas dívidas e reduza juros, melhorando seu fluxo de caixa com condições vantajosas.",
    image: "https://placehold.co/200x150",
    category: "credit"
  },
  {
    id: 12,
    title: "Empréstimos",
    description: "Soluções de crédito ágeis com taxas competitivas para atender suas necessidades financeiras.",
    image: "https://placehold.co/200x150",
    category: "credit"
  },
  {
    id: 13,
    title: "Créditos pelo BNDES",
    description: "Acesso facilitado às linhas do BNDES com suporte na elaboração e aprovação de projetos.",
    image: "https://placehold.co/200x150",
    category: "credit"
  },
  {
    id: 14,
    title: "Crédito pelo fundo de investimento",
    description: "Oportunidades exclusivas de crédito através de fundos de investimento nacionais e internacionais.",
    image: "https://placehold.co/200x150",
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
        <div className="p-5 flex flex-col h-full">
          <div className="flex flex-col mb-4">
            <div className="w-full mb-3">
              <div className="rounded-md overflow-hidden border border-[#AF8E41]/20 relative" style={{minHeight: "150px"}}>
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1A1D20]/50">
                    <div className="w-8 h-8 border-2 border-[#AF8E41] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={imageError ? "/fallback-image.jpg" : product.image}
                  alt={product.title}
                  className={`w-full h-auto aspect-[3/2] object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-lg md:text-xl text-[#AF8E41] font-['Cormorant_Garamond'] tracking-wide font-bold mb-2">
                {product.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                {product.description}
              </p>
            </div>
          </div>
          <Link 
            href="#contato" 
            className="inline-flex items-center text-[#AF8E41] hover:text-[#C6A052] font-semibold transition-colors text-sm mt-auto self-end"
          >
            Tenho interesse <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-[#1A1D20] to-[#242729] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h2 className="text-3xl md:text-5xl text-[#AF8E41] font-bold mb-3 font-['Cormorant_Garamond'] tracking-wider">
            NOSSAS SOLUÇÕES {/* Changed from PRODUTOS to SOLUÇÕES */}
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-3"></div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light">
            Encontre a solução financeira ideal para suas necessidades
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4" variants={itemVariants}>
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
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
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Buscar soluções..." /* Changed from produtos to soluções */
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 pl-9 pr-4 w-full md:w-64 bg-[#2A2D31] border border-[#AF8E41]/20 rounded-md text-gray-200 
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
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <motion.div className="mt-8 flex justify-center items-center space-x-2" variants={itemVariants}>
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1 
                      ? "border-gray-600 text-gray-600 cursor-not-allowed" 
                      : "border-[#AF8E41]/30 text-[#AF8E41] hover:bg-[#AF8E41]/10"
                  }`}
                >
                  Anterior
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-8 h-8 rounded-full ${
                        currentPage === number
                          ? "bg-[#AF8E41] text-black font-medium"
                          : "bg-[#2A2D31] text-gray-300 hover:bg-[#AF8E41]/20"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={nextPage} 
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border ${
                    currentPage === totalPages 
                      ? "border-gray-600 text-gray-600 cursor-not-allowed" 
                      : "border-[#AF8E41]/30 text-[#AF8E41] hover:bg-[#AF8E41]/10"
                  }`}
                >
                  Próximo
                </button>
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