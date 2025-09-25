'use client';

import { useState } from 'react';
import Link from 'next/link';
import GoalsModal from './components/GoalsModal';
import FinanceTips from './components/FinanceTips';
import SavingsCalculator from './components/SavingsCalculator';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export default function Home() {
  const [balance] = useState(0.00);
  const [monthlyIncome] = useState(0.00);
  const [monthlyExpenses] = useState(0.00);
  const [showGoals, setShowGoals] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const recentTransactions: Transaction[] = [
    // Your transactions will appear here once you start adding them
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FinanceTracker</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">Dashboard</Link>
              <Link href="/components/transactions" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Transactions</Link>
              <Link href="/components/budget" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Budget</Link>
              <Link href="/components/report" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Reports</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Finance Tracker!</h2>
          <p className="text-gray-600">Ready to start your financial journey? Add your first salary when you receive it in October.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Balance */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Balance</p>
                <p className="text-3xl font-bold text-gray-900">RM{balance.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Monthly Income */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-3xl font-bold text-green-600">+RM{monthlyIncome.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
            </div>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
                <p className="text-3xl font-bold text-red-600">-RM{monthlyExpenses.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentTransactions.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for Your First Salary!</h3>
                <p className="text-gray-500 mb-4">
                  Your financial tracker is set up and ready. When you receive your salary in October, 
                  it will automatically update your balance and you can start tracking your expenses.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Expected Salary:</strong> RM4,875.83 will be added to your balance when you record it.
                  </p>
                </div>
                <Link 
                  href="/components/transactions" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Your First Transaction
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Link>
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.amount > 0 ? (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}RM{Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
              View all transactions →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Add Salary</h4>
            <p className="text-sm text-gray-600">Record your RM4,875.83 salary</p>
          </button>

          <button className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Add Expense</h4>
            <p className="text-sm text-gray-600">Record a new expense transaction</p>
          </button>

          <button 
            onClick={() => setShowCalculator(true)}
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Savings Calculator</h4>
            <p className="text-sm text-gray-600">Plan your financial future</p>
          </button>

          <button 
            onClick={() => setShowGoals(true)}
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left"
          >
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Financial Goals</h4>
            <p className="text-sm text-gray-600">Set and track your financial goals</p>
          </button>
        </div>

        {/* Financial Tips */}
        <FinanceTips />
      </main>
      
      {/* Goals Modal */}
      {showGoals && <GoalsModal onClose={() => setShowGoals(false)} />}
      
      {/* Savings Calculator Modal */}
      {showCalculator && <SavingsCalculator onClose={() => setShowCalculator(false)} />}
    </div>
  );
}