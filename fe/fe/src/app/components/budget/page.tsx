'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BudgetCategory {
  id: number;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
}

export default function BudgetPage() {
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    { id: 1, name: 'Food & Groceries', budgeted: 800, spent: 0, color: 'bg-blue-500' },
    { id: 2, name: 'Transportation', budgeted: 300, spent: 0, color: 'bg-green-500' },
    { id: 3, name: 'Utilities', budgeted: 400, spent: 0, color: 'bg-yellow-500' },
    { id: 4, name: 'Entertainment', budgeted: 200, spent: 0, color: 'bg-purple-500' },
    { id: 5, name: 'Shopping', budgeted: 300, spent: 0, color: 'bg-pink-500' },
    { id: 6, name: 'Healthcare', budgeted: 150, spent: 0, color: 'bg-red-500' },
    { id: 7, name: 'Savings', budgeted: 1000, spent: 0, color: 'bg-indigo-500' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BudgetCategory | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    budgeted: '',
    color: 'bg-blue-500'
  });

  const monthlyIncome = 4875.83;
  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = monthlyIncome - totalBudgeted;

  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
    'bg-pink-500', 'bg-red-500', 'bg-indigo-500', 'bg-gray-500'
  ];

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const category: BudgetCategory = {
      id: Date.now(),
      name: newCategory.name,
      budgeted: parseFloat(newCategory.budgeted),
      spent: 0,
      color: newCategory.color
    };
    setBudgetCategories([...budgetCategories, category]);
    setNewCategory({ name: '', budgeted: '', color: 'bg-blue-500' });
    setShowAddForm(false);
  };

  const handleEditCategory = (category: BudgetCategory) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      budgeted: category.budgeted.toString(),
      color: category.color
    });
    setShowAddForm(true);
  };

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setBudgetCategories(budgetCategories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: newCategory.name, budgeted: parseFloat(newCategory.budgeted), color: newCategory.color }
          : cat
      ));
      setEditingCategory(null);
      setNewCategory({ name: '', budgeted: '', color: 'bg-blue-500' });
      setShowAddForm(false);
    }
  };

  const deleteCategory = (id: number) => {
    setBudgetCategories(budgetCategories.filter(cat => cat.id !== id));
  };

  const getProgressPercentage = (spent: number, budgeted: number) => {
    return budgeted > 0 ? (spent / budgeted) * 100 : 0;
  };

  const getStatusColor = (spent: number, budgeted: number) => {
    const percentage = getProgressPercentage(spent, budgeted);
    if (percentage >= 100) return 'text-red-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Budget Planning</h1>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add Category
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Monthly Income</h3>
            <p className="text-2xl font-bold text-gray-900">RM{monthlyIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Budgeted</h3>
            <p className="text-2xl font-bold text-blue-600">RM{totalBudgeted.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Spent</h3>
            <p className="text-2xl font-bold text-red-600">RM{totalSpent.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Remaining</h3>
            <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              RM{remaining.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Budget Progress Chart */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Budget vs Spending Overview</h3>
          <div className="space-y-4">
            {budgetCategories.map((category) => {
              const percentage = getProgressPercentage(category.spent, category.budgeted);
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">
                      RM{category.spent.toFixed(2)} / RM{category.budgeted.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color} transition-all duration-300`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={getStatusColor(category.spent, category.budgeted)}>
                      {percentage.toFixed(1)}% used
                    </span>
                    <span className="text-gray-500">
                      RM{(category.budgeted - category.spent).toFixed(2)} remaining
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Budget Categories */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Budget Categories</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {budgetCategories.map((category) => {
              const percentage = getProgressPercentage(category.spent, category.budgeted);
              const isOverBudget = percentage > 100;
              
              return (
                <div key={category.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-500">
                          {isOverBudget ? (
                            <span className="text-red-600">Over budget by RM{(category.spent - category.budgeted).toFixed(2)}</span>
                          ) : (
                            <span>RM{(category.budgeted - category.spent).toFixed(2)} remaining</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          RM{category.spent.toFixed(2)} / RM{category.budgeted.toFixed(2)}
                        </p>
                        <p className={`text-sm ${getStatusColor(category.spent, category.budgeted)}`}>
                          {percentage.toFixed(1)}%
                        </p>
                      </div>
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Budget Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Budget Tips for Malaysia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">50/30/20 Rule</h4>
              <p className="text-sm text-blue-700">
                50% for needs (RM2,437.92), 30% for wants (RM1,462.75), 20% for savings (RM975.17)
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">Emergency Fund</h4>
              <p className="text-sm text-blue-700">
                Aim to save 6 months of expenses (approximately RM14,627.49)
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">Food Budget</h4>
              <p className="text-sm text-blue-700">
                Malaysians typically spend 15-25% of income on food (RM731-1,219)
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-800">Transportation</h4>
              <p className="text-sm text-blue-700">
                Budget 10-15% for transport including fuel, tolls, and maintenance
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Category Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
            </div>
            <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Amount (RM)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newCategory.budgeted}
                  onChange={(e) => setNewCategory({...newCategory, budgeted: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewCategory({...newCategory, color})}
                      className={`w-10 h-10 rounded-lg ${color} ${
                        newCategory.color === color ? 'ring-2 ring-gray-400' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', budgeted: '', color: 'bg-blue-500' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingCategory ? 'Update' : 'Add'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
