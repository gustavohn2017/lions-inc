"use client";

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Produtos = () => {
    const produtos = {
        Tab1: {
            titulo: "Produto 1",
            descricao: "Descrição detalhada do Produto 1. Este produto oferece [recursos/benefícios].",
            recursos: ["Recurso A", "Recurso B", "Recurso C"],
        },
        Tab2: {
            titulo: "Produto 2",
            descricao: "Descrição detalhada do Produto 2. Este produto é ideal para [público-alvo].",
            recursos: ["Recurso X", "Recurso Y", "Recurso Z"],
        },
        Tab3: {
            titulo: "Serviço 1",
            descricao: "Descrição detalhada do Serviço 1. Este serviço inclui [componentes/etapas].",
            recursos: ["Etapa 1", "Etapa 2", "Etapa 3"],
        },
        Tab4: {
            titulo: "Serviço 2",
            descricao: "Descrição detalhada do Serviço 2. Este serviço fornece [resultados/soluções].",
            recursos: ["Solução A", "Solução B", "Solução C"],
        },
    };

    const [selectedTab, setSelectedTab] = useState("Tab1");

    return (
        <section className="p-4 md:p-20 flex flex-col items-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Produtos e Serviços</h1>
            </div>

            <div className="w-full md:w-[600px] mt-8">
                {/* Dropdown para telas menores */}
                <div className="md:hidden flex justify-center">
                    <Select value={selectedTab} onValueChange={setSelectedTab}>
                        <SelectTrigger className="w-full bg-gray-100 border rounded-md text-center">
                            <SelectValue placeholder="Selecione um produto/serviço" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-100 border rounded-md">
                            {Object.keys(produtos).map((tab) => (
                                <SelectItem key={tab} value={tab} className="flex justify-center">
                                    {tab}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Card para telas maiores */}
                <div className="hidden md:block bg-gray-100 rounded-lg shadow-md p-6">
                    <Tabs defaultValue="Tab1" className="w-full">
                        <TabsList className="flex justify-center border-b border-gray-200">
                            {Object.keys(produtos).map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    value={tab}
                                    className="text-sm md:text-base p-2 rounded-t-md transition-colors duration-200 hover:bg-gray-200 data-[state=active]:bg-white mx-2"
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {Object.entries(produtos).map(([tab, conteudo]) => (
                            <TabsContent key={tab} value={tab} className="mt-4">
                                <div className="p-2 md:p-4">
                                    <h2 className="text-lg md:text-xl font-semibold mb-2">{conteudo.titulo}</h2>
                                    <p className="text-gray-700 mb-4 text-sm md:text-base">{conteudo.descricao}</p>
                                    <ul className="list-disc list-inside text-sm md:text-base">
                                        {conteudo.recursos.map((recurso, index) => (
                                            <li key={index}>{recurso}</li>
                                        ))}
                                    </ul>
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>

                {/* Conteúdo dinâmico para telas menores */}
                <div className="md:hidden flex justify-center">
                    <div className="w-full">
                        {Object.entries(produtos).map(([tab, conteudo]) => (
                            selectedTab === tab && (
                                <div key={tab} className="p-2 md:p-4 bg-gray-100 rounded-lg shadow-md mt-4">
                                    <h2 className="text-lg md:text-xl font-semibold mb-2 text-center">{conteudo.titulo}</h2>
                                    <p className="text-gray-700 mb-4 text-sm md:text-base">{conteudo.descricao}</p>
                                    <ul className="list-disc list-inside text-sm md:text-base">
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