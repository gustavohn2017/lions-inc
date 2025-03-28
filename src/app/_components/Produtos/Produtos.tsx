"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import './produtos.css';

type Produto = {
    titulo: string;
    descricao: string;
    recursos: string[];
    imagem: string; // Add image property
};

type ProdutosType = {
    [key: string]: Produto;
};

const Produtos = () => {
    const produtos: ProdutosType = {
        Tab1: {
            titulo: "Consórcios",
            descricao: "Consórcios são uma forma inteligente e econômica de adquirir bens ou serviços por meio de uma compra coletiva planejada, sem a incidência de juros. Ideal para quem busca disciplina financeira e planejamento a médio e longo prazo.",
            recursos: ["Planejamento financeiro personalizado", "Compra sem incidência de juros", "Diversas opções de bens e créditos", "Parcelas acessíveis e ajustáveis"],
            imagem: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=440&auto=format&fit=crop",
        },
        Tab2: {
            titulo: "Financiamentos",
            descricao: "Nossos financiamentos são soluções de crédito estratégicas concebidas para a aquisição de bens ou serviços, com condições de pagamento flexíveis e taxas competitivas. Oferecemos análise personalizada para encontrar a melhor condição para seu perfil.",
            recursos: ["Taxas de juros altamente competitivas", "Prazos flexíveis de até 60 meses", "Aprovação rápida e desburocratizada", "Atendimento consultivo personalizado"],
            imagem: "https://images.unsplash.com/photo-1565514020179-026b5f8dbcf5?q=80&w=440&auto=format&fit=crop",
        },
        Tab3: {
            titulo: "Capital de Giro para Empresas",
            descricao: "O capital de giro é o recurso financeiro essencial para manter as operações diárias de sua empresa com fluidez. Nossa solução oferece acesso rápido aos recursos necessários para enfrentar sazonalidades e aproveitar oportunidades de crescimento.",
            recursos: ["Manutenção estratégica de estoque", "Fluxo de caixa otimizado", "Pagamento pontual a fornecedores", "Aproveitamento de oportunidades de mercado"],
            imagem: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=440&auto=format&fit=crop",
        },
        Tab4: {
            titulo: "Consultoria Financeira Empresarial", 
            descricao: "Nossa consultoria financeira empresarial proporciona orientação especializada e estratégica para a gestão financeira eficiente de seu negócio. Desenvolvemos análises aprofundadas e estratégias personalizadas para maximizar resultados e minimizar riscos.",
            recursos: ["Análise financeira detalhada e diagnóstica", "Planejamento estratégico orientado a resultados", "Otimização e redução efetiva de custos", "Estratégias de crescimento sustentável"],
            imagem: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=440&auto=format&fit=crop",
        },
    };

    const [selectedTab, setSelectedTab] = useState("Tab1");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, duration: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const handleButtonClick = (type: string) => {
        // You could add analytics tracking here
        
        // Scroll to contact section
        const contactSection = document.getElementById('contato');
        if (contactSection) {
            const headerOffset = 80;
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="bg-gradient-to-b from-[#1A1D20] to-[#242729] py-10 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="text-center mb-8" variants={itemVariants}>
                    <h2 className="text-4xl md:text-6xl text-[#AF8E41] font-bold mb-4 font-['Cormorant_Garamond'] tracking-wider">
                        PRODUTOS E SERVIÇOS
                    </h2>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Soluções financeiras personalizadas para impulsionar seu sucesso
                    </p>
                </motion.div>

                {/* Mobile Select */}
                <div className="md:hidden w-full max-w-sm mx-auto mb-6">
                    <Select value={selectedTab} onValueChange={setSelectedTab}>
                        <SelectTrigger 
                            className="w-full bg-[#2A2D31] border-[#AF8E41]/30 text-[#AF8E41] 
                                     text-xl rounded-lg py-3 shadow hover:border-[#AF8E41]/50
                                     transition-all duration-200 font-['Cormorant_Garamond'] font-semibold"
                        >
                            <SelectValue placeholder="Escolha uma solução" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2A2D31] border-[#AF8E41]/30">
                            {Object.entries(produtos).map(([tab, conteudo]) => (
                                <SelectItem 
                                    key={tab} 
                                    value={tab}
                                    className="text-gray-300 hover:text-[#AF8E41] focus:text-[#AF8E41]
                                             font-['Cormorant_Garamond'] text-xl font-semibold"
                                >
                                    {conteudo.titulo}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Desktop Version */}
                <div className="hidden md:block">
                    <Tabs defaultValue="Tab1" className="w-full">
                        <motion.div variants={itemVariants} className="flex justify-center mb-20">
                            <TabsList className="grid grid-cols-4 w-full max-w-5xl p-2 bg-transparent 
                                             rounded-xl border-0 shadow-none gap-3">
                                {Object.keys(produtos).map((tab) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        className="relative px-3 py-3 sm:px-4 sm:py-4 text-base sm:text-lg font-['Cormorant_Garamond'] text-gray-400
                                                 bg-[#1E2124]/70 rounded-md overflow-hidden whitespace-normal text-center
                                                 transition-all duration-300 h-[4.5rem] sm:h-[5rem] w-full flex items-center justify-center
                                                 hover:text-[#AF8E41] hover:border-[#AF8E41]/30 hover:bg-[#1E2124]/90
                                                 data-[state=active]:text-[#AF8E41] data-[state=active]:bg-[#2A2D31]
                                                 data-[state=active]:font-bold data-[state=active]:shadow-lg
                                                 data-[state=active]:shadow-[#AF8E41]/10 data-[state=active]:border-[#AF8E41]/40
                                                 border border-[#AF8E41]/20 shadow-sm font-semibold
                                                 after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:transform 
                                                 after:-translate-x-1/2 after:w-0 data-[state=active]:after:w-2/3 after:h-0.5 
                                                 after:bg-[#AF8E41] after:transition-all after:duration-300 after:rounded-full"
                                    >
                                        <span className="line-clamp-2 text-center">{produtos[tab].titulo}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </motion.div>

                        <div className="w-full mx-auto">
                            {Object.entries(produtos).map(([tab, conteudo]) => (
                                <TabsContent key={tab} value={tab} className="w-full">
                                    <motion.div
                                        variants={itemVariants}
                                        className="flex flex-col md:flex-row gap-4 sm:gap-6 bg-[#2A2D31] p-4 sm:p-6 md:p-8 rounded-lg
                                                 shadow-md border border-[#AF8E41]/20
                                                 transition-all duration-300"
                                    >
                                        <div className="flex-1 space-y-4">
                                            <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#AF8E41] font-['Cormorant_Garamond'] 
                                                       tracking-wide pb-2 border-b border-[#AF8E41]/20 font-bold">
                                                {conteudo.titulo}
                                            </h3>
                                            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                                                {conteudo.descricao}
                                            </p>
                                            <ul className="space-y-3 sm:space-y-4 pt-3">
                                                {conteudo.recursos.map((recurso, index) => (
                                                    <motion.li
                                                        key={index}
                                                        variants={itemVariants}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 + 0.2 }}
                                                        className="flex items-start text-gray-300 text-sm sm:text-base md:text-lg group"
                                                    >
                                                        <CheckCircle 
                                                            className="w-4 h-4 sm:w-5 sm:h-5 text-[#AF8E41] mt-0.5 mr-2 sm:mr-3 flex-shrink-0 group-hover:scale-110 transition-all duration-200" 
                                                            onClick={() => handleButtonClick(recurso)}
                                                        />
                                                        <span 
                                                            className="group-hover:text-[#AF8E41] transition-colors duration-200 cursor-pointer"
                                                            onClick={() => handleButtonClick(recurso)}
                                                        >
                                                            {recurso}
                                                        </span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="md:w-1/3 max-w-[180px] sm:max-w-[220px] mx-auto md:self-end mt-4 sm:mt-6 md:mt-0">
                                            <motion.div
                                                variants={itemVariants}
                                                className="rounded-lg overflow-hidden shadow-md
                                                         border border-[#AF8E41]/20"
                                            >
                                                <img
                                                    src={conteudo.imagem}
                                                    alt={conteudo.titulo}
                                                    className="w-full h-auto object-cover transition-all
                                                             duration-300 hover:scale-105"
                                                />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </TabsContent>
                            ))}
                        </div>
                    </Tabs>
                </div>

                {/* Mobile Content */}
                <div className="md:hidden w-full mx-auto">
                    {Object.entries(produtos).map(([tab, conteudo]) => (
                        selectedTab === tab && (
                            <motion.div
                                key={tab}
                                variants={itemVariants}
                                className="bg-[#2A2D31] p-5 rounded-lg space-y-4
                                         shadow-md border border-[#AF8E41]/20"
                            >
                                <div className="text-center mb-3">
                                    <motion.div
                                        variants={itemVariants}
                                        className="rounded-lg overflow-hidden mb-4 max-w-[200px] mx-auto
                                                 border border-[#AF8E41]/20"
                                    >
                                        <img
                                            src={conteudo.imagem}
                                            alt={conteudo.titulo}
                                            className="w-full h-auto object-cover"
                                        />
                                    </motion.div>
                                    <h3 className="text-2xl text-[#AF8E41] font-['Cormorant_Garamond'] tracking-wide font-bold">
                                        {conteudo.titulo}
                                    </h3>
                                </div>
                                <p className="text-gray-300 text-base leading-relaxed">
                                    {conteudo.descricao}
                                </p>
                                <ul className="space-y-3 pt-4 border-t border-[#AF8E41]/10">
                                    {conteudo.recursos.map((recurso, index) => (
                                        <motion.li
                                            key={index}
                                            variants={itemVariants}
                                            className="flex items-start text-gray-300 text-base group"
                                        >
                                            <CheckCircle 
                                                className="w-5 h-5 text-[#AF8E41] mt-0.5 mr-3 flex-shrink-0" 
                                                onClick={() => handleButtonClick(recurso)}
                                            />
                                            <span 
                                                className="group-hover:text-[#AF8E41] transition-colors duration-200 cursor-pointer"
                                                onClick={() => handleButtonClick(recurso)}
                                            >
                                                {recurso}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Produtos;