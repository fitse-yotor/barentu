import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { User } from '../../types';
import { validateCredentials } from '../../data/mockUsers';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = [
    {
      role: 'Super Admin',
      email: 'sarah@socialhub.com',
      description: 'Create managers, recharge credits, customize website',
      color: 'bg-purple-50 border-purple-200 text-purple-700',
    },
    {
      role: 'Social Media Manager',
      email: 'michael@agency.com',
      description: 'Create sub-managers, manage accounts, assign clients',
      color: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      role: 'Sub Social Media Manager',
      email: 'emily@agency.com',
      description: 'View, edit, create posts and manage calendar',
      color: 'bg-green-50 border-green-200 text-green-700',
    },
    {
      role: 'Client',
      email: 'david@company.com',
      description: 'Basic access to assigned accounts',
      color: 'bg-orange-50 border-orange-200 text-orange-700',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = validateCredentials(email, password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password. Please try one of the demo accounts.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-background-main flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Home
          </button>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-500 mb-2">SocialHub</h1>
            <h2 className="text-2xl font-semibold text-text-primary">Welcome back</h2>
            <p className="text-text-secondary mt-2">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-text-secondary" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-text-secondary" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center">
              <a href="#" className="text-primary-500 hover:text-primary-600 text-sm">
                Forgot your password?
              </a>
            </div>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-light" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background-main text-text-secondary">
                  Or try a demo account
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => handleDemoLogin(account.email)}
                  className={`p-4 rounded-lg border-2 text-left hover:shadow-md transition-all ${account.color}`}
                >
                  <div className="font-medium">{account.role}</div>
                  <div className="text-sm opacity-75 mt-1">{account.email}</div>
                  <div className="text-xs opacity-60 mt-1">{account.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Feature Showcase */}
      <div className="hidden lg:flex lg:flex-1 bg-primary-500 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <div className="w-12 h-12 bg-white rounded-lg"></div>
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Streamline Your Social Media Workflow
          </h3>
          <p className="text-primary-100 text-lg leading-relaxed">
            Manage multiple social media accounts, schedule posts, track analytics, 
            and collaborate with your team - all from one powerful dashboard.
          </p>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-primary-100">Multi-platform publishing</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-primary-100">Advanced scheduling</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-primary-100">Team collaboration</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-primary-100">Detailed analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;