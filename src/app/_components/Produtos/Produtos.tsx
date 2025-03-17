"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaCheckSquare } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <section className="w-full py-16 bg-[#1E2124] flex flex-col items-center">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-[#AF8E41] mb-12 text-center">{/* Golden title */}
                    Produtos e Serviços
                </h2>

                <div className="w-full mt-8">
                    {/* Dropdown para telas menores */}
                    <div className="md:hidden flex justify-center">
                        <Select value={selectedTab} onValueChange={setSelectedTab}>
                            <SelectTrigger className="w-full bg-[#242729] border-[#2C3033] text-[#AF8E41] rounded-lg border shadow-lg">
                                <SelectValue placeholder="Selecione um produto/serviço" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#242729] border-[#2C3033] text-[#AF8E41] rounded-lg">
                                {Object.entries(produtos).map(([tab, conteudo]) => (
                                    <SelectItem key={tab} value={tab} className="focus:bg-[#2C3033] hover:bg-[#2C3033] text-[#AF8E41]">
                                        {conteudo.titulo}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="hidden md:block justify-center w-full">
                        <Tabs defaultValue="Tab1" className="w-full transition-all duration-500 ease-in-out">
                            <TabsList className="relative flex w-full p-1 rounded-xl bg-[#242729] shadow-xl overflow-hidden">
                                {Object.keys(produtos).map((tab) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        className="relative w-full h-14 rounded-md text-lg font-medium whitespace-nowrap transition-all focus-visible:relative focus-visible:z-10 
                                        data-[state=active]:bg-[#2C3033] data-[state=active]:text-[#AF8E41] text-[#A0A0A0] hover:text-[#AF8E41] text-center flex items-center justify-center group"
                                    >
                                        <span className="relative z-10">{produtos[tab].titulo}</span>
                                        <span className="absolute bottom-0 left-0 w-full h-1 bg-[#AF8E41] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                        <span className="absolute bottom-0 left-0 w-full h-1 bg-[#AF8E41] data-[state=active]:block hidden"></span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {Object.entries(produtos).map(([tab, conteudo]) => (
                                <TabsContent key={tab} value={tab} className="mt-6">
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={tabVariants}
                                        className="p-6 md:p-8 bg-[#242729] rounded-xl shadow-2xl flex flex-col md:flex-row"
                                    >
                                        <div className="md:w-2/3">
                                            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-[#AF8E41] border-l-4 border-[#AF8E41] pl-4">
                                                {conteudo.titulo}
                                            </h3>
                                            <p className="text-[#A0A0A0] mb-6 text-lg leading-relaxed">
                                                {conteudo.descricao}
                                            </p>
                                            <ul className="space-y-3">
                                                {conteudo.recursos.map((recurso, index) => (
                                                    <li key={index} className="flex items-center text-[#A0A0A0] text-lg">
                                                        <FaCheckSquare className="mr-3 text-[#AF8E41]" /> {recurso}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="md:w-1/3 mt-6 md:mt-0 md:ml-6 flex justify-center items-center">
                                            <img
                                                src="https://placehold.co/300x300"
                                                alt={conteudo.titulo}
                                                className="rounded-lg shadow-lg border-2 border-[#AF8E41] max-w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                    </motion.div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>

                    {/* Mobile version */}
                    <div className="md:hidden w-full">
                        {Object.entries(produtos).map(([tab, conteudo]) => (
                            selectedTab === tab && (
                                <motion.div
                                    key={tab}
                                    initial="hidden"
                                    animate="visible"
                                    variants={tabVariants}
                                    className="mt-6 p-6 bg-[#242729] rounded-xl shadow-2xl"
                                >
                                    <h3 className="text-2xl font-semibold mb-6 text-[#AF8E41] border-l-4 border-[#AF8E41] pl-4">
                                        {conteudo.titulo}
                                    </h3>
                                    <p className="text-[#A0A0A0] mb-6 text-base leading-relaxed">
                                        {conteudo.descricao}
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        {conteudo.recursos.map((recurso, index) => (
                                            <li key={index} className="flex items-center text-[#A0A0A0]">
                                                <FaCheckSquare className="mr-3 text-[#AF8E41]" /> {recurso}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex justify-center mt-4">
                                        <img
                                            src="https://placehold.co/300x300"
                                            alt={conteudo.titulo}
                                            className="rounded-lg shadow-lg border-2 border-[#AF8E41] max-w-full h-auto object-cover"
                                        />
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </div>
                            </div>
                        </div>
                    </section>
                );
            };
            
            export default Produtos;