import React from 'react';
import { 
  DocumentTextIcon, 
  CalendarIcon, 
  ChartBarIcon,
  CreditCardIcon 
} from '@heroicons/react/24/outline';
import StatsCard from '../components/Dashboard/StatsCard';
import RecentPosts from '../components/Dashboard/RecentPosts';
import PlatformStats from '../components/Dashboard/PlatformStats';
import { Analytics, Post } from '../types';

interface DashboardProps {
  analytics: Analytics;
  recentPosts: Post[];
}

const Dashboard: React.FC<DashboardProps> = ({ analytics, recentPosts }) => {
  const platformData = Object.entries(analytics.platformStats).map(([platform, posts]) => ({
    platform,
    posts,
    engagement: Math.floor(Math.random() * 100), // Mock engagement data
  }));

  return (
    <div className="space-y-6">
      {/* AI Features Announcement */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🤖</span>
          <h3 className="text-xl font-bold">New AI Features Available!</h3>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
            NEW
          </span>
        </div>
        <p className="text-purple-100 mb-4">
          Boost your social media strategy with AI-powered content generation and intelligent insights.
        </p>
        <div className="flex gap-3">
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
            Try AI Content Generator
          </button>
          <button className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-colors">
            Explore AI Intelligence
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Posts"
          value={analytics.totalPosts}
          change={{ value: 12, type: 'increase' }}
          icon={DocumentTextIcon}
          color="primary"
        />
        <StatsCard
          title="Scheduled Posts"
          value={analytics.scheduledPosts}
          change={{ value: 8, type: 'increase' }}
          icon={CalendarIcon}
          color="warning"
        />
        <StatsCard
          title="Published Posts"
          value={analytics.publishedPosts}
          change={{ value: 15, type: 'increase' }}
          icon={ChartBarIcon}
          color="success"
        />
        <StatsCard
          title="Credits Remaining"
          value={analytics.creditsRemaining}
          change={{ value: 5, type: 'decrease' }}
          icon={CreditCardIcon}
          color="info"
        />
      </div>

      {/* Charts and Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlatformStats data={platformData} />
        <RecentPosts posts={recentPosts} />
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="btn-primary flex items-center justify-center gap-2 py-3">
            <DocumentTextIcon className="w-5 h-5" />
            Create Post
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2 py-3">
            <CalendarIcon className="w-5 h-5" />
            View Calendar
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600">
            <span className="text-lg">🤖</span>
            AI Content Generator
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2 py-3">
            <ChartBarIcon className="w-5 h-5" />
            Advanced Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;