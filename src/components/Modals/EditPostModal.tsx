import React, { useState, useEffect } from 'react';
import { XMarkIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Post, SocialAccount } from '../../types';

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: Partial<Post>) => void;
  post: Post | null;
  accounts: SocialAccount[];
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  post,
  accounts
}) => {
  const [formData, setFormData] = useState({
    content: '',
    platforms: [] as string[],
    scheduledDate: '',
    scheduledTime: '',
    status: 'draft' as Post['status'],
  });

  useEffect(() => {
    if (post) {
      setFormData({
        content: post.content,
        platforms: post.platforms,
        scheduledDate: post.scheduledAt ? post.scheduledAt.toISOString().split('T')[0] : '',
        scheduledTime: post.scheduledAt ? post.scheduledAt.toISOString().split('T')[1].slice(0, 5) : '',
        status: post.status,
      });
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.content.trim() || formData.platforms.length === 0) {
      return;
    }

    const updatedPost: Partial<Post> = {
      content: formData.content,
      platforms: formData.platforms,
      scheduledAt: formData.scheduledDate && formData.scheduledTime 
        ? new Date(`${formData.scheduledDate}T${formData.scheduledTime}`)
        : undefined,
      status: formData.status,
      creditsUsed: formData.platforms.length,
    };

    onSubmit(updatedPost);
    onClose();
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
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

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background-card rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 className="text-xl font-semibold text-text-primary">Edit Post</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Post Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="What's on your mind?"
              className="input-field h-32 resize-none"
              required
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-text-secondary">
                {formData.content.length}/280 characters
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Post Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Post['status'] })}
              className="input-field"
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Select Platforms
            </label>
            <div className="grid grid-cols-2 gap-3">
              {accounts.map((account) => (
                <label
                  key={account.id}
                  className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.platforms.includes(account.platform)
                      ? `${getPlatformColor(account.platform)} bg-opacity-10`
                      : 'border-border-light hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(account.platform)}
                    onChange={() => handlePlatformToggle(account.platform)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    formData.platforms.includes(account.platform)
                      ? getPlatformColor(account.platform)
                      : 'border-gray-300'
                  }`}>
                    {formData.platforms.includes(account.platform) && (
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

          {formData.status === 'scheduled' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Schedule Date & Time
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="input-field"
                />
                <input
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border-light">
            <div className="text-sm text-text-secondary">
              Credits required: {formData.platforms.length}
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
                disabled={!formData.content.trim() || formData.platforms.length === 0}
              >
                Update Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;