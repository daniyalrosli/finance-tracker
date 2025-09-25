'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  // const [selectedYear] = useState('2025');

  const monthlyData: MonthlyData[] = [
    // Your monthly data will appear here as you use the app
  ];

  const categorySpending: CategorySpending[] = [
    // Your spending by category will appear here as you add transactions
  ];

  // const totalExpenses = categorySpending.reduce((sum, cat) => sum + cat.amount, 0);
  const avgMonthlyIncome = monthlyData.reduce((sum, month) => sum + month.income, 0) / monthlyData.length;
  const avgMonthlyExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0) / monthlyData.length;
  const avgMonthlySavings = monthlyData.reduce((sum, month) => sum + month.savings, 0) / monthlyData.length;
  const savingsRate = (avgMonthlySavings / avgMonthlyIncome) * 100;

  const getFinancialHealth = () => {
    if (savingsRate >= 20) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (savingsRate >= 15) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (savingsRate >= 10) return { status: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { status: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const healthStatus = getFinancialHealth();

  const getSpendingTrend = () => {
    const recentMonths = monthlyData.slice(-2);
    if (recentMonths.length < 2) return { trend: 'stable', change: 0 };
    
    const change = ((recentMonths[1].expenses - recentMonths[0].expenses) / recentMonths[0].expenses) * 100;
    if (change > 5) return { trend: 'increasing', change };
    if (change < -5) return { trend: 'decreasing', change };
    return { trend: 'stable', change };
  };

  const spendingTrend = getSpendingTrend();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800 mr-4">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="12months">Last 12 Months</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Financial Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Monthly Income</h3>
            <p className="text-2xl font-bold text-gray-900">RM{avgMonthlyIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Monthly Expenses</h3>
            <p className="text-2xl font-bold text-red-600">RM{avgMonthlyExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Monthly Savings</h3>
            <p className="text-2xl font-bold text-green-600">RM{avgMonthlySavings.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Savings Rate</h3>
            <p className={`text-2xl font-bold ${healthStatus.color}`}>{savingsRate.toFixed(1)}%</p>
          </div>
        </div>

        {/* Financial Health Status */}
        <div className={`${healthStatus.bgColor} border border-opacity-20 rounded-xl p-6 mb-8`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Health Status</h3>
              <p className={`text-xl font-bold ${healthStatus.color}`}>{healthStatus.status}</p>
              <p className="text-sm text-gray-600 mt-2">
                Your savings rate of {savingsRate.toFixed(1)}% shows your financial discipline. 
                {savingsRate >= 20 ? ' Excellent work!' : 
                 savingsRate >= 15 ? ' You&apos;re doing well, aim for 20%.' : 
                 savingsRate >= 10 ? ' Consider reducing expenses to save more.' :
                 ' Focus on cutting expenses and increasing savings.'}
              </p>
            </div>
            <div className="text-right">
              <div className={`w-16 h-16 rounded-full ${healthStatus.color.replace('text-', 'bg-')} bg-opacity-20 flex items-center justify-center`}>
                {healthStatus.status === 'Excellent' ? '🎉' :
                 healthStatus.status === 'Good' ? '👍' :
                 healthStatus.status === 'Fair' ? '⚠️' : '⚡'}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Income vs Expenses Trend</h3>
          <div className="space-y-4">
            {monthlyData.map((month, index) => {
              const maxAmount = Math.max(...monthlyData.map(m => Math.max(m.income, m.expenses)));
              const incomeWidth = (month.income / maxAmount) * 100;
              const expenseWidth = (month.expenses / maxAmount) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{month.month}</span>
                    <span className="text-sm text-gray-500">
                      Saved: RM{month.savings.toFixed(2)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-600 w-16">Income</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${incomeWidth}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-20">RM{month.income.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-red-600 w-16">Expenses</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${expenseWidth}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-20">RM{month.expenses.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Spending by Category */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h3>
            <div className="space-y-4">
              {categorySpending.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{category.category}</span>
                    </div>
                    <span className="text-sm text-gray-500">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color} transition-all duration-300`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>RM{category.amount.toFixed(2)}</span>
                    <span>{((category.amount / avgMonthlyIncome) * 100).toFixed(1)}% of income</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spending Insights */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending Insights</h3>
            <div className="space-y-6">
              {/* Spending Trend */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Spending Trend</h4>
                <div className="flex items-center space-x-2">
                  {spendingTrend.trend === 'increasing' ? (
                    <span className="text-red-600">📈 Increasing</span>
                  ) : spendingTrend.trend === 'decreasing' ? (
                    <span className="text-green-600">📉 Decreasing</span>
                  ) : (
                    <span className="text-blue-600">➡️ Stable</span>
                  )}
                  <span className="text-sm text-gray-600">
                    {Math.abs(spendingTrend.change).toFixed(1)}% vs last month
                  </span>
                </div>
              </div>

              {/* Top Spending Category */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Highest Spending</h4>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{categorySpending[0].category}</span> accounts for{' '}
                  <span className="font-semibold">{categorySpending[0].percentage}%</span> of your expenses
                </p>
              </div>

              {/* Recommendations */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Recommendations</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {savingsRate < 20 && (
                    <li>• Try to increase your savings rate to 20% (RM{(avgMonthlyIncome * 0.2).toFixed(2)})</li>
                  )}
                  {categorySpending[0].percentage > 30 && (
                    <li>• Consider reducing spending on {categorySpending[0].category.toLowerCase()}</li>
                  )}
                  <li>• Set up automated transfers to your emergency fund</li>
                  <li>• Review and negotiate your utility bills annually</li>
                  {avgMonthlyExpenses > avgMonthlyIncome * 0.8 && (
                    <li>• Your expenses are high - look for areas to cut back</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Summary */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Goals & Targets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Emergency Fund Goal</h4>
              <p className="text-2xl font-bold text-green-600 mb-1">
                RM{(avgMonthlyExpenses * 6).toFixed(2)}
              </p>
              <p className="text-sm text-green-700">6 months of expenses</p>
              <p className="text-xs text-green-600 mt-2">
                Save RM{((avgMonthlyExpenses * 6) / 12).toFixed(2)}/month for 1 year
              </p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Retirement Savings</h4>
              <p className="text-2xl font-bold text-blue-600 mb-1">
                RM{(avgMonthlyIncome * 0.1).toFixed(2)}
              </p>
              <p className="text-sm text-blue-700">10% of income (recommended)</p>
              <p className="text-xs text-blue-600 mt-2">
                Including EPF contributions
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Investment Target</h4>
              <p className="text-2xl font-bold text-purple-600 mb-1">
                RM{(avgMonthlySavings * 0.7).toFixed(2)}
              </p>
              <p className="text-sm text-purple-700">70% of savings for investments</p>
              <p className="text-xs text-purple-600 mt-2">
                Consider low-cost index funds
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
