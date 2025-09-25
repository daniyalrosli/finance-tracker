'use client';

import { useState } from 'react';

interface FinancialGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: 'emergency' | 'vacation' | 'house' | 'car' | 'investment' | 'other';
  color: string;
}

interface Props {
  onClose: () => void;
}

export default function GoalsModal({ onClose }: Props) {
  const [goals, setGoals] = useState<FinancialGoal[]>([
    {
      id: 1,
      name: 'Emergency Fund',
      targetAmount: 15000,
      currentAmount: 3200,
      deadline: '2026-03-01',
      category: 'emergency',
      color: 'bg-red-500'
    },
    {
      id: 2,
      name: 'Japan Vacation',
      targetAmount: 8000,
      currentAmount: 1500,
      deadline: '2025-12-31',
      category: 'vacation',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'House Down Payment',
      targetAmount: 50000,
      currentAmount: 12000,
      deadline: '2027-06-01',
      category: 'house',
      color: 'bg-green-500'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: 'other' as FinancialGoal['category']
  });

  const categoryColors = {
    emergency: 'bg-red-500',
    vacation: 'bg-blue-500',
    house: 'bg-green-500',
    car: 'bg-yellow-500',
    investment: 'bg-purple-500',
    other: 'bg-gray-500'
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const goal: FinancialGoal = {
      id: Date.now(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount || '0'),
      deadline: newGoal.deadline,
      category: newGoal.category,
      color: categoryColors[newGoal.category]
    };
    setGoals([...goals, goal]);
    setNewGoal({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
      category: 'other'
    });
    setShowAddForm(false);
  };

  const updateGoalProgress = (goalId: number, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: Math.max(0, goal.currentAmount + amount) }
        : goal
    ));
  };

  const deleteGoal = (goalId: number) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getTimeRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day';
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${Math.floor(diffDays / 365)} years`;
  };

  const getMonthlySavingsNeeded = (goal: FinancialGoal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const monthsRemaining = Math.max(1, Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)));
    return remaining / monthsRemaining;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Financial Goals</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Add Goal
              </button>
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
        </div>

        <div className="p-6">
          {/* Add Goal Form */}
          {showAddForm && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <form onSubmit={handleAddGoal} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
                  <input
                    type="text"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Emergency Fund"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value as FinancialGoal['category']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="emergency">Emergency Fund</option>
                    <option value="vacation">Vacation</option>
                    <option value="house">House/Property</option>
                    <option value="car">Car/Vehicle</option>
                    <option value="investment">Investment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount (RM)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10000.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Amount (RM)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex items-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Goal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Goals List */}
          <div className="space-y-4">
            {goals.map((goal) => {
              const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
              const timeRemaining = getTimeRemaining(goal.deadline);
              const monthlySavingsNeeded = getMonthlySavingsNeeded(goal);

              return (
                <div key={goal.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${goal.color}`}></div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{goal.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress: RM{goal.currentAmount.toFixed(2)} / RM{goal.targetAmount.toFixed(2)}</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${goal.color} transition-all duration-300`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Time Remaining</p>
                      <p className="font-semibold text-gray-900">{timeRemaining}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Monthly Savings Needed</p>
                      <p className="font-semibold text-gray-900">RM{monthlySavingsNeeded.toFixed(2)}</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Remaining Amount</p>
                      <p className="font-semibold text-gray-900">RM{(goal.targetAmount - goal.currentAmount).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateGoalProgress(goal.id, 100)}
                      className="flex-1 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      +RM100
                    </button>
                    <button
                      onClick={() => updateGoalProgress(goal.id, 50)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      +RM50
                    </button>
                    <button
                      onClick={() => updateGoalProgress(goal.id, -50)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      -RM50
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {goals.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">No financial goals yet</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Your First Goal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
