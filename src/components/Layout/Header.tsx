import React from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-background-card border-b border-border-light px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
          {subtitle && (
            <p className="text-text-secondary mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search posts, accounts..."
              className="input-field pl-10 w-80"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;