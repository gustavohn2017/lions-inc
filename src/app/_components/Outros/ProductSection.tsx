// components/ProductsSection.tsx
import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    title: 'Crédito com garantia imobiliária - home equity',
    description: 'Use seu imóvel como garantia para obter crédito com taxas mais baixas.',
  },
  {
    title: 'Crédito pelo fundo imobiliário',
    description: 'Obtenha crédito utilizando seu fundo imobiliário como garantia.',
  },
  {
    title: 'Avaliação de imóveis',
    description: 'Serviço de avaliação profissional para determinar o valor de mercado do seu imóvel.',
  },
    {
    title: 'Assessoria imobiliária',
    description: 'Auxiliamos em todo o processo de compra, venda e locação de imóveis.',
  },
    {
    title: 'GERIC da C.E.F',
    description: 'Serviços relacionados ao GERIC (Gerência de Risco de Crédito) da Caixa Econômica Federal.',
  },
    {
    title: 'Financiamento de Obras para construtoras e incorporadoras',
    description: 'Soluções de financiamento para projetos de construção e incorporação.',
  },
    {
    title: 'Antecipação de recebíveis futuros',
    description: 'Transforme seus recebíveis futuros em capital de giro imediato.',
  },
    {
    title: 'Administração de carteiras de clientes',
    description: 'Gerenciamento eficiente de carteiras de clientes para otimizar resultados.',
  },
    {
    title: 'Expansão de patrimônio',
    description: 'Estratégias para aumentar e diversificar seu patrimônio de forma segura.',
  },
    {
    title: 'Assessoria financeira - PJ',
    description: 'Consultoria financeira personalizada para empresas de todos os portes.',
  },
    {
    title: 'Portabilidade de dívidas',
    description: 'Transfira suas dívidas para outras instituições com melhores condições.',
  },
    {
    title: 'Empréstimos',
    description: 'Diversas opções de empréstimos para atender às suas necessidades.',
  },
    {
    title: 'Créditos pelo BNDES',
    description: 'Acesso a linhas de crédito do BNDES para projetos de desenvolvimento.',
  },
    {
    title: 'Crédito pelo fundo de investimento Nacional/Internacional',
    description: 'Opções de crédito através de fundos de investimento nacionais e internacionais.',
  },
];

const ProductsSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Encontre a solução certa para você!</h2>
        <p className='text-2xl text-center mb-2'> Inúneras soluções para atender às suas necessidades financeiras.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;