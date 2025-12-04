export interface Template {
  id: string;
  link: string;
  slugUrl: string;
  categories: TemplateCategory;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  familyId: string;
  isLatest: boolean;
  version: number;
  sourceServerId?: string;
  description?: string;
  authorId?: string;
  addingUserId?: string;
  code?: string;
  usageCount: number;
  channelCount: number;
  rolesCount: number;
  categoriesCount: number;
  visitHistory: VisitHistory[];
}

export enum TemplateCategory {
  ALL = 'ALL',
  ROLEPLAY = 'ROLEPLAY',
  THEMATIC = 'THEMATIC',
  ENGLISH = 'ENGLISH',
  SOCIAL = 'SOCIAL',
  NSFW = 'NSFW',
  GROUPS_OF_PEOPLE = 'GROUPS_OF_PEOPLE',
  GUILDS = 'GUILDS',
  MEMES = 'MEMES',
  SCAM = 'SCAM',
  ANIME = 'ANIME',
  GTA = 'GTA',
  DEV = 'DEV',
  MINECRAFT = 'MINECRAFT',
  GAMING = 'GAMING',
  ADVERTISING = 'ADVERTISING',
  AI = 'AI',
}

export interface VisitHistory {
  id: number;
  uuid: string;
  slugUrl: string;
  visitedAt: Date;
}

export interface SearchResult extends Template {
  [key: string]: any;
}
