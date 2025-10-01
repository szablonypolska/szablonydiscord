export interface Template {
  in: number;
  templateId: string;
  link: string;
  categories: string;
  dateCreate: string;
  dateCreateSystem: Date;
  title: string;
  description?: string;
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
