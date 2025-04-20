import { BadRequestException, Injectable } from '@nestjs/common';
import { VerifyTemplateDto } from '../dto/verify.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@repo/shared';

@Injectable()
export class VerifyTemplateService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  private hostname = this.configService.get<string>('HOSTNAME');

  async verifyTemplates(data: VerifyTemplateDto) {
    try {
      if (!data.link.includes(`${this.hostname}/templates/`))
        throw new BadRequestException('Given link is not correct');

      const idTemplate = data.link.split(`${this.hostname}/templates/`)[1];

      const getDataTemplate = await this.prisma.client.templates.findUnique({
        where: { slugUrl: idTemplate },
      });

      if (!getDataTemplate)
        throw new BadRequestException('Given templates is not exists');
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
