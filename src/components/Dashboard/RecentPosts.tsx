import React from 'react';
import { ClockIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Post } from '../../types';

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  const getStatusIcon = (status: Post['status']) => {
    switch (status) {
      case 'published':
        return <CheckCircleIcon className="w-5 h-5 text-success" />;
      case 'scheduled':
        return <ClockIcon className="w-5 h-5 text-warning" />;
      case 'failed':
        return <ExclamationCircleIcon className="w-5 h-5 text-error" />;
      default:
        return <ClockIcon className="w-5 h-5 text-text-secondary" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      facebook: 'bg-social-facebook',
      instagram: 'bg-social-instagram',
      twitter: 'bg-social-twitter',
      linkedin: 'bg-social-linkedin',
      tiktok: 'bg-social-tiktok',
    };
    return colors[platform] || 'bg-gray-500';
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-border-light">
        <h3 className="text-lg font-semibold text-text-primary">Recent Posts</h3>
      </div>
      <div className="divide-y divide-border-light">
        {posts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {getStatusIcon(post.status)}
                  <span className="text-sm font-medium capitalize text-text-primary">
                    {post.status}
                  </span>
                  <span className="text-text-secondary text-sm">
                    • {post.creditsUsed} credits
                  </span>
                </div>
                <p className="text-text-primary mb-3 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-2">
                  {post.platforms.map((platform) => (
                    <span
                      key={platform}
                      className={`w-6 h-6 rounded-full ${getPlatformColor(platform)} flex items-center justify-center`}
                      title={platform}
                    >
                      <span className="text-white text-xs font-bold">
                        {platform.charAt(0).toUpperCase()}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right text-sm text-text-secondary ml-4">
                {post.scheduledAt && (
                  <p>{new Date(post.scheduledAt).toLocaleDateString()}</p>
                )}
                {post.publishedAt && (
                  <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;