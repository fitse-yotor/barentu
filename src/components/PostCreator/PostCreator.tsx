import React, { useState } from 'react';
import { 
  PhotoIcon, 
  VideoCameraIcon, 
  CalendarIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { SocialAccount } from '../../types';

interface PostCreatorProps {
  accounts: SocialAccount[];
  onClose: () => void;
  onSubmit: (postData: any) => void;
}

const PostCreator: React.FC<PostCreatorProps> = ({ accounts, onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [media, setMedia] = useState<File[]>([]);

  const handleAccountToggle = (accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId) 
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setMedia(prev => [...prev, ...files]);
  };

  const removeMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      content,
      platforms: selectedAccounts,
      scheduledAt: scheduledDate && scheduledTime 
        ? new Date(`${scheduledDate}T${scheduledTime}`)
        : null,
      media,
    };
    
    onSubmit(postData);
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      facebook: 'border-social-facebook text-social-facebook',
      instagram: 'border-social-instagram text-social-instagram',
      twitter: 'border-social-twitter text-social-twitter',
      linkedin: 'border-social-linkedin text-social-linkedin',
      tiktok: 'border-social-tiktok text-social-tiktok',
    };
    return colors[platform] || 'border-gray-400 text-gray-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background-card rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 className="text-xl font-semibold text-text-primary">Create Post</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Post Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="input-field h-32 resize-none"
              required
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-text-secondary">
                {content.length}/280 characters
              </span>
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Media
            </label>
            <div className="border-2 border-dashed border-border-light rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
                id="media-upload"
              />
              <label htmlFor="media-upload" className="cursor-pointer">
                <div className="flex items-center justify-center gap-2 text-text-secondary">
                  <PhotoIcon className="w-6 h-6" />
                  <VideoCameraIcon className="w-6 h-6" />
                </div>
                <p className="mt-2 text-sm text-text-secondary">
                  Click to upload images or videos
                </p>
              </label>
            </div>
            
            {/* Media Preview */}
            {media.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {media.map((file, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      {file.type.startsWith('image/') ? (
                        <PhotoIcon className="w-8 h-8 text-text-secondary" />
                      ) : (
                        <VideoCameraIcon className="w-8 h-8 text-text-secondary" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Select Platforms
            </label>
            <div className="grid grid-cols-2 gap-3">
              {accounts.map((account) => (
                <label
                  key={account.id}
                  className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedAccounts.includes(account.id)
                      ? `${getPlatformColor(account.platform)} bg-opacity-10`
                      : 'border-border-light hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAccounts.includes(account.id)}
                    onChange={() => handleAccountToggle(account.id)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    selectedAccounts.includes(account.id)
                      ? getPlatformColor(account.platform)
                      : 'border-gray-300'
                  }`}>
                    {selectedAccounts.includes(account.id) && (
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-text-primary capitalize">
                      {account.platform}
                    </p>
                    <p className="text-sm text-text-secondary">@{account.username}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Scheduling */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Schedule Post (Optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border-light">
            <div className="text-sm text-text-secondary">
              Credits required: {selectedAccounts.length * 1}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={!content.trim() || selectedAccounts.length === 0}
              >
                {scheduledDate ? 'Schedule Post' : 'Publish Now'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCreator;