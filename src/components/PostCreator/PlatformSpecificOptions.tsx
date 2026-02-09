import React from 'react';
import { PhotoIcon, VideoCameraIcon, HashtagIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface PlatformSpecificOptionsProps {
  platform: string;
  options: any;
  onChange: (platform: string, options: any) => void;
}

const PlatformSpecificOptions: React.FC<PlatformSpecificOptionsProps> = ({
  platform,
  options,
  onChange
}) => {
  const updateOption = (key: string, value: any) => {
    onChange(platform, { ...options, [key]: value });
  };

  const renderInstagramOptions = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Post Type
        </label>
        <select
          value={options.postType || 'feed'}
          onChange={(e) => updateOption('postType', e.target.value)}
          className="input-field"
        >
          <option value="feed">Feed Post</option>
          <option value="story">Story</option>
          <option value="reel">Reel</option>
          <option value="igtv">IGTV</option>
        </select>
      </div>
      
      {options.postType === 'story' && (
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.addToHighlights || false}
              onChange={(e) => updateOption('addToHighlights', e.target.checked)}
            />
            <span className="text-sm">Add to Highlights</span>
          </label>
        </div>
      )}
      
      {options.postType === 'reel' && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Reel Cover
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => updateOption('reelCover', e.target.files?.[0])}
            className="input-field"
          />
        </div>
      )}
    </div>
  );

  const renderTwitterOptions = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Tweet Type
        </label>
        <select
          value={options.tweetType || 'tweet'}
          onChange={(e) => updateOption('tweetType', e.target.value)}
          className="input-field"
        >
          <option value="tweet">Single Tweet</option>
          <option value="thread">Thread</option>
          <option value="reply">Reply</option>
        </select>
      </div>
      
      {options.tweetType === 'thread' && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Thread Posts
          </label>
          <textarea
            value={options.threadContent || ''}
            onChange={(e) => updateOption('threadContent', e.target.value)}
            placeholder="Separate each tweet with a new line..."
            className="input-field h-32"
          />
        </div>
      )}
      
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.enableReplies !== false}
            onChange={(e) => updateOption('enableReplies', e.target.checked)}
          />
          <span className="text-sm">Allow replies</span>
        </label>
      </div>
    </div>
  );

  const renderLinkedInOptions = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Post Type
        </label>
        <select
          value={options.postType || 'update'}
          onChange={(e) => updateOption('postType', e.target.value)}
          className="input-field"
        >
          <option value="update">Status Update</option>
          <option value="article">Article</option>
          <option value="document">Document</option>
          <option value="poll">Poll</option>
        </select>
      </div>
      
      {options.postType === 'article' && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Article Title
          </label>
          <input
            type="text"
            value={options.articleTitle || ''}
            onChange={(e) => updateOption('articleTitle', e.target.value)}
            className="input-field"
            placeholder="Enter article title..."
          />
        </div>
      )}
      
      {options.postType === 'poll' && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Poll Options (one per line)
          </label>
          <textarea
            value={options.pollOptions || ''}
            onChange={(e) => updateOption('pollOptions', e.target.value)}
            placeholder="Option 1\nOption 2\nOption 3"
            className="input-field h-24"
          />
        </div>
      )}
    </div>
  );

  const renderFacebookOptions = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Post Type
        </label>
        <select
          value={options.postType || 'post'}
          onChange={(e) => updateOption('postType', e.target.value)}
          className="input-field"
        >
          <option value="post">Regular Post</option>
          <option value="story">Story</option>
          <option value="event">Event</option>
          <option value="poll">Poll</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Audience
        </label>
        <select
          value={options.audience || 'public'}
          onChange={(e) => updateOption('audience', e.target.value)}
          className="input-field"
        >
          <option value="public">Public</option>
          <option value="friends">Friends</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      
      {options.postType === 'event' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Event Date
            </label>
            <input
              type="date"
              value={options.eventDate || ''}
              onChange={(e) => updateOption('eventDate', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Event Time
            </label>
            <input
              type="time"
              value={options.eventTime || ''}
              onChange={(e) => updateOption('eventTime', e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderTikTokOptions = () => (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.allowComments !== false}
            onChange={(e) => updateOption('allowComments', e.target.checked)}
          />
          <span className="text-sm">Allow comments</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.allowDuet || false}
            onChange={(e) => updateOption('allowDuet', e.target.checked)}
          />
          <span className="text-sm">Allow duet</span>
        </label>
      </div>
      
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options.allowStitch || false}
            onChange={(e) => updateOption('allowStitch', e.target.checked)}
          />
          <span className="text-sm">Allow stitch</span>
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Video Effects
        </label>
        <select
          value={options.videoEffect || 'none'}
          onChange={(e) => updateOption('videoEffect', e.target.value)}
          className="input-field"
        >
          <option value="none">No Effect</option>
          <option value="beauty">Beauty Filter</option>
          <option value="vintage">Vintage</option>
          <option value="dramatic">Dramatic</option>
        </select>
      </div>
    </div>
  );

  const renderPlatformOptions = () => {
    switch (platform) {
      case 'instagram':
        return renderInstagramOptions();
      case 'twitter':
        return renderTwitterOptions();
      case 'linkedin':
        return renderLinkedInOptions();
      case 'facebook':
        return renderFacebookOptions();
      case 'tiktok':
        return renderTikTokOptions();
      default:
        return (
          <div className="text-center text-text-secondary py-4">
            No specific options available for this platform
          </div>
        );
    }
  };

  return (
    <div className="border border-border-light rounded-lg p-4">
      <h4 className="font-medium text-text-primary mb-4 capitalize flex items-center gap-2">
        <div className={`w-4 h-4 rounded ${
          platform === 'facebook' ? 'bg-social-facebook' :
          platform === 'instagram' ? 'bg-social-instagram' :
          platform === 'twitter' ? 'bg-social-twitter' :
          platform === 'linkedin' ? 'bg-social-linkedin' :
          platform === 'tiktok' ? 'bg-social-tiktok' :
          'bg-gray-400'
        }`}></div>
        {platform} Options
      </h4>
      {renderPlatformOptions()}
    </div>
  );
};

export default PlatformSpecificOptions;