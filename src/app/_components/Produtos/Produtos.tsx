import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

  return (
    <section className="p-20">
      <div>
        <h1>Produtos e Serviços</h1>
      </div>

      <Tabs defaultValue="Tab1" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-4">
          {Object.keys(produtos).map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(produtos).map(([tab, conteudo]) => (
          <TabsContent key={tab} value={tab}>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{conteudo.titulo}</h2>
              <p className="text-gray-700 mb-4">{conteudo.descricao}</p>
              <ul className="list-disc list-inside">
                {conteudo.recursos.map((recurso, index) => (
                  <li key={index}>{recurso}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default Produtos;