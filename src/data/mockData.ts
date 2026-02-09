import { Analytics, Post, SocialAccount, CreditTransaction } from '../types';

// Analytics data for different user roles
export const getAnalyticsForUser = (userId: string, role: string): Analytics => {
  const baseAnalytics = {
    super_admin: {
      totalPosts: 25420,
      scheduledPosts: 542,
      publishedPosts: 24878,
      creditsUsed: 75230,
      creditsRemaining: 10000,
      platformStats: {
        facebook: 6200,
        instagram: 5800,
        twitter: 4900,
        linkedin: 4100,
        tiktok: 4420,
      },
    },
    social_media_manager: {
      totalPosts: 1845,
      scheduledPosts: 38,
      publishedPosts: 1807,
      creditsUsed: 5540,
      creditsRemaining: 500,
      platformStats: {
        facebook: 520,
        instagram: 620,
        twitter: 380,
        linkedin: 325,
        tiktok: 0,
      },
    },
    sub_social_media_manager: {
      totalPosts: 656,
      scheduledPosts: 18,
      publishedPosts: 638,
      creditsUsed: 1968,
      creditsRemaining: 150,
      platformStats: {
        facebook: 180,
        instagram: 250,
        twitter: 135,
        linkedin: 91,
        tiktok: 0,
      },
    },
    user: {
      totalPosts: 45,
      scheduledPosts: 2,
      publishedPosts: 43,
      creditsUsed: 135,
      creditsRemaining: 50,
      platformStats: {
        facebook: 15,
        instagram: 20,
        twitter: 8,
        linkedin: 2,
        tiktok: 0,
      },
    },
  };

  return baseAnalytics[role as keyof typeof baseAnalytics] || baseAnalytics.user;
};

// Posts data for different users
export const getPostsForUser = (userId: string, role: string): Post[] => {
  const basePosts: Post[] = [
    {
      id: '1',
      content: 'Excited to announce our Q4 results! 📈 Revenue up 45% compared to last quarter.',
      platforms: ['facebook', 'linkedin', 'twitter'],
      status: 'published',
      authorId: userId,
      creditsUsed: 3,
      publishedAt: new Date('2024-01-25'),
    },
    {
      id: '2',
      content: 'Behind the scenes of our latest product photoshoot 📸 What do you think of this setup?',
      platforms: ['instagram'],
      status: 'scheduled',
      authorId: userId,
      creditsUsed: 1,
      scheduledAt: new Date('2024-02-01'),
    },
    {
      id: '3',
      content: 'Top 5 social media trends for 2024: 1. AI-powered content 2. Short-form video 3. Social commerce 4. Community building 5. Authentic storytelling',
      platforms: ['linkedin', 'twitter'],
      status: 'published',
      authorId: userId,
      creditsUsed: 2,
      publishedAt: new Date('2024-01-28'),
    },
    {
      id: '4',
      content: 'Team lunch at our favorite local spot! 🍕 Nothing beats good food and great company.',
      platforms: ['instagram', 'facebook'],
      status: 'published',
      authorId: userId,
      creditsUsed: 2,
      publishedAt: new Date('2024-01-26'),
    },
    {
      id: '5',
      content: 'Webinar reminder: "Social Media ROI Strategies" tomorrow at 2 PM EST. Link in bio! 💡',
      platforms: ['linkedin', 'twitter', 'facebook'],
      status: 'scheduled',
      authorId: userId,
      creditsUsed: 3,
      scheduledAt: new Date('2024-01-31'),
    },
  ];

  // System owners see more posts
  if (role === 'super_admin') {
    return [...basePosts, ...basePosts.map(post => ({
      ...post,
      id: post.id + '_extra',
      content: `[Platform View] ${post.content}`,
      publishedAt: post.publishedAt ? new Date(post.publishedAt.getTime() - 86400000) : undefined,
      scheduledAt: post.scheduledAt ? new Date(post.scheduledAt.getTime() + 86400000) : undefined,
    }))];
  }

  // Social Media Managers see extended posts
  if (role === 'social_media_manager') {
    return [...basePosts, ...basePosts.slice(0, 2).map(post => ({
      ...post,
      id: post.id + '_manager',
      content: `[Manager View] ${post.content}`,
      publishedAt: post.publishedAt ? new Date(post.publishedAt.getTime() - 43200000) : undefined,
    }))];
  }

  return basePosts;
};

// Social accounts for different users
export const getAccountsForUser = (userId: string, role: string): SocialAccount[] => {
  const baseAccounts: SocialAccount[] = [
    {
      id: '1',
      platform: 'facebook',
      username: 'mycompany',
      displayName: 'My Company',
      isConnected: true,
      followers: 15420,
    },
    {
      id: '2',
      platform: 'instagram',
      username: 'mycompany',
      displayName: 'My Company',
      isConnected: true,
      followers: 8930,
    },
    {
      id: '3',
      platform: 'twitter',
      username: 'mycompany',
      displayName: 'My Company',
      isConnected: true,
      followers: 5240,
    },
    {
      id: '4',
      platform: 'linkedin',
      username: 'my-company',
      displayName: 'My Company',
      isConnected: true,
      followers: 2180,
    },
  ];

  // System owners and managers see all accounts
  if (role === 'super_admin' || role === 'social_media_manager') {
    return [
      ...baseAccounts,
      {
        id: '5',
        platform: 'tiktok',
        username: 'mycompany',
        displayName: 'My Company',
        isConnected: true,
        followers: 12500,
      },
    ];
  }

  // Sub-managers and users see limited accounts
  return baseAccounts.slice(0, 3);
};

// Credit transactions
export const getCreditTransactions = (userId: string, role: string): CreditTransaction[] => {
  const transactions: CreditTransaction[] = [
    {
      id: '1',
      amount: 500,
      type: 'purchase',
      description: 'Monthly credit package',
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      amount: -3,
      type: 'usage',
      description: 'Multi-platform post',
      createdAt: new Date('2024-01-25'),
    },
    {
      id: '3',
      amount: -1,
      type: 'usage',
      description: 'Instagram post',
      createdAt: new Date('2024-01-26'),
    },
    {
      id: '4',
      amount: -2,
      type: 'usage',
      description: 'LinkedIn + Twitter post',
      createdAt: new Date('2024-01-28'),
    },
  ];

  // System owners see all transactions
  if (role === 'super_admin') {
    return [
      ...transactions,
      {
        id: '5',
        amount: 10000,
        type: 'purchase',
        description: 'Platform credit package',
        createdAt: new Date('2024-01-01'),
      },
      {
        id: '6',
        amount: 5000,
        type: 'purchase',
        description: 'Manager credit allocation',
        createdAt: new Date('2024-01-15'),
      },
    ];
  }

  return transactions;
};