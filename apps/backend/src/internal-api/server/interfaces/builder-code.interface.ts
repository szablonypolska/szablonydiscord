import { PermissionString } from 'discord.js-selfbot-v13';

export interface BuilderCode {
  serverConfig: ServerConfig;
  categories: Categories[];
  channels: Channels[];
  roles: Roles[];
  details: Details;
}

interface ServerConfig {
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

export interface Categories {
  id: string;
  name: string;
  position: number;
  permissions: PermissionOverwrite[];
}

export interface Channels {
  type:
    | 'TEXT'
    | 'VOICE'
    | 'ANNOUNCEMENT'
    | 'NEWS'
    | 'FORUM'
    | 'STAGE'
    | 'STAGE_VOICE';
  name: string;
  topic?: string;
  categoryId: string;
  position: number;
  nsfw?: boolean;
  rateLimitPerUser?: number;
  userLimit?: number;
  bitrate?: number;
  permissions: PermissionOverwrite[];
  rtcRegion?: string;
  defaultAutoArchiveDuration?: number;
  availableTags?: any[];
  defaultReactionEmoji?: any;
  defaultThreadRateLimitPerUser?: number;
  defaultSortOrder?: string;
}

export interface Roles {
  id: string;
  name: string;
  color: string | number;
  hoist: boolean;
  position: number;
  permissions: PermissionString[];
  mentionable: boolean;
}

interface Details {
  title: string;
  description: string;
  rules: string;
  privacyPolicy: string;
  faq: string;
  tariff: string;
}
