"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
            descricao: "Consórcios são uma forma de adquirir bens ou serviços por meio de autofinanciamento coletivo.",
            recursos: ["Planejamento financeiro", "Sem juros", "Diversas opções de crédito"],
        },
        Tab2: {
            titulo: "Financiamentos",
            descricao: "Financiamentos são empréstimos concedidos para a aquisição de bens ou serviços, com pagamento parcelado.",
            recursos: ["Taxas competitivas", "Prazos flexíveis", "Aprovação rápida"],
        },
        Tab3: {
            titulo: "Capital de Giro",
            descricao: "Capital de giro para empresas é o recurso necessário para financiar as operações diárias de um negócio.",
            recursos: ["Melhora do fluxo de caixa", "Facilidade de acesso", "Condições personalizadas"],
        },
        Tab4: {
            titulo: "Consultoria Financeira",
            descricao: "Consultoria financeira empresarial oferece orientação especializada para a gestão financeira do seu negócio.",
            recursos: ["Análise de mercado", "Planejamento estratégico", "Apoio na tomada de decisões"],
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
                                    {produtos[tab].titulo}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="hidden md:block justify-center w-full">
                    <Tabs defaultValue="Tab1" className="w-full">
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
                                <div className="p-2 md:p-4">
                                    <h2 className="text-xl font-semibold mb-2 text-white">{conteudo.titulo}</h2>
                                    <p className="text-white mb-4 text-sm md:text-base">{conteudo.descricao}</p>
                                    <ul className="list-disc list-inside text-sm md:text-base text-white">
                                        {conteudo.recursos.map((recurso, index) => (
                                            <li key={index}>{recurso}</li>
                                        ))}
                                    </ul>
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