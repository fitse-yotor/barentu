import React from 'react';
import { 
  HomeIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  CogIcon,
  UsersIcon,
  CreditCardIcon,
  PlusIcon,
  DocumentTextIcon,
  SparklesIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { User } from '../../types';

interface SidebarProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreatePost?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, onTabChange, onCreatePost }) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    ];

    // Super Admin menu items
    if (user.role === 'super_admin') {
      return [
        ...baseItems,
        { id: 'ai-content', label: 'AI Content Generator', icon: SparklesIcon },
        { id: 'ai-intelligence', label: 'AI Intelligence', icon: LightBulbIcon },
        { id: 'advanced-analytics', label: 'Advanced Analytics', icon: ChartBarIcon },
        { id: 'managers', label: 'Social Media Managers', icon: UsersIcon },
        { id: 'credits', label: 'Credit Management', icon: CreditCardIcon },
        { id: 'reports', label: 'Reports & Analytics', icon: ChartBarIcon },
        { id: 'website', label: 'Website Settings', icon: CogIcon },
        { id: 'settings', label: 'System Settings', icon: CogIcon },
      ];
    }

    // Social Media Manager menu items
    if (user.role === 'social_media_manager') {
      return [
        ...baseItems,
        { id: 'ai-content', label: 'AI Content Generator', icon: SparklesIcon },
        { id: 'ai-intelligence', label: 'AI Intelligence', icon: LightBulbIcon },
        { id: 'calendar', label: 'Post Calendar', icon: CalendarIcon },
        { id: 'posts', label: 'Manage Posts', icon: DocumentTextIcon },
        { id: 'advanced-analytics', label: 'Advanced Analytics', icon: ChartBarIcon },
        { id: 'sub-managers', label: 'Sub Managers', icon: UsersIcon },
        { id: 'accounts', label: 'Social Accounts', icon: CogIcon },
        { id: 'clients', label: 'Client Management', icon: UsersIcon },
        { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
        { id: 'settings', label: 'Settings', icon: CogIcon },
      ];
    }

    // Sub Social Media Manager menu items
    if (user.role === 'sub_social_media_manager') {
      return [
        ...baseItems,
        { id: 'ai-content', label: 'AI Content Generator', icon: SparklesIcon },
        { id: 'ai-intelligence', label: 'AI Intelligence', icon: LightBulbIcon },
        { id: 'calendar', label: 'Post Calendar', icon: CalendarIcon },
        { id: 'posts', label: 'Manage Posts', icon: DocumentTextIcon },
        { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
        { id: 'settings', label: 'Settings', icon: CogIcon },
      ];
    }

    // User (Client) menu items
    return [
      ...baseItems,
      { id: 'posts', label: 'My Posts', icon: DocumentTextIcon },
      { id: 'settings', label: 'Settings', icon: CogIcon },
    ];
  };

  const menuItems = getMenuItems();

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      'super_admin': 'Super Admin',
      'social_media_manager': 'Social Media Manager',
      'sub_social_media_manager': 'Sub Manager',
      'user': 'Client'
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

  return (
    <div className="w-64 bg-background-card border-r border-border-light h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border-light">
        <h1 className="text-xl font-bold text-primary-500">SocialHub</h1>
        <p className="text-sm text-text-secondary mt-1">Social Media Manager</p>
      </div>

      {/* Create Post Button */}
      <div className="p-4">
        <button 
          onClick={onCreatePost}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Create Post
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-500'
                      : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-border-light">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
            <p className="text-xs text-text-secondary">{getRoleDisplayName(user.role)}</p>
          </div>
        </div>
        {user.credits !== undefined && (
          <div className="mt-2 text-xs text-text-secondary">
            Credits: <span className="font-medium text-primary-500">{user.credits}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;