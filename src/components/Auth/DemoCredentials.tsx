import React from 'react';
import { UserIcon, ShieldCheckIcon, UsersIcon, PencilIcon } from '@heroicons/react/24/outline';

const DemoCredentials: React.FC = () => {
  const accounts = [
    {
      role: 'Super Admin',
      email: 'sarah@socialhub.com',
      password: 'demo123',
      icon: ShieldCheckIcon,
      description: 'Create managers, recharge credits, customize website, system settings',
      features: ['Create SM Managers', 'Credit Management', 'Website Customization', 'System Reports'],
      color: 'bg-purple-50 border-purple-200 text-purple-700',
    },
    {
      role: 'Social Media Manager',
      email: 'michael@agency.com',
      password: 'demo123',
      icon: UsersIcon,
      description: 'Create sub-managers, manage accounts, create posts, assign clients',
      features: ['Create Sub-Managers', 'Account Configuration', 'Post Management', 'Client Assignment'],
      color: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      role: 'Sub Social Media Manager',
      email: 'emily@agency.com',
      password: 'demo123',
      icon: UserIcon,
      description: 'View, edit, create posts and manage post calendar for assigned accounts',
      features: ['View Posts', 'Edit Posts', 'Create Posts', 'Post Calendar'],
      color: 'bg-green-50 border-green-200 text-green-700',
    },
    {
      role: 'Client',
      email: 'david@company.com',
      password: 'demo123',
      icon: PencilIcon,
      description: 'Basic access to assigned social media accounts',
      features: ['View Posts', 'Basic Dashboard', 'Account Access', 'Limited Features'],
      color: 'bg-orange-50 border-orange-200 text-orange-700',
    },
  ];

  return (
    <div className="mt-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Demo Accounts</h3>
        <p className="text-text-secondary text-sm mt-1">
          Try different user roles to see how the interface adapts
        </p>
      </div>
      
      <div className="space-y-4">
        {accounts.map((account, index) => {
          const Icon = account.icon;
          return (
            <div key={index} className={`p-4 rounded-lg border-2 ${account.color}`}>
              <div className="flex items-start gap-3">
                <Icon className="w-6 h-6 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{account.role}</h4>
                    <span className="text-xs font-mono bg-white bg-opacity-50 px-2 py-1 rounded">
                      {account.password}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1">{account.email}</p>
                  <p className="text-xs opacity-75 mb-3">{account.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {account.features.map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-text-secondary text-center">
          💡 <strong>Tip:</strong> Each role shows different data, features, and navigation options. 
          Password is "demo123" for all accounts.
        </p>
      </div>
    </div>
  );
};

export default DemoCredentials;