import { BadGatewayException, Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Template } from '../../../interfaces/template.interface';
import Fuse from 'fuse.js';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  private fuseOptions = {
    includeScore: true,
    threshold: 0.3,
    keys: ['title', 'description', 'sourceServerId'],
    getFn: (obj: Template, path: string) => {
      if (path === 'description' && obj.description === 'Brak opisu szablonu') {
        return '';
      }
      return obj[path];
    },
  };

  async searchTemplate(
    name: string,
  ): Promise<{ templates: Template[]; type: string }> {
    try {
      if (!name) {
        throw new BadGatewayException('name is required');
      }

      const getSearchHistory = await this.prisma.client.searchHistory.findMany({
        orderBy: { dateSearch: 'desc' },
        take: 5,
      });

      const checkIfSearchedToday = getSearchHistory.some(
        (el: any) => el.title === name,
      );

      const templates = await this.prisma.client.templates.findMany({
        orderBy: { usageCount: 'desc' },
      });

      const fuse = new Fuse<Template>(templates, this.fuseOptions);

      const searchTemplates = fuse
        .search(name)
        .slice(0, 50)
        .map((result) => result.item);

      console.log(searchTemplates.length);

      if (!checkIfSearchedToday && searchTemplates.length > 0) {
        console.log('wykonuje sie');
        await this.prisma.client.searchHistory.create({
          data: {
            title: name,
          },
        });
      }

      return { templates: searchTemplates, type: 'search' };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
