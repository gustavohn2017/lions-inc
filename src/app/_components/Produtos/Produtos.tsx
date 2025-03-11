"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaCheckSquare } from 'react-icons/fa';

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

    return (
        <section className="p-4 md:p-10 flex flex-col items-center w-screen bg-[#333]">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Produtos e Serviços</h1>
            </div>

            <div className="w-full mt-8">
                {/* Dropdown para telas menores */}
                <div className="md:hidden flex justify-center">
                    <Select value={selectedTab} onValueChange={setSelectedTab}>
                        <SelectTrigger className="w-full bg-white border rounded-md text-center">
                            <SelectValue placeholder="Selecione um produto/serviço" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border rounded-md">
                            {Object.keys(produtos).map((tab) => (
                                <SelectItem key={tab} value={tab} className="flex justify-center">
                                    {tab}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="hidden md:block justify-center w-full">
                    <Tabs defaultValue="Tab1" className="w-full transition-all duration-500 ease-in-out">
                        <TabsList className="relative flex w-full p-1 rounded-xl bg-zinc-800 shadow-md">
                            {Object.keys(produtos).map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    value={tab}
                                    className="relative w-full h-10 rounded-md text-sm font-medium whitespace-nowrap transition-all focus-visible:relative focus-visible:z-10 data-[state=active]:bg-zinc-700 data-[state=active]:text-white text-white hover:text-white"
                                >
                                    {produtos[tab].titulo}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {Object.entries(produtos).map(([tab, conteudo]) => (
                            <TabsContent key={tab} value={tab} className="mt-4 p-6">
                                <div className="p-2 md:p-4 bg-zinc-600 rounded-md flex flex-col md:flex-row">
                                    <div className="md:w-2/3">
                                        <h1 className="text-xl font-bold mb-2 text-center text-white">{conteudo.titulo}</h1>
                                        <p className="text-white mb-4 text-sm md:text-base">{conteudo.descricao}</p>
                                        <ul className="list-none text-sm md:text-base text-white">
                                            {conteudo.recursos.map((recurso, index) => (
                                                <li key={index} className="flex items-center">
                                                    <FaCheckSquare className="mr-2" /> {recurso}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="md:w-1/3 mt-4 md:mt-0 md:ml-4 flex justify-center">
                                        <img src="https://placehold.co/300x300" alt={conteudo.titulo} className="rounded-md max-w-full h-auto" />
                                    </div>
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>

                {/* Lista para dispositivos mobile. */}
                <div className="md:hidden flex justify-center">
                    <div className="w-full">
                        {Object.entries(produtos).map(([tab, conteudo]) => (
                            selectedTab === tab && (
                                <div key={tab} className="p-6 mt-4">
                                    <h2 className="text-xl font-semibold mb-2 text-center text-white">{conteudo.titulo}</h2>
                                    <p className="text-white mb-4 text-sm md:text-base">{conteudo.descricao}</p>
                                    <ul className="list-disc list-inside text-sm md:text-base text-white">
                                        {conteudo.recursos.map((recurso, index) => (
                                            <li key={index}>{recurso}</li>
                                        ))}
                                    </ul>
                                    <div className="mt-4 flex justify-center">
                                        <img src="https://placehold.co/300x300" alt={conteudo.titulo} className="rounded-md max-w-full h-auto" />
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Produtos;