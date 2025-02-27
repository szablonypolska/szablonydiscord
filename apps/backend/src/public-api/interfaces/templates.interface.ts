import { Template } from '../../interfaces/template.interface';

export interface TemplatesQuery {
  page: string;
  pageSize: string;
}

export interface TemplatesData {
  data: Template[];
  detail: {
    currentPage: number;
    pageSize: number;
    pagesLeft: number;
    totalPage: number;
    totalTemplates: number;
  };
}
