'use client';

import { useState } from 'react';

interface Props {
  onClose: () => void;
}

export default function SavingsCalculator({ onClose }: Props) {
  const [monthlyIncome, setMonthlyIncome] = useState('4875.83');
  const [currentSavings, setCurrentSavings] = useState('8420.45');
  const [monthlyExpenses, setMonthlyExpenses] = useState('2455.38');
  const [savingsGoal, setSavingsGoal] = useState('15000');
  const [targetMonths, setTargetMonths] = useState('12');
  const [interestRate, setInterestRate] = useState('3.5');

  const income = parseFloat(monthlyIncome) || 0;
  const expenses = parseFloat(monthlyExpenses) || 0;
  const current = parseFloat(currentSavings) || 0;
  const goal = parseFloat(savingsGoal) || 0;
  const months = parseInt(targetMonths) || 1;
  const rate = parseFloat(interestRate) || 0;

  const disposableIncome = income - expenses;
  const requiredSavings = goal - current;
  const monthlySavingsNeeded = requiredSavings / months;
  const savingsRate = (disposableIncome / income) * 100;
  
  // Compound interest calculation
  const monthlyRate = rate / 100 / 12;
  let futureValue = current;
  for (let i = 0; i < months; i++) {
    futureValue = (futureValue + disposableIncome) * (1 + monthlyRate);
  }

  const scenarios = [
    {
      name: 'Conservative (Save 50% of disposable income)',
      monthlyAmount: disposableIncome * 0.5,
      description: 'Safe approach, maintains lifestyle'
    },
    {
      name: 'Moderate (Save 70% of disposable income)',
      monthlyAmount: disposableIncome * 0.7,
      description: 'Balanced approach, slight lifestyle adjustment'
    },
    {
      name: 'Aggressive (Save 90% of disposable income)',
      monthlyAmount: disposableIncome * 0.9,
      description: 'Maximum savings, significant lifestyle changes'
    }
  ];

  const calculateScenarioTime = (monthlyAmount: number) => {
    if (monthlyAmount <= 0) return 'Never';
    const months = Math.ceil(requiredSavings / monthlyAmount);
    if (months <= 12) return `${months} months`;
    return `${Math.ceil(months / 12)} years`;
  };

  const malaysianInvestmentOptions = [
    {
      name: 'EPF Account 1',
      rate: 6.0,
      description: 'Guaranteed dividend, tax benefits',
      risk: 'Very Low'
    },
    {
      name: 'Fixed Deposit',
      rate: 3.5,
      description: 'Capital guaranteed, liquid after maturity',
      risk: 'Very Low'
    },
    {
      name: 'Amanah Saham Bumiputera (ASB)',
      rate: 7.5,
      description: 'Historical average, for Bumiputeras only',
      risk: 'Low'
    },
    {
      name: 'Unit Trust (Balanced)',
      rate: 8.0,
      description: 'Professional management, diversified',
      risk: 'Medium'
    },
    {
      name: 'KLCI Index Fund',
      rate: 10.0,
      description: 'Track Malaysian stock market',
      risk: 'Medium-High'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">💰 Savings Calculator</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Current Situation</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income (RM)</label>
                <input
                  type="number"
                  step="0.01"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses (RM)</label>
                <input
                  type="number"
                  step="0.01"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Savings (RM)</label>
                <input
                  type="number"
                  step="0.01"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Goals</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Savings Goal (RM)</label>
                <input
                  type="number"
                  step="0.01"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Timeframe (Months)</label>
                <input
                  type="number"
                  value={targetMonths}
                  onChange={(e) => setTargetMonths(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Disposable Income</h4>
              <p className="text-2xl font-bold text-blue-600">RM{disposableIncome.toFixed(2)}</p>
              <p className="text-sm text-blue-700">{savingsRate.toFixed(1)}% of income</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Monthly Savings Needed</h4>
              <p className="text-2xl font-bold text-green-600">RM{monthlySavingsNeeded.toFixed(2)}</p>
              <p className="text-sm text-green-700">To reach goal in {months} months</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Future Value with Interest</h4>
              <p className="text-2xl font-bold text-purple-600">RM{futureValue.toFixed(2)}</p>
              <p className="text-sm text-purple-700">At {rate}% annual return</p>
            </div>
          </div>

          {/* Savings Scenarios */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Savings Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenarios.map((scenario, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{scenario.name}</h4>
                  <p className="text-lg font-bold text-blue-600 mb-1">RM{scenario.monthlyAmount.toFixed(2)}/month</p>
                  <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
                  <p className="text-sm font-medium text-gray-800">
                    Time to goal: {calculateScenarioTime(scenario.monthlyAmount)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Malaysian Investment Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🇲🇾 Malaysian Investment Options</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Investment</th>
                    <th className="text-left p-3 font-semibold">Expected Return</th>
                    <th className="text-left p-3 font-semibold">Risk Level</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {malaysianInvestmentOptions.map((option, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{option.name}</td>
                      <td className="p-3 text-green-600 font-semibold">{option.rate}%</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          option.risk === 'Very Low' ? 'bg-green-100 text-green-800' :
                          option.risk === 'Low' ? 'bg-blue-100 text-blue-800' :
                          option.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {option.risk}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">{option.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">📋 Personalized Recommendations</h3>
            <div className="space-y-3 text-sm text-yellow-800">
              {disposableIncome >= monthlySavingsNeeded ? (
                <p>✅ <strong>Good news!</strong> You have enough disposable income to reach your goal. Consider saving RM{monthlySavingsNeeded.toFixed(2)} monthly.</p>
              ) : (
                <p>⚠️ <strong>Challenge:</strong> You need to save RM{monthlySavingsNeeded.toFixed(2)} monthly but only have RM{disposableIncome.toFixed(2)} disposable income. Consider reducing expenses or extending your timeframe.</p>
              )}
              
              {savingsRate < 10 && (
                <p>💡 Your savings rate is {savingsRate.toFixed(1)}%. Financial experts recommend 20% minimum for financial health.</p>
              )}
              
              {current < (expenses * 3) && (
                <p>🚨 Build an emergency fund of RM{(expenses * 6).toFixed(2)} (6 months expenses) before aggressive investing.</p>
              )}
              
              <p>💰 Consider starting with EPF voluntary contributions for guaranteed 6%+ returns and tax benefits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
