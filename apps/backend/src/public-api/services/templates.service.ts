import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import {
  TemplatesQuery,
  TemplatesData,
} from '../interfaces/templates.interface';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async getTemplates(templates: TemplatesQuery): Promise<TemplatesData> {
    const pageNumber = parseInt(templates.page) || 1;
    const pageSize = parseInt(templates.pageSize) || 25;

    try {
      const [templatesCount, getTemplates] =
        await this.prisma.client.$transaction([
          this.prisma.client.templates.count(),
          this.prisma.client.templates.findMany({
            orderBy: { dateCreateSystem: 'desc' },
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
          }),
        ]);

      const totalPage = Math.ceil(templatesCount / pageSize);

      if (pageNumber > totalPage)
        throw new BadRequestException("There aren't that many pages");

      const dataToSend: TemplatesData = {
        data: getTemplates,
        detail: {
          currentPage: pageNumber,
          pageSize: pageSize,
          pagesLeft: totalPage - pageNumber,
          totalPage: totalPage,
          totalTemplates: templatesCount,
        },
      };

      return dataToSend;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
