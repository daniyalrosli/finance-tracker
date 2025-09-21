'use client';

import { useState } from 'react';

export default function Home() {
  const [balance] = useState(12450.75);
  const [monthlyIncome] = useState(5200.00);
  const [monthlyExpenses] = useState(3850.25);

  const recentTransactions = [
    { id: 1, description: 'Grocery Store', amount: -85.40, date: '2025-09-20', category: 'Food' },
    { id: 2, description: 'Salary Deposit', amount: 2600.00, date: '2025-09-19', category: 'Income' },
    { id: 3, description: 'Electric Bill', amount: -120.75, date: '2025-09-18', category: 'Utilities' },
    { id: 4, description: 'Coffee Shop', amount: -12.50, date: '2025-09-17', category: 'Food' },
    { id: 5, description: 'Gas Station', amount: -65.00, date: '2025-09-16', category: 'Transportation' },
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
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Dashboard</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Transactions</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Budget</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Reports</a>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Here&apos;s an overview of your financial activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Current Balance */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Balance</p>
                <p className="text-3xl font-bold text-gray-900">${balance.toLocaleString()}</p>
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
                <p className="text-3xl font-bold text-green-600">+${monthlyIncome.toLocaleString()}</p>
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
                <p className="text-3xl font-bold text-red-600">-${monthlyExpenses.toLocaleString()}</p>
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
            {recentTransactions.map((transaction) => (
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
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
            <h4 className="font-semibold text-gray-900 mb-1">Add Income</h4>
            <p className="text-sm text-gray-600">Record a new income transaction</p>
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

          <button className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">View Reports</h4>
            <p className="text-sm text-gray-600">Analyze your spending patterns</p>
          </button>

          <button className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow text-left">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 0v1m-2 0V6a2 2 0 00-2 0v1m2 0a2 2 0 012 2v0a2 2 0 01-2 2m0 0a2 2 0 01-2-2v0a2 2 0 012-2m0 0V9" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Set Budget</h4>
            <p className="text-sm text-gray-600">Create and manage budgets</p>
          </button>
        </div>
      </main>
    </div>
  );
}