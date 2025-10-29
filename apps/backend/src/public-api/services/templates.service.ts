import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { TemplatesData } from '../interfaces/templates.interface';
import { TemplatesDto } from '../dto/templates.dto';
import { Template } from '../../interfaces/template.interface';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async getTemplates(templates: TemplatesDto): Promise<TemplatesData> {
    const pageNumber = parseInt(templates.page) || 1;
    const pageSize = parseInt(templates.pageSize) || 25;

    try {
      const getTemplates: Template[] =
        await this.prisma.client.templates.findMany({
          orderBy: { createdAt: 'desc' },
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
          omit: {
            code: true,
            rolesCount: templates.templateDetail === 'true' ? false : true,
            channelsCount: templates.templateDetail === 'true' ? false : true,
            categoriesCount: templates.templateDetail === 'true' ? false : true,
            createdAt: templates.templateDetail === 'true' ? false : true,
            authorId: templates.templateDetail === 'true' ? false : true,
            addingUserId: templates.templateDetail === 'true' ? false : true,
          },
        });

      const totalPage = Math.ceil(getTemplates.length / pageSize);

      if (pageNumber > totalPage)
        throw new BadRequestException("There aren't that many pages");

      const dataToSend: TemplatesData = {
        data: getTemplates,
        detail: {
          currentPage: pageNumber,
          pageSize: pageSize,
          pagesLeft: totalPage - pageNumber,
          totalPage: totalPage,
          totalTemplates: getTemplates.length,
        },
      };

      return dataToSend;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
