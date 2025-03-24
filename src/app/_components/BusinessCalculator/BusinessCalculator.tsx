"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, DollarSign, Building, TrendingUp, Clock, Percent, Briefcase, CreditCard, HelpCircle } from 'lucide-react';
import './business-calculator.css';

// Define input types for different calculators
type ConsortiumInputs = {
  assetValue: string;
  adminFee: string;
  period: string;
  downPayment: string;
};

type FinancingInputs = {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  downPayment: string;
};

type WorkingCapitalInputs = {
  requestedAmount: string;
  interestRate: string;
  repaymentPeriod: string;
  installments: string;
};

type ConsultingInputs = {
  companyRevenue: string;
  desiredROI: string;
  implementationPeriod: string;
  monthlyCost: string;
};

const BusinessCalculator: React.FC = () => {
  const [calculatorType, setCalculatorType] = useState('consortium');
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Consortium calculator state
  const [consortiumInputs, setConsortiumInputs] = useState<ConsortiumInputs>({
    assetValue: '100000',
    adminFee: '15',
    period: '48',
    downPayment: '0'
  });
  
  // Financing calculator state
  const [financingInputs, setFinancingInputs] = useState<FinancingInputs>({
    loanAmount: '200000',
    interestRate: '0.85',
    loanTerm: '360',
    downPayment: '40000'
  });
  
  // Working Capital calculator state
  const [workingCapitalInputs, setWorkingCapitalInputs] = useState<WorkingCapitalInputs>({
    requestedAmount: '50000',
    interestRate: '1.9',
    repaymentPeriod: '12',
    installments: '12'
  });
  
  // Consulting calculator state
  const [consultingInputs, setConsultingInputs] = useState<ConsultingInputs>({
    companyRevenue: '500000',
    desiredROI: '15',
    implementationPeriod: '3',
    monthlyCost: '5000'
  });
  
  // Results states
  const [consortiumResult, setConsortiumResult] = useState<any>(null);
  const [financingResult, setFinancingResult] = useState<any>(null);
  const [workingCapitalResult, setWorkingCapitalResult] = useState<any>(null);
  const [consultingResult, setConsultingResult] = useState<any>(null);
  
  // Loading states
  const [isCalculating, setIsCalculating] = useState({
    consortium: false,
    financing: false,
    workingCapital: false,
    consulting: false
  });
  
  // Input handlers
  const handleConsortiumInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConsortiumInputs(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFinancingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinancingInputs(prev => ({ ...prev, [name]: value }));
  };
  
  const handleWorkingCapitalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkingCapitalInputs(prev => ({ ...prev, [name]: value }));
  };
  
  const handleConsultingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConsultingInputs(prev => ({ ...prev, [name]: value }));
  };
  
  // Calculate functions
  const calculateConsortium = () => {
    setIsCalculating(prev => ({ ...prev, consortium: true }));
    
    setTimeout(() => {
      const assetValue = parseFloat(consortiumInputs.assetValue) || 0;
      const adminFee = parseFloat(consortiumInputs.adminFee) || 0;
      const period = parseInt(consortiumInputs.period) || 0;
      const downPayment = parseFloat(consortiumInputs.downPayment) || 0;
      
      const remainingValue = assetValue - downPayment;
      const adminFeeTotal = (adminFee / 100) * remainingValue;
      const totalCost = remainingValue + adminFeeTotal;
      const monthlyPayment = totalCost / period;
      
      setConsortiumResult({
        monthlyPayment,
        totalCost,
        adminFeeTotal,
        remainingValue
      });
      
      setIsCalculating(prev => ({ ...prev, consortium: false }));
    }, 800);
  };
  
  const calculateFinancing = () => {
    setIsCalculating(prev => ({ ...prev, financing: true }));
    
    setTimeout(() => {
      const principal = parseFloat(financingInputs.loanAmount) - parseFloat(financingInputs.downPayment || '0');
      const monthlyRate = (parseFloat(financingInputs.interestRate) || 0) / 100;
      const numberOfPayments = parseInt(financingInputs.loanTerm) || 0;
      
      // Monthly payment formula: P = principal * r * (1+r)^n / ((1+r)^n - 1)
      const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
      const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
      
      let monthlyPayment = 0;
      
      if (denominator !== 0 && !isNaN(numerator) && !isNaN(denominator)) {
        monthlyPayment = principal * (numerator / denominator);
      }
      
      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - principal;
      
      setFinancingResult({
        monthlyPayment,
        totalPayment,
        totalInterest,
        principal
      });
      
      setIsCalculating(prev => ({ ...prev, financing: false }));
    }, 800);
  };
  
  const calculateWorkingCapital = () => {
    setIsCalculating(prev => ({ ...prev, workingCapital: true }));
    
    setTimeout(() => {
      const amount = parseFloat(workingCapitalInputs.requestedAmount) || 0;
      const rate = (parseFloat(workingCapitalInputs.interestRate) || 0) / 100;
      const months = parseInt(workingCapitalInputs.repaymentPeriod) || 0;
      const installments = parseInt(workingCapitalInputs.installments) || 0;
      
      // Simple calculation for illustration purposes
      const totalCost = amount * (1 + (rate * months));
      const monthlyPayment = totalCost / installments;
      const totalInterest = totalCost - amount;
      
      setWorkingCapitalResult({
        monthlyPayment,
        totalCost,
        totalInterest,
        amount
      });
      
      setIsCalculating(prev => ({ ...prev, workingCapital: false }));
    }, 800);
  };
  
  const calculateConsulting = () => {
    setIsCalculating(prev => ({ ...prev, consulting: true }));
    
    setTimeout(() => {
      const revenue = parseFloat(consultingInputs.companyRevenue) || 0;
      const roi = (parseFloat(consultingInputs.desiredROI) || 0) / 100;
      const months = parseInt(consultingInputs.implementationPeriod) || 0;
      const monthlyCost = parseFloat(consultingInputs.monthlyCost) || 0;
      
      const totalCost = monthlyCost * months;
      const expectedReturn = revenue * roi;
      const timeToBreakEven = totalCost / expectedReturn * 12; // in months
      const returnPerDollar = expectedReturn / totalCost;
      
      setConsultingResult({
        totalCost,
        expectedReturn,
        timeToBreakEven,
        returnPerDollar
      });
      
      setIsCalculating(prev => ({ ...prev, consulting: false }));
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

  // Consortium Calculator Component
  const ConsortiumCalculator = () => (
    <div className="calculator-card">
      <h3 className="text-center text-xl font-medium text-[#C6A052] mb-4">Calculadora de Consórcio</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="assetValue" className="calculator-label">
            <DollarSign size={16} className="mr-1 text-[#AF8E41]" />
            Valor do Bem (R$)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('assetValue')}
              aria-label="Informação sobre Valor do Bem"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'assetValue' && (
            <div className="calculator-tooltip">
              Valor total do bem que deseja adquirir pelo consórcio.
            </div>
          )}
          <input
            type="number"
            id="assetValue"
            name="assetValue"
            value={consortiumInputs.assetValue}
            onChange={handleConsortiumInputChange}
            className="calculator-input"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="adminFee" className="calculator-label">
            <Percent size={16} className="mr-1 text-[#AF8E41]" />
            Taxa de Administração (%)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('adminFee')}
              aria-label="Informação sobre Taxa de Administração"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'adminFee' && (
            <div className="calculator-tooltip">
              Percentual cobrado pela administradora do consórcio.
            </div>
          )}
          <input
            type="number"
            id="adminFee"
            name="adminFee"
            value={consortiumInputs.adminFee}
            onChange={handleConsortiumInputChange}
            className="calculator-input"
            step="0.1"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="period" className="calculator-label">
            <Clock size={16} className="mr-1 text-[#AF8E41]" />
            Prazo (meses)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('period')}
              aria-label="Informação sobre Prazo"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'period' && (
            <div className="calculator-tooltip">
              Duração do consórcio em meses.
            </div>
          )}
          <input
            type="number"
            id="period"
            name="period"
            value={consortiumInputs.period}
            onChange={handleConsortiumInputChange}
            className="calculator-input"
            min="1"
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
              Valor de entrada, se houver.
            </div>
          )}
          <input
            type="number"
            id="downPayment"
            name="downPayment"
            value={consortiumInputs.downPayment}
            onChange={handleConsortiumInputChange}
            className="calculator-input"
            min="0"
          />
        </div>
      </div>

      <button
        onClick={calculateConsortium}
        disabled={isCalculating.consortium}
        className="calculator-button"
      >
        {isCalculating.consortium ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Calculando...
          </>
        ) : (
          <>
            <Calculator size={16} className="mr-2" />
            Calcular Consórcio
          </>
        )}
      </button>

      {consortiumResult && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-[#343941] border border-[#AF8E41]/30 rounded-md p-4"
        >
          <div className="text-center mb-4">
            <p className="text-gray-300 text-sm mb-1">Parcela Mensal</p>
            <p className="text-[#C6A052] text-2xl font-bold">
              {formatCurrency(consortiumResult.monthlyPayment)}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Custo Total</p>
              <p className="text-white text-sm font-medium">
                {formatCurrency(consortiumResult.totalCost)}
              </p>
            </div>
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Taxa Administração</p>
              <p className="text-[#AF8E41] text-sm font-medium">
                {formatCurrency(consortiumResult.adminFeeTotal)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-xs">
              Não há incidência de juros em consórcios, apenas taxa de administração.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );

  // Financing Calculator Component
  const FinancingCalculator = () => (
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
            value={financingInputs.loanAmount}
            onChange={handleFinancingInputChange}
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
            value={financingInputs.downPayment}
            onChange={handleFinancingInputChange}
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
              Taxa de juros mensal do financiamento.
            </div>
          )}
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={financingInputs.interestRate}
            onChange={handleFinancingInputChange}
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
              Tempo total do financiamento em meses.
            </div>
          )}
          <input
            type="number"
            id="loanTerm"
            name="loanTerm"
            value={financingInputs.loanTerm}
            onChange={handleFinancingInputChange}
            className="calculator-input"
            min="1"
          />
        </div>
      </div>

      <button
        onClick={calculateFinancing}
        disabled={isCalculating.financing}
        className="calculator-button"
      >
        {isCalculating.financing ? (
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

      {financingResult && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-[#343941] border border-[#AF8E41]/30 rounded-md p-4"
        >
          <div className="text-center mb-4">
            <p className="text-gray-300 text-sm mb-1">Parcela Mensal</p>
            <p className="text-[#C6A052] text-2xl font-bold">
              {formatCurrency(financingResult.monthlyPayment)}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Valor Financiado</p>
              <p className="text-white text-sm font-medium">
                {formatCurrency(financingResult.principal)}
              </p>
            </div>
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Juros Totais</p>
              <p className="text-[#AF8E41] text-sm font-medium">
                {formatCurrency(financingResult.totalInterest)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-xs">
              Valor total pago: {formatCurrency(financingResult.totalPayment)}
            </p>
            <p className="text-gray-300 text-xs mt-1">
              Taxa anual equivalente: {(parseFloat(financingInputs.interestRate) * 12).toFixed(2)}%
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
  
  // Working Capital Calculator Component
  const WorkingCapitalCalculator = () => (
    <div className="calculator-card">
      <h3 className="text-center text-xl font-medium text-[#C6A052] mb-4">Calculadora de Capital de Giro</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="requestedAmount" className="calculator-label">
            <DollarSign size={16} className="mr-1 text-[#AF8E41]" />
            Valor Solicitado (R$)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('requestedAmount')}
              aria-label="Informação sobre Valor Solicitado"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'requestedAmount' && (
            <div className="calculator-tooltip">
              Valor necessário para capital de giro da empresa.
            </div>
          )}
          <input
            type="number"
            id="requestedAmount"
            name="requestedAmount"
            value={workingCapitalInputs.requestedAmount}
            onChange={handleWorkingCapitalInputChange}
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
              onClick={() => toggleTooltip('wcInterestRate')}
              aria-label="Informação sobre Taxa de Juros"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'wcInterestRate' && (
            <div className="calculator-tooltip">
              Taxa de juros mensal do empréstimo para capital de giro.
            </div>
          )}
          <input
            type="number"
            id="wcInterestRate"
            name="interestRate"
            value={workingCapitalInputs.interestRate}
            onChange={handleWorkingCapitalInputChange}
            className="calculator-input"
            step="0.01"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="repaymentPeriod" className="calculator-label">
            <Clock size={16} className="mr-1 text-[#AF8E41]" />
            Período de Pagamento (meses)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('repaymentPeriod')}
              aria-label="Informação sobre Período de Pagamento"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'repaymentPeriod' && (
            <div className="calculator-tooltip">
              Tempo total para pagamento do capital de giro.
            </div>
          )}
          <input
            type="number"
            id="repaymentPeriod"
            name="repaymentPeriod"
            value={workingCapitalInputs.repaymentPeriod}
            onChange={handleWorkingCapitalInputChange}
            className="calculator-input"
            min="1"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="installments" className="calculator-label">
            <TrendingUp size={16} className="mr-1 text-[#AF8E41]" />
            Número de Parcelas
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('installments')}
              aria-label="Informação sobre Número de Parcelas"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'installments' && (
            <div className="calculator-tooltip">
              Em quantas parcelas será dividido o pagamento.
            </div>
          )}
          <input
            type="number"
            id="installments"
            name="installments"
            value={workingCapitalInputs.installments}
            onChange={handleWorkingCapitalInputChange}
            className="calculator-input"
            min="1"
          />
        </div>
      </div>

      <button
        onClick={calculateWorkingCapital}
        disabled={isCalculating.workingCapital}
        className="calculator-button"
      >
        {isCalculating.workingCapital ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Calculando...
          </>
        ) : (
          <>
            <Calculator size={16} className="mr-2" />
            Calcular Capital de Giro
          </>
        )}
      </button>

      {workingCapitalResult && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-[#343941] border border-[#AF8E41]/30 rounded-md p-4"
        >
          <div className="text-center mb-4">
            <p className="text-gray-300 text-sm mb-1">Parcela Mensal</p>
            <p className="text-[#C6A052] text-2xl font-bold">
              {formatCurrency(workingCapitalResult.monthlyPayment)}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Valor Liberado</p>
              <p className="text-white text-sm font-medium">
                {formatCurrency(workingCapitalResult.amount)}
              </p>
            </div>
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Juros Totais</p>
              <p className="text-[#AF8E41] text-sm font-medium">
                {formatCurrency(workingCapitalResult.totalInterest)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-xs">
              Valor total a ser pago: {formatCurrency(workingCapitalResult.totalCost)}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
  
  // Consulting Calculator Component
  const ConsultingCalculator = () => (
    <div className="calculator-card">
      <h3 className="text-center text-xl font-medium text-[#C6A052] mb-4">Calculadora de ROI de Consultoria</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="companyRevenue" className="calculator-label">
            <DollarSign size={16} className="mr-1 text-[#AF8E41]" />
            Faturamento Anual da Empresa (R$)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('companyRevenue')}
              aria-label="Informação sobre Faturamento"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'companyRevenue' && (
            <div className="calculator-tooltip">
              Faturamento anual atual da sua empresa.
            </div>
          )}
          <input
            type="number"
            id="companyRevenue"
            name="companyRevenue"
            value={consultingInputs.companyRevenue}
            onChange={handleConsultingInputChange}
            className="calculator-input"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="desiredROI" className="calculator-label">
            <Percent size={16} className="mr-1 text-[#AF8E41]" />
            Retorno Esperado (%)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('desiredROI')}
              aria-label="Informação sobre Retorno Esperado"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'desiredROI' && (
            <div className="calculator-tooltip">
              Percentual de aumento esperado no faturamento após a consultoria.
            </div>
          )}
          <input
            type="number"
            id="desiredROI"
            name="desiredROI"
            value={consultingInputs.desiredROI}
            onChange={handleConsultingInputChange}
            className="calculator-input"
            step="0.1"
            min="0"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="implementationPeriod" className="calculator-label">
            <Clock size={16} className="mr-1 text-[#AF8E41]" />
            Período de Implementação (meses)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('implementationPeriod')}
              aria-label="Informação sobre Período de Implementação"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'implementationPeriod' && (
            <div className="calculator-tooltip">
              Tempo necessário para implementar as mudanças sugeridas pela consultoria.
            </div>
          )}
          <input
            type="number"
            id="implementationPeriod"
            name="implementationPeriod"
            value={consultingInputs.implementationPeriod}
            onChange={handleConsultingInputChange}
            className="calculator-input"
            min="1"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="monthlyCost" className="calculator-label">
            <DollarSign size={16} className="mr-1 text-[#AF8E41]" />
            Custo Mensal da Consultoria (R$)
            <button 
              className="ml-1 text-gray-400 hover:text-[#AF8E41] transition-colors" 
              onClick={() => toggleTooltip('monthlyCost')}
              aria-label="Informação sobre Custo da Consultoria"
            >
              <HelpCircle size={14} />
            </button>
          </label>
          {showTooltip === 'monthlyCost' && (
            <div className="calculator-tooltip">
              Valor mensal investido na consultoria empresarial.
            </div>
          )}
          <input
            type="number"
            id="monthlyCost"
            name="monthlyCost"
            value={consultingInputs.monthlyCost}
            onChange={handleConsultingInputChange}
            className="calculator-input"
            min="0"
          />
        </div>
      </div>

      <button
        onClick={calculateConsulting}
        disabled={isCalculating.consulting}
        className="calculator-button"
      >
        {isCalculating.consulting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Calculando...
          </>
        ) : (
          <>
            <Calculator size={16} className="mr-2" />
            Calcular ROI da Consultoria
          </>
        )}
      </button>

      {consultingResult && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-[#343941] border border-[#AF8E41]/30 rounded-md p-4"
        >
          <div className="text-center mb-4">
            <p className="text-gray-300 text-sm mb-1">Retorno Anual Esperado</p>
            <p className="text-[#C6A052] text-2xl font-bold">
              {formatCurrency(consultingResult.expectedReturn)}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Investimento Total</p>
              <p className="text-white text-sm font-medium">
                {formatCurrency(consultingResult.totalCost)}
              </p>
            </div>
            <div className="bg-[#2A2D31]/80 p-3 rounded-md">
              <p className="text-gray-400 text-xs mb-1">Retorno por R$ investido</p>
              <p className="text-[#AF8E41] text-sm font-medium">
                R$ {consultingResult.returnPerDollar.toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-xs">
              Tempo estimado para recuperar o investimento: 
              {consultingResult.timeToBreakEven.toFixed(1)} meses
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
            CALCULADORAS DE NEGÓCIOS
          </h2>
          <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-[#AF8E41] to-transparent mx-auto mb-3 sm:mb-4"></div>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto">
            Faça simulações dos nossos produtos financeiros e descubra a melhor opção para sua necessidade.
          </p>
        </motion.div>

        {/* Mobile view (Tabs) */}
        {isMobile ? (
          <div className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg shadow-xl overflow-hidden max-w-3xl mx-auto">
            <div className="p-5 sm:p-8">
              <Tabs defaultValue="consortium" onValueChange={setCalculatorType} className="w-full">
                <TabsList className="w-full grid grid-cols-2 gap-1 bg-[#343941] p-1 rounded-lg mb-6">
                  <TabsTrigger 
                    value="consortium" 
                    className="calculator-tab text-xs py-2"
                  >
                    <Briefcase size={14} className="mr-1 hidden sm:inline" />
                    Consórcio
                  </TabsTrigger>
                  <TabsTrigger 
                    value="financing" 
                    className="calculator-tab text-xs py-2"
                  >
                    <CreditCard size={14} className="mr-1 hidden sm:inline" />
                    Financiamento
                  </TabsTrigger>
                </TabsList>

                <TabsList className="w-full grid grid-cols-2 gap-1 bg-[#343941] p-1 rounded-lg mb-6">
                  <TabsTrigger 
                    value="workingCapital" 
                    className="calculator-tab text-xs py-2"
                  >
                    <Building size={14} className="mr-1 hidden sm:inline" />
                    Capital de Giro
                  </TabsTrigger>
                  <TabsTrigger 
                    value="consulting" 
                    className="calculator-tab text-xs py-2"
                  >
                    <TrendingUp size={14} className="mr-1 hidden sm:inline" />
                    Consultoria
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="consortium" className="focus:outline-none">
                  <ConsortiumCalculator />
                </TabsContent>
                
                <TabsContent value="financing" className="focus:outline-none">
                  <FinancingCalculator />
                </TabsContent>
                
                <TabsContent value="workingCapital" className="focus:outline-none">
                  <WorkingCapitalCalculator />
                </TabsContent>
                
                <TabsContent value="consulting" className="focus:outline-none">
                  <ConsultingCalculator />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          /* Desktop view (Grid) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg shadow-xl overflow-hidden">
              <div className="p-5 sm:p-8">
                <ConsortiumCalculator />
              </div>
            </div>
            
            <div className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg shadow-xl overflow-hidden">
              <div className="p-5 sm:p-8">
                <FinancingCalculator />
              </div>
            </div>
            
            <div className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg shadow-xl overflow-hidden">
              <div className="p-5 sm:p-8">
                <WorkingCapitalCalculator />
              </div>
            </div>
            
            <div className="bg-[#2A2D31] border border-[#AF8E41]/20 rounded-lg shadow-xl overflow-hidden">
              <div className="p-5 sm:p-8">
                <ConsultingCalculator />
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8 text-gray-400 text-xs">
          <p>* Estas são simulações para fins informativos. Consulte nossos especialistas para uma análise personalizada.</p>
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

export default BusinessCalculator;
