import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import CalendarView from './components/Calendar/CalendarView';
import PostCreator from './components/PostCreator/PostCreator';
import EditPostModal from './components/Modals/EditPostModal';
import CreateManagerModal from './components/Modals/CreateManagerModal';
import DeleteConfirmModal from './components/Modals/DeleteConfirmModal';
import SocialMediaIntegration from './components/SocialMedia/SocialMediaIntegration';
import FooterEditor from './components/Website/FooterEditor';
import AIContentGenerator from './components/AI/AIContentGenerator';
import ContentIntelligence from './components/AI/ContentIntelligence';
import AdvancedAnalytics from './components/Analytics/AdvancedAnalytics';
import LandingPage from './components/Auth/LandingPage';
import LoginPage from './components/Auth/LoginPage';
import { User, Post, SocialAccount } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { 
  getAnalyticsForUser, 
  getPostsForUser, 
  getAccountsForUser 
} from './data/mockData';

type AppState = 'landing' | 'login' | 'dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal states
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [showCreateManager, setShowCreateManager] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deleteItem, setDeleteItem] = useState<{ type: string; id: string; name: string } | null>(null);
  const [managerType, setManagerType] = useState<'manager' | 'sub_manager'>('manager');

  // Data management with localStorage
  const [posts, setPosts] = useLocalStorage<Post[]>('socialhub_posts', []);
  const [managers, setManagers] = useLocalStorage<User[]>('socialhub_managers', []);
  const [accounts, setAccounts] = useLocalStorage<SocialAccount[]>('socialhub_accounts', []);
  const [footerSettings, setFooterSettings] = useLocalStorage<any>('socialhub_footer', {
    companyName: 'SocialHub',
    description: 'Professional social media management platform for businesses and agencies.',
    copyright: '© 2024 SocialHub. All rights reserved.',
    sections: [
      {
        id: '1',
        title: 'Product',
        links: [
          { id: '1', label: 'Features', url: '/features', openInNewTab: false },
          { id: '2', label: 'Pricing', url: '/pricing', openInNewTab: false },
          { id: '3', label: 'API', url: '/api', openInNewTab: false },
        ],
      },
      {
        id: '2',
        title: 'Support',
        links: [
          { id: '4', label: 'Help Center', url: '/help', openInNewTab: false },
          { id: '5', label: 'Contact Us', url: '/contact', openInNewTab: false },
        ],
      },
    ],
    socialLinks: {
      facebook: 'https://facebook.com/socialhub',
      twitter: 'https://twitter.com/socialhub',
      linkedin: 'https://linkedin.com/company/socialhub',
      instagram: 'https://instagram.com/socialhub',
    },
    showPoweredBy: true,
  });

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setAppState('dashboard');
    setActiveTab('dashboard');
    
    // Initialize user-specific data if not exists
    if (posts.length === 0) {
      setPosts(getPostsForUser(user.id, user.role));
    }
    if (accounts.length === 0) {
      setAccounts(getAccountsForUser(user.id, user.role));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppState('landing');
    setActiveTab('dashboard');
  };

  // CRUD Functions for Posts
  const handleCreatePost = (postData: any) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content: postData.content,
      platforms: postData.platforms,
      status: postData.scheduledAt ? 'scheduled' : 'published',
      authorId: currentUser?.id || '',
      creditsUsed: postData.platforms.length,
      scheduledAt: postData.scheduledAt,
      publishedAt: postData.scheduledAt ? undefined : new Date(),
      media: postData.media || [],
    };
    setPosts(prev => [newPost, ...prev]);
    
    // Deduct credits
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, credits: (prev.credits || 0) - newPost.creditsUsed } : null);
    }
  };

  const handleEditPost = (postId: string, updates: Partial<Post>) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  // CRUD Functions for Managers
  const handleCreateManager = (managerData: Partial<User>) => {
    const newManager: User = {
      ...managerData,
      id: Date.now().toString(),
      managerId: currentUser?.id,
    } as User;
    setManagers(prev => [...prev, newManager]);
  };

  const handleDeleteManager = (managerId: string) => {
    setManagers(prev => prev.filter(manager => manager.id !== managerId));
  };

  // Social Media Integration Functions
  const handleConnectSocialMedia = (platform: string) => {
    const newAccount: SocialAccount = {
      id: Date.now().toString(),
      platform: platform as any,
      username: `user_${platform}`,
      displayName: `My ${platform.charAt(0).toUpperCase() + platform.slice(1)} Account`,
      isConnected: true,
      followers: Math.floor(Math.random() * 10000) + 1000,
    };
    setAccounts(prev => [...prev, newAccount]);
  };

  const handleDisconnectSocialMedia = (accountId: string) => {
    setAccounts(prev => prev.map(account => 
      account.id === accountId ? { ...account, isConnected: false } : account
    ));
  };

  const handleRefreshSocialMedia = (accountId: string) => {
    setAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? { ...account, followers: Math.floor(Math.random() * 10000) + 1000 }
        : account
    ));
  };

  // Delete confirmation handlers
  const handleDeleteClick = (type: string, id: string, name: string) => {
    setDeleteItem({ type, id, name });
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteItem) return;
    
    switch (deleteItem.type) {
      case 'post':
        handleDeletePost(deleteItem.id);
        break;
      case 'manager':
        handleDeleteManager(deleteItem.id);
        break;
    }
    setDeleteItem(null);
  };

  // Show landing page
  if (appState === 'landing') {
    return <LandingPage onGetStarted={() => setAppState('login')} />;
  }

  // Show login page
  if (appState === 'login') {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onBack={() => setAppState('landing')}
      />
    );
  }

  // Show dashboard (user is logged in)
  if (!currentUser) {
    return <LandingPage onGetStarted={() => setAppState('login')} />;
  }

  // Get user-specific data
  const analytics = getAnalyticsForUser(currentUser.id, currentUser.role);
  const userPosts = posts.length > 0 ? posts : getPostsForUser(currentUser.id, currentUser.role);
  const userAccounts = accounts.length > 0 ? accounts : getAccountsForUser(currentUser.id, currentUser.role);

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      'ai-content': 'AI Content Generator',
      'ai-intelligence': 'AI Content Intelligence',
      'advanced-analytics': 'Advanced Analytics',
      calendar: 'Post Calendar',
      posts: 'Manage Posts',
      analytics: 'Analytics',
      managers: 'Social Media Managers',
      'sub-managers': 'Sub Managers',
      accounts: 'Social Accounts',
      clients: 'Client Management',
      credits: 'Credit Management',
      reports: 'Reports & Analytics',
      website: 'Website Settings',
      settings: 'Settings',
    };
    return titles[activeTab as keyof typeof titles] || 'Dashboard';
  };

  const getPageSubtitle = () => {
    const roleNames = {
      'super_admin': 'Super Admin',
      'social_media_manager': 'Social Media Manager',
      'sub_social_media_manager': 'Sub Social Media Manager',
      'user': 'Client'
    };
    
    const subtitles = {
      dashboard: `Welcome back, ${currentUser.name}! Here's your ${roleNames[currentUser.role as keyof typeof roleNames]} overview`,
      'ai-content': 'Generate engaging content with AI assistance',
      'ai-intelligence': 'AI-powered insights to optimize your social media strategy',
      'advanced-analytics': 'Detailed insights and performance metrics with advanced charts',
      calendar: 'Schedule and manage your content across all platforms',
      posts: currentUser.role === 'user' ? 'View your posts' : 'Create, edit and manage posts',
      analytics: 'Detailed insights and performance metrics',
      managers: 'Create and manage Social Media Managers',
      'sub-managers': 'Create and manage Sub Social Media Managers',
      accounts: 'Configure and manage social media accounts',
      clients: 'Assign clients and social media accounts to sub-managers',
      credits: `Credit management - You have ${currentUser.credits} credits remaining`,
      reports: 'Platform-wide reports and user-based analytics',
      website: 'Customize website appearance and settings',
      settings: 'Manage your account and preferences',
    };
    return subtitles[activeTab as keyof typeof subtitles] || '';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard analytics={analytics} recentPosts={userPosts.slice(0, 5)} />;
      
      case 'ai-content':
        return (
          <AIContentGenerator
            onContentGenerated={(content: string, hashtags: string[], optimalTime: string) => {
              // Store the generated content and show post creator
              console.log('Generated content:', { content, hashtags, optimalTime });
              // You could store this in state and pre-fill the post creator
              alert(`Generated content: "${content.substring(0, 100)}..." \nHashtags: ${hashtags.join(', ')}\nOptimal time: ${optimalTime}`);
            }}
            selectedPlatforms={userAccounts.filter(acc => acc.isConnected).map(acc => acc.platform)}
          />
        );
      
      case 'ai-intelligence':
        return (
          <ContentIntelligence
            onApplySuggestion={(suggestion: any) => {
              console.log('Applied suggestion:', suggestion);
              // You can integrate this with post creation or analytics
            }}
          />
        );
      
      case 'advanced-analytics':
        return (
          <AdvancedAnalytics
            userRole={currentUser.role}
          />
        );
      
      case 'calendar':
        return (
          <CalendarView
            posts={userPosts}
            onDateSelect={(date) => console.log('Date selected:', date)}
            onPostClick={(post) => {
              setEditingPost(post);
              setShowEditPost(true);
            }}
          />
        );
      
      case 'posts':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {currentUser.role === 'user' ? 'My Posts' : 'Manage Posts'}
                </h3>
                <p className="text-text-secondary">
                  {currentUser.role === 'user' 
                    ? 'View your published and scheduled posts'
                    : 'Create, edit, and manage posts across all platforms'
                  }
                </p>
              </div>
              {currentUser.role !== 'user' && (
                <button 
                  onClick={() => setShowPostCreator(true)}
                  className="btn-primary"
                >
                  Create New Post
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="card p-4">
                <h4 className="font-medium text-text-primary mb-2">Draft Posts</h4>
                <p className="text-2xl font-bold text-warning">
                  {userPosts.filter(p => p.status === 'draft').length}
                </p>
              </div>
              <div className="card p-4">
                <h4 className="font-medium text-text-primary mb-2">Scheduled Posts</h4>
                <p className="text-2xl font-bold text-info">
                  {userPosts.filter(p => p.status === 'scheduled').length}
                </p>
              </div>
              <div className="card p-4">
                <h4 className="font-medium text-text-primary mb-2">Published Posts</h4>
                <p className="text-2xl font-bold text-success">
                  {userPosts.filter(p => p.status === 'published').length}
                </p>
              </div>
            </div>
            
            <div className="card">
              <div className="p-6 border-b border-border-light">
                <h4 className="font-semibold text-text-primary">Recent Posts</h4>
              </div>
              <div className="divide-y divide-border-light">
                {userPosts.slice(0, 10).map((post) => (
                  <div key={post.id} className="p-6 flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-text-primary mb-2">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span className={`px-2 py-1 rounded text-xs ${
                          post.status === 'published' ? 'bg-green-100 text-green-700' :
                          post.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {post.status}
                        </span>
                        <span>{post.platforms.join(', ')}</span>
                        <span>{post.creditsUsed} credits</span>
                        {post.scheduledAt && (
                          <span>{new Date(post.scheduledAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    {currentUser.role !== 'user' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setEditingPost(post);
                            setShowEditPost(true);
                          }}
                          className="text-primary-500 hover:text-primary-600 text-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteClick('post', post.id, post.content.substring(0, 50))}
                          className="text-error hover:text-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'managers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Social Media Managers</h3>
                <p className="text-text-secondary">Create and manage Social Media Managers</p>
              </div>
              <button 
                onClick={() => {
                  setManagerType('manager');
                  setShowCreateManager(true);
                }}
                className="btn-primary"
              >
                Create New Manager
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Total Managers</h4>
                <p className="text-3xl font-bold text-primary-500">{managers.filter(m => m.role === 'social_media_manager').length}</p>
                <p className="text-sm text-text-secondary mt-1">Active managers</p>
              </div>
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Credits Allocated</h4>
                <p className="text-3xl font-bold text-success">
                  {managers.reduce((sum, m) => sum + (m.credits || 0), 0).toLocaleString()}
                </p>
                <p className="text-sm text-text-secondary mt-1">Total credits given</p>
              </div>
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Revenue This Month</h4>
                <p className="text-3xl font-bold text-info">$8,920</p>
                <p className="text-sm text-text-secondary mt-1">From credit purchases</p>
              </div>
            </div>

            <div className="card">
              <div className="p-6 border-b border-border-light">
                <h4 className="font-semibold text-text-primary">Manager List</h4>
              </div>
              <div className="divide-y divide-border-light">
                {managers.filter(m => m.role === 'social_media_manager').map((manager) => (
                  <div key={manager.id} className="p-6 flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-text-primary">{manager.name}</h5>
                      <p className="text-sm text-text-secondary">{manager.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{manager.credits} credits</p>
                      <p className="text-xs text-text-secondary">
                        {managers.filter(m => m.managerId === manager.id).length} sub-managers
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-secondary text-sm">Recharge</button>
                      <button 
                        onClick={() => handleDeleteClick('manager', manager.id, manager.name)}
                        className="text-error hover:text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {managers.filter(m => m.role === 'social_media_manager').length === 0 && (
                  <div className="p-6 text-center text-text-secondary">
                    No managers created yet. Click "Create New Manager" to get started.
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'sub-managers':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Sub Social Media Managers</h3>
                <p className="text-text-secondary">Create and manage your sub-managers</p>
              </div>
              <button 
                onClick={() => {
                  setManagerType('sub_manager');
                  setShowCreateManager(true);
                }}
                className="btn-primary"
              >
                Create Sub-Manager
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Active Sub-Managers</h4>
                <p className="text-3xl font-bold text-primary-500">
                  {managers.filter(m => m.role === 'sub_social_media_manager').length}
                </p>
              </div>
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Total Credits</h4>
                <p className="text-3xl font-bold text-success">
                  {managers.filter(m => m.role === 'sub_social_media_manager').reduce((sum, m) => sum + (m.credits || 0), 0)}
                </p>
              </div>
            </div>

            <div className="card">
              <div className="p-6 border-b border-border-light">
                <h4 className="font-semibold text-text-primary">Sub-Manager List</h4>
              </div>
              <div className="divide-y divide-border-light">
                {managers.filter(m => m.role === 'sub_social_media_manager').map((subManager) => (
                  <div key={subManager.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-text-primary">{subManager.name}</h5>
                        <p className="text-sm text-text-secondary">{subManager.email}</p>
                        <p className="text-sm text-text-secondary mt-1">{subManager.credits} credits</p>
                        <div className="mt-2">
                          <p className="text-xs text-text-secondary mb-1">Assigned Clients:</p>
                          <div className="flex gap-1">
                            {(subManager.assignedClients || []).map((client, i) => (
                              <span key={i} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">
                                {client}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn-secondary text-sm">Assign Client</button>
                        <button 
                          onClick={() => handleDeleteClick('manager', subManager.id, subManager.name)}
                          className="text-error hover:text-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {managers.filter(m => m.role === 'sub_social_media_manager').length === 0 && (
                  <div className="p-6 text-center text-text-secondary">
                    No sub-managers created yet. Click "Create Sub-Manager" to get started.
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'accounts':
        return (
          <SocialMediaIntegration
            accounts={userAccounts}
            onConnect={handleConnectSocialMedia}
            onDisconnect={handleDisconnectSocialMedia}
            onRefresh={handleRefreshSocialMedia}
          />
        );

      case 'clients':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Client Management</h3>
                <p className="text-text-secondary">Assign clients and social media accounts to sub-managers</p>
              </div>
              <button className="btn-primary">Add New Client</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Total Clients</h4>
                <p className="text-3xl font-bold text-primary-500">15</p>
              </div>
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Assigned Clients</h4>
                <p className="text-3xl font-bold text-success">12</p>
              </div>
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Unassigned</h4>
                <p className="text-3xl font-bold text-warning">3</p>
              </div>
            </div>

            <div className="card">
              <div className="p-6 border-b border-border-light">
                <h4 className="font-semibold text-text-primary">Client Assignment</h4>
              </div>
              <div className="divide-y divide-border-light">
                {[
                  { name: 'TechCorp Inc.', assignedTo: 'Emily Rodriguez', accounts: ['Facebook', 'Instagram'] },
                  { name: 'Fashion Brand Co.', assignedTo: 'Alex Thompson', accounts: ['Instagram', 'TikTok'] },
                  { name: 'Local Restaurant', assignedTo: 'Unassigned', accounts: ['Facebook'] },
                ].map((client, index) => (
                  <div key={index} className="p-6 flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-text-primary">{client.name}</h5>
                      <p className="text-sm text-text-secondary">
                        Assigned to: <span className={client.assignedTo === 'Unassigned' ? 'text-warning' : 'text-success'}>
                          {client.assignedTo}
                        </span>
                      </p>
                      <div className="mt-1">
                        {client.accounts.map((account, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mr-1">
                            {account}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-secondary text-sm">Reassign</button>
                      <button className="text-primary-500 hover:text-primary-600 text-sm">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-primary">Analytics Dashboard</h3>
            <p className="text-text-secondary mt-2">
              {currentUser.role === 'super_admin' 
                ? 'Platform-wide analytics and revenue insights' 
                : 'Your account performance metrics'}
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-medium text-primary-700">Total Reach</h4>
                <p className="text-2xl font-bold text-primary-600 mt-1">
                  {currentUser.role === 'super_admin' ? '3.2M' : 
                   currentUser.role === 'social_media_manager' ? '245K' : 
                   currentUser.role === 'sub_social_media_manager' ? '89K' : '12K'}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-700">Engagement Rate</h4>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {currentUser.role === 'super_admin' ? '4.2%' : 
                   currentUser.role === 'social_media_manager' ? '5.8%' : 
                   currentUser.role === 'sub_social_media_manager' ? '6.1%' : '7.2%'}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700">Growth Rate</h4>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {currentUser.role === 'super_admin' ? '+18.5%' : 
                   currentUser.role === 'social_media_manager' ? '+12.3%' : 
                   currentUser.role === 'sub_social_media_manager' ? '+9.7%' : '+15.2%'}
                </p>
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Reports & Analytics</h3>
              <p className="text-text-secondary">Platform-wide reports and user-based analytics</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Total Revenue</h4>
                <p className="text-3xl font-bold text-success">$45,230</p>
                <p className="text-sm text-text-secondary mt-1">This month</p>
              </div>
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Active Users</h4>
                <p className="text-3xl font-bold text-primary-500">1,247</p>
                <p className="text-sm text-text-secondary mt-1">All roles</p>
              </div>
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Posts Published</h4>
                <p className="text-3xl font-bold text-info">25,420</p>
                <p className="text-sm text-text-secondary mt-1">Platform total</p>
              </div>
              <div className="card p-6">
                <h4 className="font-medium text-text-primary mb-2">Credits Sold</h4>
                <p className="text-3xl font-bold text-warning">75,230</p>
                <p className="text-sm text-text-secondary mt-1">This month</p>
              </div>
            </div>

            <div className="card p-6">
              <h4 className="font-semibold text-text-primary mb-4">User Activity Report</h4>
              <div className="space-y-4">
                {[
                  { role: 'Social Media Managers', count: 24, posts: 1845, revenue: '$12,450' },
                  { role: 'Sub Social Media Managers', count: 67, posts: 656, revenue: '$3,280' },
                  { role: 'Clients', count: 156, posts: 45, revenue: '$890' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h5 className="font-medium text-text-primary">{item.role}</h5>
                      <p className="text-sm text-text-secondary">{item.count} active users</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-text-primary">{item.posts} posts</p>
                      <p className="text-sm text-success">{item.revenue} revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'website':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Website Customization</h3>
              <p className="text-text-secondary">Customize the platform appearance and settings</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h4 className="font-semibold text-text-primary mb-4">Branding</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Platform Name</label>
                    <input type="text" value="SocialHub" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Logo URL</label>
                    <input type="url" placeholder="https://example.com/logo.png" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">Primary Color</label>
                    <input type="color" value="#2E4A9E" className="input-field h-12" />
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h4 className="font-semibold text-text-primary mb-4">Features</h4>
                <div className="space-y-3">
                  {[
                    { name: 'User Registration', enabled: true },
                    { name: 'Credit System', enabled: true },
                    { name: 'Analytics Dashboard', enabled: true },
                    { name: 'White Label Mode', enabled: false },
                  ].map((feature, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-text-primary">{feature.name}</span>
                      <button className={`px-3 py-1 rounded text-sm ${
                        feature.enabled 
                          ? 'bg-success text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {feature.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h4 className="font-semibold text-text-primary mb-4">Pricing Plans</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Starter', price: '$29', credits: '100' },
                  { name: 'Professional', price: '$79', credits: '300' },
                  { name: 'Enterprise', price: '$199', credits: '1000' },
                ].map((plan, index) => (
                  <div key={index} className="border border-border-light rounded-lg p-4">
                    <h5 className="font-medium text-text-primary">{plan.name}</h5>
                    <p className="text-2xl font-bold text-primary-500">{plan.price}</p>
                    <p className="text-sm text-text-secondary">{plan.credits} credits/month</p>
                    <button className="btn-secondary w-full mt-3 text-sm">Edit Plan</button>
                  </div>
                ))}
              </div>
            </div>

            <FooterEditor
              settings={footerSettings}
              onSave={(settings) => setFooterSettings(settings)}
            />
          </div>
        );

      case 'credits':
        return (
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text-primary">
                {currentUser.role === 'super_admin' ? 'Credit Management System' : 'Credit Balance'}
              </h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="text-3xl font-bold text-primary-500">
                  {currentUser.credits}
                </div>
                <div className="text-text-secondary">credits remaining</div>
              </div>
              {currentUser.role === 'super_admin' && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-success bg-opacity-10 p-4 rounded-lg">
                    <h4 className="font-medium text-success">Credits Sold</h4>
                    <p className="text-2xl font-bold text-success mt-1">75,230</p>
                  </div>
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-medium text-primary-700">Revenue</h4>
                    <p className="text-2xl font-bold text-primary-600 mt-1">$45,230</p>
                  </div>
                  <div className="bg-info bg-opacity-10 p-4 rounded-lg">
                    <h4 className="font-medium text-info">Active Credits</h4>
                    <p className="text-2xl font-bold text-info mt-1">12,450</p>
                  </div>
                </div>
              )}
              {(currentUser.role === 'social_media_manager' || currentUser.role === 'super_admin') && (
                <button className="btn-primary mt-4">
                  {currentUser.role === 'super_admin' ? 'Allocate Credits' : 'Purchase More Credits'}
                </button>
              )}
            </div>
            
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Credit Usage Rates</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Facebook Posts</span>
                  <span className="font-medium">1 credit each</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Instagram Posts</span>
                  <span className="font-medium">1 credit each</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Twitter Posts</span>
                  <span className="font-medium">1 credit each</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>LinkedIn Posts</span>
                  <span className="font-medium">1 credit each</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>TikTok Posts</span>
                  <span className="font-medium">2 credits each</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-text-primary">Account Settings</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
                  <input type="text" value={currentUser.name} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                  <input type="email" value={currentUser.email} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Role</label>
                  <input 
                    type="text" 
                    value={currentUser.role === 'super_admin' ? 'Super Admin' :
                           currentUser.role === 'social_media_manager' ? 'Social Media Manager' :
                           currentUser.role === 'sub_social_media_manager' ? 'Sub Social Media Manager' :
                           'Client'} 
                    className="input-field" 
                    readOnly 
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="btn-primary">Save Changes</button>
                <button 
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <Dashboard analytics={analytics} recentPosts={posts} />;
    }
  };

  return (
    <div className="flex h-screen bg-background-main">
      <Sidebar 
        user={currentUser} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onCreatePost={() => setShowPostCreator(true)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={getPageTitle()} 
          subtitle={getPageSubtitle()} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {showPostCreator && (
        <PostCreator
          accounts={userAccounts}
          onClose={() => setShowPostCreator(false)}
          onSubmit={(postData) => {
            handleCreatePost(postData);
            setShowPostCreator(false);
          }}
        />
      )}

      {showEditPost && editingPost && (
        <EditPostModal
          isOpen={showEditPost}
          onClose={() => {
            setShowEditPost(false);
            setEditingPost(null);
          }}
          onSubmit={(updates) => {
            if (editingPost) {
              handleEditPost(editingPost.id, updates);
            }
            setShowEditPost(false);
            setEditingPost(null);
          }}
          post={editingPost}
          accounts={userAccounts}
        />
      )}

      {showCreateManager && (
        <CreateManagerModal
          isOpen={showCreateManager}
          onClose={() => setShowCreateManager(false)}
          onSubmit={handleCreateManager}
          type={managerType}
        />
      )}

      {showDeleteConfirm && deleteItem && (
        <DeleteConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => {
            setShowDeleteConfirm(false);
            setDeleteItem(null);
          }}
          onConfirm={handleConfirmDelete}
          title={`Delete ${deleteItem.type}`}
          message={`Are you sure you want to delete this ${deleteItem.type}? This action cannot be undone.`}
          itemName={deleteItem.name}
        />
      )}
    </div>
  );
}

export default App;