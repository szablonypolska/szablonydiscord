import { Template } from '../../interfaces/template.interface';


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
