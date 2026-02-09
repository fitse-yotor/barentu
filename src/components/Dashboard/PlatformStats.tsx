import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PlatformStatsProps {
  data: Array<{
    platform: string;
    posts: number;
    engagement: number;
  }>;
}

const PlatformStats: React.FC<PlatformStatsProps> = ({ data }) => {
  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      facebook: '#1877F2',
      instagram: '#E1306C',
      twitter: '#111827',
      linkedin: '#0A66C2',
      tiktok: '#000000',
    };
    return colors[platform] || '#6B7280';
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Platform Performance</h3>
        <p className="text-text-secondary text-sm mt-1">Posts published this month</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="platform" 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
            />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Bar 
              dataKey="posts" 
              fill="#2E4A9E"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        {data.map((item) => (
          <div key={item.platform} className="text-center">
            <div 
              className="w-4 h-4 rounded-full mx-auto mb-2"
              style={{ backgroundColor: getPlatformColor(item.platform) }}
            />
            <p className="text-sm font-medium text-text-primary capitalize">{item.platform}</p>
            <p className="text-xs text-text-secondary">{item.posts} posts</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformStats;