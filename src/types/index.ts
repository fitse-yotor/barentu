export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'social_media_manager' | 'sub_social_media_manager' | 'user';
  avatar?: string;
  credits?: number;
  managerId?: string;
  assignedClients?: string[];
  assignedAccounts?: string[];
}

export interface SocialAccount {
  id: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok';
  username: string;
  displayName: string;
  isConnected: boolean;
  followers?: number;
}

export interface Post {
  id: string;
  content: string;
  media?: MediaFile[];
  platforms: string[];
  scheduledAt?: Date;
  publishedAt?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  authorId: string;
  creditsUsed: number;
}

export interface MediaFile {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  size: number;
}

export interface Analytics {
  totalPosts: number;
  scheduledPosts: number;
  publishedPosts: number;
  creditsUsed: number;
  creditsRemaining: number;
  platformStats: Record<string, number>;
}

export interface CreditTransaction {
  id: string;
  amount: number;
  type: 'purchase' | 'usage' | 'refund';
  description: string;
  createdAt: Date;
}