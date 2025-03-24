"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, DollarSign, TrendingUp, Clock, Percent, CreditCard, HelpCircle, ChevronDown } from 'lucide-react';
import './financial-calculator.css';

type CalculatorInputs = {
  initialAmount: string;
  monthlyContribution: string;
  interestRate: string;
  investmentPeriod: string;
};

type LoanInputs = {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  downPayment: string;
};

const FinancialCalculator: React.FC = () => {
  const [calculatorType, setCalculatorType] = useState('compound-interest');
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Investment calculator state
  const [investmentInputs, setInvestmentInputs] = useState<CalculatorInputs>({
    initialAmount: '1000',
    monthlyContribution: '200',
    interestRate: '0.8',
    investmentPeriod: '60'
  });
  
  // Loan calculator state
  const [loanInputs, setLoanInputs] = useState<LoanInputs>({
    loanAmount: '200000',
    interestRate: '0.75',
    loanTerm: '360',
    downPayment: '40000'
  });
  
  const [investmentResult, setInvestmentResult] = useState<{
    futureValue: number | null;
    totalContributed: number | null;
    interestEarned: number | null;
  }>({
    futureValue: null,
    totalContributed: null,
    interestEarned: null
  });
  
  const [loanResult, setLoanResult] = useState<{
    monthlyPayment: number | null;
    totalPayment: number | null;
    totalInterest: number | null;
  }>({
    monthlyPayment: null,
    totalPayment: null,
    totalInterest: null
  });
  
  const [isCalculating, setIsCalculating] = useState({
    investment: false,
    loan: false
  });
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleInvestmentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvestmentInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleLoanInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanInputs(prev => ({ ...prev, [name]: value }));
  };

  const calculateCompoundInterest = () => {
    setIsCalculating(prev => ({ ...prev, investment: true }));
    
    // Simulating calculation with timeout for animation effect
    setTimeout(() => {
      const p = parseFloat(investmentInputs.initialAmount) || 0;
      const pmt = parseFloat(investmentInputs.monthlyContribution) || 0;
      const r = (parseFloat(investmentInputs.interestRate) || 0) / 100;
      const t = parseInt(investmentInputs.investmentPeriod) || 0;
      
      // Compound interest formula with monthly contributions
      // FV = P(1 + r)^t + PMT * [((1 + r)^t - 1) / r]
      const ratePerMonth = r;
      const futureValue = p * Math.pow(1 + ratePerMonth, t) + 
                        pmt * ((Math.pow(1 + ratePerMonth, t) - 1) / ratePerMonth);
      
      const totalContributed = p + (pmt * t);
      const interestEarned = futureValue - totalContributed;
      
      setInvestmentResult({
        futureValue,
        totalContributed,
        interestEarned
      });
      setIsCalculating(prev => ({ ...prev, investment: false }));
      setShowDetails(true);
    }, 800);
  };

  const calculateLoanPayment = () => {
    setIsCalculating(prev => ({ ...prev, loan: true }));
    
    setTimeout(() => {
      const principal = parseFloat(loanInputs.loanAmount) - parseFloat(loanInputs.downPayment || '0');
      const monthlyRate = (parseFloat(loanInputs.interestRate) || 0) / 100;
      const numberOfPayments = parseInt(loanInputs.loanTerm) || 0;
      
      // Monthly payment formula: P = principal * r * (1+r)^n / ((1+r)^n - 1)
      const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
      const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
      
      let monthlyPayment = 0;
      
      if (denominator !== 0 && !isNaN(numerator) && !isNaN(denominator)) {
        monthlyPayment = principal * (numerator / denominator);
      }
      
      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - principal;
      
      setLoanResult({
        monthlyPayment,
        totalPayment,
        totalInterest
      });
      setIsCalculating(prev => ({ ...prev, loan: false }));
      setShowDetails(true);
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
  
  const toggleTooltip = (id: string | null) => {
    setShowTooltip(id === showTooltip ? null : id);
  };

  // Compound Interest Calculator Component
  const CompoundInterestCalculator = () => (
    <div className="calculator-card">
      <h3 className="text-center text-xl font-medium text-[#C6A052] mb-4">Calculadora de Juros Compostos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="initialAmount" className="calculator-label">
            <DollarSign size={16} className="mr-1 text-[#AF8E41]" />
            Valor Inicial (R$)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('initialAmount')}
              aria-label="Informação sobre Valor Inicial"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'initialAmount' && (
            <div className="calculator-tooltip">
              Valor que você já possui para iniciar o investimento.
            </div>
          )}
          <input
            type="number"
            id="initialAmount"
            name="initialAmount"
            value={investmentInputs.initialAmount}
            onChange={handleInvestmentInputChange}
            className="calculator-input"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="monthlyContribution" className="calculator-label">
            <DollarSign size={16} className="mr-1 text-[#AF8E41]" />
            Aporte Mensal (R$)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('monthlyContribution')}
              aria-label="Informação sobre Aporte Mensal"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'monthlyContribution' && (
            <div className="calculator-tooltip">
              Valor que você pretende depositar mensalmente.
            </div>
          )}
          <input
            type="number"
            id="monthlyContribution"
            name="monthlyContribution"
            value={investmentInputs.monthlyContribution}
            onChange={handleInvestmentInputChange}
            className="calculator-input"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="interestRate" className="calculator-label">
            <Percent size={16} className="mr-1 text-[#AF8E41]" />
            Taxa de Juros Mensal (%)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('interestRate')}
              aria-label="Informação sobre Taxa de Juros"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'interestRate' && (
            <div className="calculator-tooltip">
              Taxa de juros mensal do investimento (Ex: 0.8% para CDI, 1.2% para ações).
            </div>
          )}
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={investmentInputs.interestRate}
            onChange={handleInvestmentInputChange}
            className="calculator-input"
            step="0.01"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="investmentPeriod" className="calculator-label">
            <Clock size={16} className="mr-1 text-[#AF8E41]" />
            Período (meses)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('investmentPeriod')}
              aria-label="Informação sobre Período"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'investmentPeriod' && (
            <div className="calculator-tooltip">
              Tempo total do investimento em meses (Ex: 60 = 5 anos, 120 = 10 anos).
            </div>
          )}
          <input
            type="number"
            id="investmentPeriod"
            name="investmentPeriod"
            value={investmentInputs.investmentPeriod}
            onChange={handleInvestmentInputChange}
            className="calculator-input"
            min="1"
          />
        </div>
      </div>

      <button
        onClick={calculateCompoundInterest}
        disabled={isCalculating.investment}
        className="calculator-button"
      >
        {isCalculating.investment ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Calculando...
          </>
        ) : (
          <>
            <Calculator size={16} className="mr-2" />
            Calcular Investimento
          </>
        )}
      </button>

      {investmentResult.futureValue !== null && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-[#343941] border border-[#AF8E41]/30 rounded-md p-4"
        >
          <div className="text-center mb-4">
            <p className="text-gray-300 text-sm mb-1">Montante Final</p>
            <p className="text-[#C6A052] text-2xl font-bold">{formatCurrency(investmentResult.futureValue)}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Total Investido</p>
              <p className="text-white text-sm font-medium">
                {formatCurrency(investmentResult.totalContributed!)}
              </p>
            </div>
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Juros Acumulados</p>
              <p className="text-[#AF8E41] text-sm font-medium">
                {formatCurrency(investmentResult.interestEarned!)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-xs">
              Taxa anual equivalente: {(parseFloat(investmentInputs.interestRate) * 12).toFixed(2)}%
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );

  // Loan Calculator Component
  const LoanCalculator = () => (
    <div className="calculator-card">
      <h3 className="text-center text-xl font-medium text-[#C6A052] mb-4">Calculadora de Financiamento</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="loanAmount" className="calculator-label">
            <DollarSign size={16} className="mr-1 text-[#AF8E41]" />
            Valor do Financiamento (R$)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('loanAmount')}
              aria-label="Informação sobre Valor do Financiamento"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'loanAmount' && (
            <div className="calculator-tooltip">
              Valor total do bem que deseja financiar.
            </div>
          )}
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={loanInputs.loanAmount}
            onChange={handleLoanInputChange}
            className="calculator-input"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="downPayment" className="calculator-label">
            <DollarSign size={16} className="mr-1 text-[#AF8E41]" />
            Entrada (R$)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('downPayment')}
              aria-label="Informação sobre Entrada"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'downPayment' && (
            <div className="calculator-tooltip">
              Valor da entrada ou pagamento inicial.
            </div>
          )}
          <input
            type="number"
            id="downPayment"
            name="downPayment"
            value={loanInputs.downPayment}
            onChange={handleLoanInputChange}
            className="calculator-input"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="loanInterestRate" className="calculator-label">
            <Percent size={16} className="mr-1 text-[#AF8E41]" />
            Taxa de Juros Mensal (%)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('loanInterestRate')}
              aria-label="Informação sobre Taxa de Juros"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'loanInterestRate' && (
            <div className="calculator-tooltip">
              Taxa de juros mensal do financiamento (Ex: 0.75% para imóveis, 1.5% para veículos).
            </div>
          )}
          <input
            type="number"
            id="loanInterestRate"
            name="interestRate"
            value={loanInputs.interestRate}
            onChange={handleLoanInputChange}
            className="calculator-input"
            step="0.01"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="loanTerm" className="calculator-label">
            <Clock size={16} className="mr-1 text-[#AF8E41]" />
            Prazo (meses)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('loanTerm')}
              aria-label="Informação sobre Prazo"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'loanTerm' && (
            <div className="calculator-tooltip">
              Tempo total do financiamento em meses (Ex: 360 = 30 anos, 60 = 5 anos).
            </div>
          )}
          <input
            type="number"
            id="loanTerm"
            name="loanTerm"
            value={loanInputs.loanTerm}
            onChange={handleLoanInputChange}
            className="calculator-input"
            min="1"
          />
        </div>
      </div>

      <button
        onClick={calculateLoanPayment}
        disabled={isCalculating.loan}
        className="calculator-button"
      >
        {isCalculating.loan ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Calculando...
          </>
        ) : (
          <>
            <Calculator size={16} className="mr-2" />
            Calcular Financiamento
          </>
        )}
      </button>

      {loanResult.monthlyPayment !== null && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-[#343941] border border-[#AF8E41]/30 rounded-md p-4"
        >
          <div className="text-center mb-4">
            <p className="text-gray-300 text-sm mb-1">Parcela Mensal</p>
            <p className="text-[#C6A052] text-2xl font-bold">{formatCurrency(loanResult.monthlyPayment)}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Valor Financiado</p>
              <p className="text-white text-sm font-medium">
                {formatCurrency(parseFloat(loanInputs.loanAmount) - parseFloat(loanInputs.downPayment))}
              </p>
            </div>
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Juros Totais</p>
              <p className="text-[#AF8E41] text-sm font-medium">
                {formatCurrency(loanResult.totalInterest!)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-xs">
              Valor total pago: {formatCurrency(loanResult.totalPayment!)}
            </p>
            <p className="text-gray-300 text-xs mt-1">
              Taxa anual equivalente: {(parseFloat(loanInputs.interestRate) * 12).toFixed(2)}%
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );

  return (
    <div id="calculadora" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#232527] to-[#1A1D20]">
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

        {/* Mobile view (Tabs) */}
        {isMobile ? (
          <div className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg shadow-xl overflow-hidden max-w-3xl mx-auto">
            <div className="p-5 sm:p-8">
              <Tabs defaultValue="compound-interest" onValueChange={setCalculatorType} className="w-full">
                <TabsList className="w-full grid grid-cols-2 gap-2 bg-[#343941] p-1 rounded-lg mb-6">
                  <TabsTrigger 
                    value="compound-interest" 
                    className="calculator-tab"
                  >
                    <Calculator size={16} className="mr-2 hidden sm:inline" />
                    Juros Compostos
                  </TabsTrigger>
                  <TabsTrigger 
                    value="loan" 
                    className="calculator-tab"
                  >
                    <CreditCard size={16} className="mr-2 hidden sm:inline" />
                    Financiamento
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="compound-interest" className="focus:outline-none">
                  <CompoundInterestCalculator />
                </TabsContent>
                
                <TabsContent value="loan" className="focus:outline-none">
                  <LoanCalculator />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          /* Desktop view (Side by side) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg shadow-xl overflow-hidden">
              <div className="p-5 sm:p-8">
                <CompoundInterestCalculator />
              </div>
            </div>
            
            <div className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg shadow-xl overflow-hidden">
              <div className="p-5 sm:p-8">
                <LoanCalculator />
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8 text-gray-400 text-xs">
          <p>* Esta é uma simulação para fins informativos. Consulte nossos especialistas para uma análise personalizada.</p>
          <a 
            href="#contato" 
            className="text-[#AF8E41] hover:text-[#C6A052] transition-colors mt-2 inline-block"
          >
            Fale com um consultor
          </a>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculator;
