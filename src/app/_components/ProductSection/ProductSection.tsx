"use client";  // Importante para componentes com interatividade no Next.js

import React from 'react';
import Link from "next/link";


// Dados dos produtos
const products = [
  {
    id: 1,
    title: "Crédito com garantia imobiliária",
    description: "Obtenha crédito utilizando seu imóvel como garantia, também conhecido como home equity, com taxas reduzidas e prazos flexíveis.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 2,
    title: "Crédito pelo fundo imobiliário",
    description: "Soluções de crédito através de fundos imobiliários, oferecendo condições diferenciadas para investidores e proprietários.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 3,
    title: "Avaliação de imóveis",
    description: "Serviço especializado de avaliação de imóveis realizado por profissionais qualificados, garantindo precisão no valor de mercado do seu bem.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 4,
    title: "Assessoria imobiliária",
    description: "Consultoria completa para compra, venda e locação de imóveis, com acompanhamento personalizado em todas as etapas do processo.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 5,
    title: "GERIC da C.E.F",
    description: "Gerenciamento de risco de crédito junto à Caixa Econômica Federal, facilitando a aprovação de financiamentos para seus projetos.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 6,
    title: "Financiamento de Obras",
    description: "Soluções específicas para construtoras e incorporadoras, com condições especiais para financiamento de empreendimentos.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 7,
    title: "Antecipação de recebíveis futuros",
    description: "Transforme receitas futuras em capital imediato para sua empresa, com taxas competitivas e processos ágeis.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 8,
    title: "Administração de carteiras de clientes",
    description: "Gestão profissional da sua carteira de clientes, maximizando resultados e melhorando o relacionamento com seus investidores.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 9,
    title: "Expansão de patrimônio",
    description: "Estratégias personalizadas para crescimento e diversificação patrimonial, com foco em segurança e rentabilidade.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 10,
    title: "Assessoria financeira - PJ",
    description: "Consultoria especializada para empresas, com planejamento financeiro e estratégias para otimização de recursos.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 11,
    title: "Portabilidade de dívidas",
    description: "Transfira suas dívidas para nossa instituição e aproveite condições mais vantajosas, reduzindo juros e melhorando o fluxo de caixa.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 12,
    title: "Empréstimos",
    description: "Soluções de crédito personalizadas para diferentes necessidades, com aprovação rápida e taxas competitivas.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 13,
    title: "Créditos pelo BNDES",
    description: "Acesso facilitado às linhas de crédito do BNDES, com suporte completo na elaboração e aprovação de projetos.",
    image: "https://placehold.co/200x150"
  },
  {
    id: 14,
    title: "Crédito pelo fundo de investimento",
    description: "Oportunidades de crédito através de fundos de investimento nacionais e internacionais, com condições exclusivas.",
    image: "https://placehold.co/200x150"
  },
];

// Versão sem Framer Motion (caso essa seja a causa do erro)
const ProductsSection = () => {
  return (
    <section className="py-16 bg-[#585858]">
      <div className="container mx-auto px-4">
        <div className="container text-center">
            <h2 className="text-3xl font-bold  mb-12">Encontre a solução certa para você!</h2>
            <p>Caso manter essa sessão, vou diminuir o espaço a ser consumido no dispositivo do usuário final ()</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg bg-white overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03]"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/3 min-h-48 bg-gray-200">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </div>
                  <div className="mt-4">
                    <Link href="#contato">
                      <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors">
                        Tenho interesse
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;