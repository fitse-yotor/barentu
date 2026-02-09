import { User } from '../types';

export const mockUsers: User[] = [
  // Super Admin
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@socialhub.com',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    credits: 10000,
  },
  // Social Media Manager
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@agency.com',
    role: 'social_media_manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    credits: 500,
    assignedClients: ['client1', 'client2', 'client3'],
  },
  // Sub Social Media Manager
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@agency.com',
    role: 'sub_social_media_manager',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    managerId: '2',
    credits: 150,
    assignedClients: ['client1'],
    assignedAccounts: ['facebook_client1', 'instagram_client1'],
  },
  // User (Client)
  {
    id: '4',
    name: 'David Kim',
    email: 'david@company.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    managerId: '3',
    credits: 50,
    assignedAccounts: ['facebook_client1'],
  },
];

export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const validateCredentials = (email: string, password: string): User | null => {
  const user = getUserByEmail(email);
  // For demo purposes, accept any password
  return user || null;
};