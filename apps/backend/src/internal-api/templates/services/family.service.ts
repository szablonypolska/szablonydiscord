import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { Template } from 'src/interfaces/template.interface';
import { FamilyDto } from '../dto/family.dto';

@Injectable()
export class TemplateFamilyService {
  constructor(private readonly prisma: PrismaService) {}

  async family(data: FamilyDto) {
    try {
      const templates: Template[] = await this.prisma.client.templates.findMany(
        {
          where: { familyId: data.familyId },
        },
      );

      if (templates.length === 0) {
        throw new NotFoundException({ ok: false, message: 'Family not found' });
      }

      return { ok: true, templates };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
