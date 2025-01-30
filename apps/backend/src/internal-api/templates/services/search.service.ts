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
    keys: ['title', 'description'],
    getFn: (obj: Template, path: string) => {
      if (path === 'description' && obj.description === 'Brak opisu szablonu') {
        return '';
      }
      return obj[path];
    },
  };

  async searchTemplate(name: string): Promise<{ templates: Template[] }> {
    try {
      if (!name) {
        throw new BadGatewayException('name is required');
      }

      console.log(name);

      const templates = await this.prisma.client.templates.findMany({
        orderBy: { usageCount: 'desc' },
      });

      const fuse = new Fuse<Template>(templates, this.fuseOptions);

      const searchTemplates = fuse
        .search(name)
        .slice(0, 50)
        .map((result) => result.item);

      return { templates: searchTemplates };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
