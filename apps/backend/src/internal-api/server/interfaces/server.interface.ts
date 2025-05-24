import { PermissionString } from 'discord.js-selfbot-v13';

export interface ServerConfig {
  name: string;
  icon?: string;
  region?: string;
  verificationLevel?: string;
  explicitContentFilter?: string;
  defaultMessageNotifications?: string;
}

export interface PermissionOverwrite {
  roleId: string;
  allow: PermissionString[];
  deny: PermissionString[];
}

export interface Category {
  id: string;
  name: string;
  position: number;
  permissions: PermissionOverwrite[];
}

export interface Channel {
  type: 'TEXT' | 'VOICE';
  name: string;
  topic?: string;
  categoryId: string;
  position: number;
  nsfw?: boolean;
  rateLimitPerUser?: number;
  userLimit?: number;
  bitrate?: number;
  permissions: PermissionOverwrite[];
}

export interface ServerRole {
  id: string;
  name: string;
  color: string | number;
  hoist: boolean;
  position: number;
  permissions: PermissionString[];
  mentionable: boolean;
}

export interface Details {
  title: string;
  description: string;
  rules: string;
  tariff: string
}

export interface ServerCreationConfig {
  serverConfig: ServerConfig;
  categories: Category[];
  channels: Channel[];
  roles: ServerRole[];
  details: Details;
}
