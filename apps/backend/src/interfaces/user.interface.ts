export interface User {
  userId: string;
  slugUrl: string;
  email?: string;
  username: string;
  avatar?: string;
  dateCreateAccount?: Date;
  register: boolean;
  reports: number;
  warnings: number;
  limitApiKey: number;
  trustScore: number;
  walletBalance: number;
  builderAiUsage: number;
  builderAiLimit: number;
  notificationApi: boolean;
  emailVerified: boolean;
  permission: string;
  settings: Settings;
  roles: Role[];
}

export interface Settings {
  id: number;
  templatesDetail: boolean;
  monitoring: boolean;
}

interface Role {
  id: number;
  value: 'ADMIN' | 'USER' | 'SUPPORT' | 'PREMIUM';
  userId: string;
}
