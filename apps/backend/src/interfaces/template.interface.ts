export interface Template {
  in: number;
  templateId: string;
  link: string;
  categories: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description?: string;
  code: string | null;
  clickButtonUse?: number;
  authorId: string;
  addingUserId: string;
  usageCount: number;
  rolesCount: number;
  categoriesCount: number;
  channelsCount: number;
}

export interface SearchResult extends Template {
  [key: string]: any;
}
