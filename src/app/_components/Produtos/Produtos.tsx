"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
import './produtos.css';

type Produto = {
    titulo: string;
    descricao: string;
    recursos: string[];
};

type ProdutosType = {
    [key: string]: Produto;
};

const Produtos = () => {
    const produtos: ProdutosType = {
        Tab1: {
            titulo: "Consórcios",
            descricao: "Consórcios são uma forma de adquirir bens ou serviços por meio de uma compra coletiva planejada.",
            recursos: ["Planejamento financeiro", "Sem juros", "Diversas opções de bens"],
        },
        Tab2: {
            titulo: "Financiamentos",
            descricao: "Financiamentos são empréstimos concedidos para a aquisição de bens ou serviços, com pagamento parcelado.",
            recursos: ["Taxas de juros competitivas", "Prazos flexíveis", "Facilidade de aprovação"],
        },
        Tab3: {
            titulo: "Capital de Giro para Empresas",
            descricao: "Capital de giro é o recurso necessário para manter as operações diárias de uma empresa.",
            recursos: ["Manutenção de estoque", "Pagamento de fornecedores", "Gestão de fluxo de caixa"],
        },
        Tab4: {
            titulo: "Consultoria Financeira Empresarial", 
            descricao: "Consultoria financeira empresarial oferece orientação especializada para a gestão financeira de empresas.",
            recursos: ["Análise financeira", "Planejamento estratégico", "Redução de custos"],
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

    return (
        <section className="bg-gradient-to-b from-[#1A1D20] to-[#242729] py-10 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="text-center mb-8" variants={itemVariants}>
                    <h2 className="text-4xl md:text-5xl text-[#AF8E41] font-bold mb-4 font-['Cormorant_Garamond'] tracking-wider">
                        PRODUTOS E SERVIÇOS
                    </h2>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-4"></div>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light">
                        Soluções financeiras personalizadas para impulsionar seu sucesso
                    </p>
                </motion.div>

                {/* Mobile Select */}
                <div className="md:hidden w-full max-w-sm mx-auto mb-6">
                    <Select value={selectedTab} onValueChange={setSelectedTab}>
                        <SelectTrigger 
                            className="w-full bg-[#2A2D31] border-[#AF8E41]/30 text-[#AF8E41] 
                                     text-lg rounded-lg py-3 shadow hover:border-[#AF8E41]/50
                                     transition-all duration-200 font-['Cormorant_Garamond']"
                        >
                            <SelectValue placeholder="Escolha uma solução" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2A2D31] border-[#AF8E41]/30">
                            {Object.entries(produtos).map(([tab, conteudo]) => (
                                <SelectItem 
                                    key={tab} 
                                    value={tab}
                                    className="text-gray-300 hover:text-[#AF8E41] focus:text-[#AF8E41]
                                             font-['Cormorant_Garamond'] text-lg"
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
                                        className="relative px-4 py-4 text-base font-['Cormorant_Garamond'] text-gray-400
                                                 bg-[#1E2124]/70 rounded-md overflow-hidden whitespace-normal text-center
                                                 transition-all duration-300 h-[4.5rem] w-full flex items-center justify-center
                                                 hover:text-[#AF8E41] hover:border-[#AF8E41]/30 hover:bg-[#1E2124]/90
                                                 data-[state=active]:text-[#AF8E41] data-[state=active]:bg-[#2A2D31]
                                                 data-[state=active]:font-semibold data-[state=active]:shadow-lg
                                                 data-[state=active]:shadow-[#AF8E41]/10 data-[state=active]:border-[#AF8E41]/40
                                                 border border-[#AF8E41]/20 shadow-sm
                                                 after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:transform 
                                                 after:-translate-x-1/2 after:w-0 data-[state=active]:after:w-2/3 after:h-0.5 
                                                 after:bg-[#AF8E41] after:transition-all after:duration-300 after:rounded-full"
                                    >
                                        <span className="line-clamp-2">{produtos[tab].titulo}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </motion.div>

                        <div className="w-full mx-auto">
                            {Object.entries(produtos).map(([tab, conteudo]) => (
                                <TabsContent key={tab} value={tab} className="w-full">
                                    <motion.div
                                        variants={itemVariants}
                                        className="flex flex-col md:flex-row gap-6 bg-[#2A2D31] p-6 md:p-8 rounded-lg
                                                 shadow-md border border-[#AF8E41]/20
                                                 transition-all duration-300"
                                    >
                                        <div className="flex-1 space-y-4">
                                            <h3 className="text-3xl text-[#AF8E41] font-['Cormorant_Garamond'] 
                                                       tracking-wide pb-2 border-b border-[#AF8E41]/20">
                                                {conteudo.titulo}
                                            </h3>
                                            <p className="text-gray-300 text-base leading-relaxed">
                                                {conteudo.descricao}
                                            </p>
                                            <ul className="space-y-3 pt-2">
                                                {conteudo.recursos.map((recurso, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 + 0.2 }}
                                                        className="flex items-center text-gray-400 text-sm group"
                                                    >
                                                        <span className="w-1.5 h-1.5 bg-[#AF8E41] rounded-full mr-3
                                                                     group-hover:scale-125 transition-all duration-200"></span>
                                                        <span className="group-hover:text-[#AF8E41] transition-colors duration-200">
                                                            {recurso}
                                                        </span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="md:w-1/3 max-w-[220px] mx-auto">
                                            <motion.div
                                                variants={itemVariants}
                                                className="rounded-lg overflow-hidden shadow-md
                                                         border border-[#AF8E41]/20"
                                            >
                                                <img
                                                    src="https://placehold.co/220x180"
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
                                            src="https://placehold.co/200x150"
                                            alt={conteudo.titulo}
                                            className="w-full h-auto object-cover"
                                        />
                                    </motion.div>
                                    <h3 className="text-2xl text-[#AF8E41] font-['Cormorant_Garamond'] tracking-wide">
                                        {conteudo.titulo}
                                    </h3>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {conteudo.descricao}
                                </p>
                                <ul className="space-y-2 pt-3 border-t border-[#AF8E41]/10">
                                    {conteudo.recursos.map((recurso, index) => (
                                        <motion.li
                                            key={index}
                                            variants={itemVariants}
                                            className="flex items-center text-gray-400 text-sm group"
                                        >
                                            <span className="w-1.5 h-1.5 bg-[#AF8E41] rounded-full mr-3"></span>
                                            <span>{recurso}</span>
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