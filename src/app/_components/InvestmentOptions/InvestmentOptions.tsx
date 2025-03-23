"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, TrendingUp, PieChart, BarChart4, Briefcase, ShieldCheck, Share2 } from 'lucide-react';
import './investment-options.css';

type InvestmentType = {
  id: string;
  title: string;
  description: string;
  minValue: string;
  returnRate: string;
  riskLevel: 'Baixo' | 'Moderado' | 'Alto';
  term: string;
  liquidity: string;
  icon: React.ReactNode;
};

const InvestmentOptions: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("fixed-income");

  const investmentOptions: Record<string, InvestmentType[]> = {
    'fixed-income': [
      {
        id: 'cdb',
        title: 'CDB',
        description: 'Certificados de Depósito Bancário com rendimentos acima da inflação e proteção do FGC.',
        minValue: 'R$ 1.000,00',
        returnRate: '11,5% a.a.',
        riskLevel: 'Baixo',
        term: '1 a 5 anos',
        liquidity: 'Após vencimento ou resgate antecipado',
        icon: <ShieldCheck className="h-8 w-8 text-[#AF8E41]" />
      },
      {
        id: 'lci-lca',
        title: 'LCI/LCA',
        description: 'Letras de Crédito imobiliário e do agronegócio com isenção de imposto de renda para pessoa física.',
        minValue: 'R$ 5.000,00',
        returnRate: '10,8% a.a.',
        riskLevel: 'Baixo',
        term: '90 dias a 3 anos',
        liquidity: 'Após vencimento',
        icon: <Briefcase className="h-8 w-8 text-[#AF8E41]" />
      },
    ],
    'variable-income': [
      {
        id: 'stocks',
        title: 'Ações',
        description: 'Investimento em empresas listadas na bolsa com potencial de valorização e distribuição de dividendos.',
        minValue: 'A partir de R$ 100,00',
        returnRate: 'Variável',
        riskLevel: 'Alto',
        term: 'Indeterminado',
        liquidity: 'Imediata (dias úteis)',
        icon: <TrendingUp className="h-8 w-8 text-[#AF8E41]" />
      },
      {
        id: 'fiis',
        title: 'Fundos Imobiliários',
        description: 'Investimento em empreendimentos imobiliários com distribuição mensal de rendimentos.',
        minValue: 'R$ 100,00 por cota',
        returnRate: 'Média de 7% a.a.',
        riskLevel: 'Moderado',
        term: 'Indeterminado',
        liquidity: 'Imediata (dias úteis)',
        icon: <PieChart className="h-8 w-8 text-[#AF8E41]" />
      },
    ],
    'funds': [
      {
        id: 'multi-market',
        title: 'Fundos Multimercado',
        description: 'Diversificação em múltiplos mercados e classes de ativos com gestão profissional.',
        minValue: 'R$ 1.000,00',
        returnRate: 'Variável (meta: CDI + 4% a.a.)',
        riskLevel: 'Moderado',
        term: 'Recomendado: 2+ anos',
        liquidity: 'D+1 a D+30',
        icon: <Share2 className="h-8 w-8 text-[#AF8E41]" />
      },
      {
        id: 'equity-funds',
        title: 'Fundos de Ações',
        description: 'Investimento em ações com gestão especializada e diversificação setorial.',
        minValue: 'R$ 500,00',
        returnRate: 'Variável',
        riskLevel: 'Alto',
        term: 'Recomendado: 5+ anos',
        liquidity: 'D+4 a D+30',
        icon: <BarChart4 className="h-8 w-8 text-[#AF8E41]" />
      },
    ]
  };

  const categoryLabels = {
    'fixed-income': 'Renda Fixa',
    'variable-income': 'Renda Variável',
    'funds': 'Fundos de Investimento'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1E2124] to-[#242729]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#AF8E41] font-['Cormorant_Garamond'] font-bold tracking-wide mb-3">
            INVESTIMENTOS INTELIGENTES
          </h2>
          <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-3 sm:mb-4"></div>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto">
            Descubra o portfólio de investimentos do Lions Bank com opções para todos os perfis de investidores, desde os mais conservadores até os mais arrojados.
          </p>
        </motion.div>

        <Tabs defaultValue="fixed-income" onValueChange={setSelectedTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[#343941] p-1 rounded-lg">
              <TabsTrigger 
                value="fixed-income" 
                className={`px-4 py-2 text-sm rounded-md transition-all ${
                  selectedTab === 'fixed-income' 
                    ? 'bg-[#AF8E41] text-white shadow-md' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Renda Fixa
              </TabsTrigger>
              <TabsTrigger 
                value="variable-income"
                className={`px-4 py-2 text-sm rounded-md transition-all ${
                  selectedTab === 'variable-income' 
                    ? 'bg-[#AF8E41] text-white shadow-md' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Renda Variável
              </TabsTrigger>
              <TabsTrigger 
                value="funds"
                className={`px-4 py-2 text-sm rounded-md transition-all ${
                  selectedTab === 'funds' 
                    ? 'bg-[#AF8E41] text-white shadow-md' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Fundos
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(investmentOptions).map(([category, options]) => (
            <TabsContent key={category} value={category}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              >
                {options.map((option) => (
                  <motion.div
                    key={option.id}
                    variants={itemVariants}
                    className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg overflow-hidden hover:border-[#AF8E41]/40 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start mb-4">
                        <div className="bg-[#343941] p-2 rounded-md mr-4">
                          {option.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{option.title}</h3>
                          <p className="text-gray-300 text-sm mb-3">{option.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-400">Valor mínimo</p>
                          <p className="text-white font-medium">{option.minValue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Rentabilidade</p>
                          <p className="text-white font-medium">{option.returnRate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Risco</p>
                          <p className={`font-medium ${
                            option.riskLevel === 'Baixo' ? 'text-green-400' :
                            option.riskLevel === 'Moderado' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {option.riskLevel}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Prazo</p>
                          <p className="text-white font-medium">{option.term}</p>
                        </div>
                      </div>
                      
                      <a 
                        href="#contato" 
                        className="inline-flex items-center text-[#AF8E41] hover:text-[#C6A052] mt-2 text-sm font-medium transition-colors"
                      >
                        Saiba mais
                        <ArrowRight size={14} className="ml-1" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="text-center mt-8">
                <a 
                  href="#contato" 
                  className="inline-flex items-center justify-center px-5 py-3 bg-[#343941] hover:bg-[#3A4149] text-white rounded-lg transition-all duration-300 text-sm font-medium"
                >
                  Fale com um especialista em {categoryLabels[category as keyof typeof categoryLabels]}
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentOptions;
