import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { SocialAccount } from '../../types';

interface SocialMediaIntegrationProps {
  accounts: SocialAccount[];
  onConnect: (platform: string) => void;
  onDisconnect: (accountId: string) => void;
  onRefresh: (accountId: string) => void;
}

const SocialMediaIntegration: React.FC<SocialMediaIntegrationProps> = ({
  accounts,
  onConnect,
  onDisconnect,
  onRefresh
}) => {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = async (platform: string) => {
    setConnecting(platform);
    
    // Simulate API connection process
    try {
      // In a real app, this would redirect to OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      onConnect(platform);
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setConnecting(null);
    }
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      platform: 'facebook',
      color: 'bg-social-facebook',
      description: 'Connect your Facebook pages and groups',
      features: ['Post to pages', 'Schedule content', 'View insights'],
      apiEndpoint: 'https://graph.facebook.com/v18.0',
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    },
    {
      name: 'Instagram',
      platform: 'instagram',
      color: 'bg-social-instagram',
      description: 'Connect your Instagram business account',
      features: ['Post photos/videos', 'Stories', 'Reels', 'Analytics'],
      apiEndpoint: 'https://graph.instagram.com/v18.0',
      authUrl: 'https://api.instagram.com/oauth/authorize',
    },
    {
      name: 'Twitter/X',
      platform: 'twitter',
      color: 'bg-social-twitter',
      description: 'Connect your Twitter/X account',
      features: ['Tweet', 'Thread posting', 'Analytics', 'Engagement'],
      apiEndpoint: 'https://api.twitter.com/2',
      authUrl: 'https://twitter.com/i/oauth2/authorize',
    },
    {
      name: 'LinkedIn',
      platform: 'linkedin',
      color: 'bg-social-linkedin',
      description: 'Connect your LinkedIn profile or company page',
      features: ['Professional posts', 'Company updates', 'Analytics'],
      apiEndpoint: 'https://api.linkedin.com/v2',
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    },
    {
      name: 'TikTok',
      platform: 'tiktok',
      color: 'bg-social-tiktok',
      description: 'Connect your TikTok for Business account',
      features: ['Video posts', 'Analytics', 'Trending hashtags'],
      apiEndpoint: 'https://business-api.tiktok.com/open_api/v1.3',
      authUrl: 'https://www.tiktok.com/auth/authorize',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Social Media Integration
        </h3>
        <p className="text-text-secondary">
          Connect your social media accounts to start publishing content
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {socialPlatforms.map((platform) => {
          const connectedAccount = accounts.find(acc => acc.platform === platform.platform);
          const isConnected = connectedAccount?.isConnected;
          const isConnecting = connecting === platform.platform;

          return (
            <div key={platform.platform} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">
                      {platform.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{platform.name}</h4>
                    <p className="text-sm text-text-secondary">{platform.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <CheckCircleIcon className="w-6 h-6 text-success" />
                  ) : (
                    <XCircleIcon className="w-6 h-6 text-error" />
                  )}
                </div>
              </div>

              {isConnected && connectedAccount && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        @{connectedAccount.username}
                      </p>
                      <p className="text-xs text-green-600">
                        {connectedAccount.followers?.toLocaleString()} followers
                      </p>
                    </div>
                    <button
                      onClick={() => onRefresh(connectedAccount.id)}
                      className="p-1 hover:bg-green-100 rounded"
                      title="Refresh account data"
                    >
                      <ArrowPathIcon className="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h5 className="text-sm font-medium text-text-primary mb-2">Features:</h5>
                <ul className="text-xs text-text-secondary space-y-1">
                  {platform.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h5 className="text-xs font-medium text-text-primary mb-1">API Details:</h5>
                <p className="text-xs text-text-secondary font-mono">
                  {platform.apiEndpoint}
                </p>
              </div>

              <div className="flex gap-2">
                {isConnected ? (
                  <>
                    <button
                      onClick={() => connectedAccount && onDisconnect(connectedAccount.id)}
                      className="btn-secondary flex-1 text-sm"
                    >
                      Disconnect
                    </button>
                    <button
                      onClick={() => connectedAccount && onRefresh(connectedAccount.id)}
                      className="btn-primary flex-1 text-sm"
                    >
                      Refresh
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleConnect(platform.platform)}
                    disabled={isConnecting}
                    className="btn-primary w-full text-sm flex items-center justify-center gap-2"
                  >
                    {isConnecting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Connecting...
                      </>
                    ) : (
                      `Connect ${platform.name}`
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="card p-6">
        <h4 className="font-semibold text-text-primary mb-4">Integration Status</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-primary">Connected Accounts</span>
            <span className="font-medium text-success">
              {accounts.filter(acc => acc.isConnected).length} / {accounts.length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-primary">API Rate Limits</span>
            <span className="text-sm text-text-secondary">Within limits</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-primary">Last Sync</span>
            <span className="text-sm text-text-secondary">
              {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaIntegration;