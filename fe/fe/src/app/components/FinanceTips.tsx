'use client';

import { useState } from 'react';

interface FinanceTip {
  id: number;
  category: 'saving' | 'investing' | 'budgeting' | 'debt' | 'malaysia';
  title: string;
  description: string;
  actionable: string;
  impact: 'low' | 'medium' | 'high';
}

export default function FinanceTips() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const tips: FinanceTip[] = [
    {
      id: 1,
      category: 'malaysia',
      title: 'Maximize EPF Contributions',
      description: 'With your RM4,875.83 salary, consider voluntary EPF contributions to reduce tax and build retirement wealth.',
      actionable: 'Add RM200-500 monthly to Account 1 for tax benefits and 6% dividend.',
      impact: 'high'
    },
    {
      id: 2,
      category: 'saving',
      title: 'Build Emergency Fund First',
      description: 'Aim for 6 months of expenses (RM14,732 based on your current spending).',
      actionable: 'Save RM1,200 monthly to reach this goal in 12 months.',
      impact: 'high'
    },
    {
      id: 3,
      category: 'investing',
      title: 'Start Unit Trust Investment',
      description: 'Malaysian unit trusts offer professional management and diversification.',
      actionable: 'Begin with RM200/month in a balanced fund or Amanah Saham.',
      impact: 'medium'
    },
    {
      id: 4,
      category: 'budgeting',
      title: 'Use 50/30/20 Rule',
      description: 'Allocate 50% for needs, 30% wants, 20% savings from your RM4,875.83 income.',
      actionable: 'Needs: RM2,438, Wants: RM1,463, Savings: RM975',
      impact: 'high'
    },
    {
      id: 5,
      category: 'malaysia',
      title: 'Take Advantage of Tax Relief',
      description: 'Malaysia offers various tax reliefs including EPF, insurance, and medical expenses.',
      actionable: 'Claim up to RM9,000 EPF relief and RM3,000 life insurance relief.',
      impact: 'medium'
    },
    {
      id: 6,
      category: 'debt',
      title: 'Pay Off High-Interest Debt First',
      description: 'Credit card debt (18% interest) should be priority over other investments.',
      actionable: 'Pay minimum on all debts, extra payments on highest interest rate.',
      impact: 'high'
    },
    {
      id: 7,
      category: 'investing',
      title: 'Consider Robo-Advisors',
      description: 'StashAway, Wahed Invest offer automated investing with low fees.',
      actionable: 'Start with RM100/month after emergency fund is established.',
      impact: 'medium'
    },
    {
      id: 8,
      category: 'saving',
      title: 'Use High-Yield Savings Account',
      description: 'Islamic and conventional banks offer competitive savings rates.',
      actionable: 'Compare rates from Maybank, CIMB, Public Bank for best returns.',
      impact: 'low'
    },
    {
      id: 9,
      category: 'budgeting',
      title: 'Track Every Ringgit',
      description: 'Small expenses like daily coffee (RM5) add up to RM1,825 yearly.',
      actionable: 'Use this app to log all transactions and review weekly.',
      impact: 'medium'
    },
    {
      id: 10,
      category: 'malaysia',
      title: 'Understand SOCSO Benefits',
      description: 'Your SOCSO contributions provide disability and survivor benefits.',
      actionable: 'Keep contributions current and understand claim procedures.',
      impact: 'low'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Tips', icon: '💡' },
    { value: 'malaysia', label: 'Malaysia Specific', icon: '🇲🇾' },
    { value: 'saving', label: 'Saving', icon: '💰' },
    { value: 'investing', label: 'Investing', icon: '📈' },
    { value: 'budgeting', label: 'Budgeting', icon: '📊' },
    { value: 'debt', label: 'Debt Management', icon: '💳' }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return '🔥';
      case 'medium': return '⭐';
      case 'low': return '💡';
      default: return '💡';
    }
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">💡 Personalized Finance Tips</h3>
        <span className="text-sm text-gray-500">Based on your RM4,875.83 income</span>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTips.map((tip) => (
          <div key={tip.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900 text-sm">{tip.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(tip.impact)}`}>
                {getImpactIcon(tip.impact)} {tip.impact.charAt(0).toUpperCase() + tip.impact.slice(1)}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{tip.description}</p>
            
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Action:</span> {tip.actionable}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tips available for this category.</p>
        </div>
      )}

      {/* Malaysian Financial Resources */}
      <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
        <h4 className="font-semibold text-gray-900 mb-3">🇲🇾 Useful Malaysian Financial Resources</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Government Services</h5>
            <ul className="space-y-1 text-gray-600">
              <li>• EPF i-Invest for unit trust investments</li>
              <li>• KWSP i-Sinar for emergency withdrawals</li>
              <li>• e-Filing for tax returns (LHDN)</li>
              <li>• MyEG for government payments</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Investment Platforms</h5>
            <ul className="space-y-1 text-gray-600">
              <li>• Amanah Saham Bumiputera (ASB)</li>
              <li>• StashAway Malaysia</li>
              <li>• Wahed Invest (Islamic)</li>
              <li>• Rakuten Trade</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
