"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, DollarSign, TrendingUp, Clock } from 'lucide-react';
import './financial-calculator.css';

type CalculatorInputs = {
  initialAmount: string;
  monthlyContribution: string;
  interestRate: string;
  investmentPeriod: string;
};

const FinancialCalculator: React.FC = () => {
  const [calculatorType, setCalculatorType] = useState('compound-interest');
  const [inputs, setInputs] = useState<CalculatorInputs>({
    initialAmount: '1000',
    monthlyContribution: '200',
    interestRate: '0.8',
    investmentPeriod: '60'
  });
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const calculateCompoundInterest = () => {
    setIsCalculating(true);
    
    // Simulating calculation with timeout for animation effect
    setTimeout(() => {
      const p = parseFloat(inputs.initialAmount) || 0;
      const pmt = parseFloat(inputs.monthlyContribution) || 0;
      const r = (parseFloat(inputs.interestRate) || 0) / 100;
      const t = parseInt(inputs.investmentPeriod) || 0;
      
      // Compound interest formula with monthly contributions
      // FV = P(1 + r)^t + PMT * [((1 + r)^t - 1) / r]
      const ratePerMonth = r;
      const futureValue = p * Math.pow(1 + ratePerMonth, t) + 
                        pmt * ((Math.pow(1 + ratePerMonth, t) - 1) / ratePerMonth);
      
      setResult(futureValue);
      setIsCalculating(false);
    }, 800);
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#232527] to-[#1A1D20]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#AF8E41] font-['Cormorant_Garamond'] font-bold tracking-wide mb-3">
            CALCULADORA FINANCEIRA
          </h2>
          <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-3 sm:mb-4"></div>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto">
            Simule o crescimento dos seus investimentos e planeje seu futuro financeiro com nossas calculadoras.
          </p>
        </motion.div>

        <div className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg shadow-xl overflow-hidden max-w-3xl mx-auto">
          <div className="p-5 sm:p-8">
            <Tabs defaultValue="compound-interest" onValueChange={setCalculatorType} className="w-full">
              <TabsList className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#343941] p-1 rounded-lg mb-6">
                <TabsTrigger 
                  value="compound-interest" 
                  className={`px-3 py-2 text-sm rounded-md transition-all ${
                    calculatorType === 'compound-interest' 
                      ? 'bg-[#AF8E41] text-white shadow-md' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Juros Compostos
                </TabsTrigger>
                <TabsTrigger 
                  value="retirement" 
                  className={`px-3 py-2 text-sm rounded-md transition-all ${
                    calculatorType === 'retirement' 
                      ? 'bg-[#AF8E41] text-white shadow-md' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  disabled
                >
                  Aposentadoria
                </TabsTrigger>
                <TabsTrigger 
                  value="loan" 
                  className={`px-3 py-2 text-sm rounded-md transition-all ${
                    calculatorType === 'loan' 
                      ? 'bg-[#AF8E41] text-white shadow-md' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  disabled
                >
                  Financiamento
                </TabsTrigger>
              </TabsList>

              <TabsContent value="compound-interest" className="focus:outline-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="initialAmount" className="text-gray-300 text-sm mb-1 flex items-center">
                      <DollarSign size={16} className="mr-1 text-[#AF8E41]" />
                      Valor Inicial (R$)
                    </label>
                    <input
                      type="number"
                      id="initialAmount"
                      name="initialAmount"
                      value={inputs.initialAmount}
                      onChange={handleInputChange}
                      className="bg-[#343941] border border-[#AF8E41]/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#AF8E41]/50"
                      min="0"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="monthlyContribution" className="text-gray-300 text-sm mb-1 flex items-center">
                      <DollarSign size={16} className="mr-1 text-[#AF8E41]" />
                      Aporte Mensal (R$)
                    </label>
                    <input
                      type="number"
                      id="monthlyContribution"
                      name="monthlyContribution"
                      value={inputs.monthlyContribution}
                      onChange={handleInputChange}
                      className="bg-[#343941] border border-[#AF8E41]/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#AF8E41]/50"
                      min="0"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="interestRate" className="text-gray-300 text-sm mb-1 flex items-center">
                      <TrendingUp size={16} className="mr-1 text-[#AF8E41]" />
                      Taxa de Juros Mensal (%)
                    </label>
                    <input
                      type="number"
                      id="interestRate"
                      name="interestRate"
                      value={inputs.interestRate}
                      onChange={handleInputChange}
                      className="bg-[#343941] border border-[#AF8E41]/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#AF8E41]/50"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="investmentPeriod" className="text-gray-300 text-sm mb-1 flex items-center">
                      <Clock size={16} className="mr-1 text-[#AF8E41]" />
                      Período (meses)
                    </label>
                    <input
                      type="number"
                      id="investmentPeriod"
                      name="investmentPeriod"
                      value={inputs.investmentPeriod}
                      onChange={handleInputChange}
                      className="bg-[#343941] border border-[#AF8E41]/20 rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#AF8E41]/50"
                      min="1"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateCompoundInterest}
                  disabled={isCalculating}
                  className="w-full bg-gradient-to-r from-[#AF8E41] to-[#C6A052] text-white rounded-md py-3 font-medium transition-all hover:from-[#C6A052] hover:to-[#D6B062] disabled:opacity-70 flex items-center justify-center"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Calculando...
                    </>
                  ) : (
                    <>
                      <Calculator size={16} className="mr-2" />
                      Calcular
                    </>
                  )}
                </button>

                {result !== null && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 bg-[#343941] border border-[#AF8E41]/30 rounded-md p-4 text-center"
                  >
                    <p className="text-gray-300 text-sm mb-1">Montante Final</p>
                    <p className="text-[#C6A052] text-2xl font-bold">{formatCurrency(result)}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-gray-400 text-xs">Total Investido</p>
                        <p className="text-white text-sm">
                          {formatCurrency(
                            parseFloat(inputs.initialAmount) + 
                            parseFloat(inputs.monthlyContribution) * parseInt(inputs.investmentPeriod)
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Juros Acumulados</p>
                        <p className="text-white text-sm">
                          {formatCurrency(
                            result - 
                            (parseFloat(inputs.initialAmount) + 
                            parseFloat(inputs.monthlyContribution) * parseInt(inputs.investmentPeriod))
                          )}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-400 text-xs">
          <p>* Esta é uma simulação para fins informativos. Consulte nossos especialistas para uma análise personalizada.</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculator;
