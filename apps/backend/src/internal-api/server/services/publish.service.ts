import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { PublishDto } from '../dto/publish.dto';
import ShortUniqueId from 'short-unique-id';
import { TemplatesCoreService } from 'src/shared/services/template-add.service';

@Injectable()
export class PublishTemplate {
  constructor(
    private prisma: PrismaService,
    private template: TemplatesCoreService,
  ) {}
  private uid = new ShortUniqueId({ length: 5 });

  async publishTemplate(data: PublishDto) {
    try {
      const builderData = await this.prisma.client.builder.findUnique({
        where: { sessionId: data.id },
      });

      if (!builderData)
        throw new BadGatewayException('This builder ai status not exists');

      if (!builderData.templateCode)
        throw new BadGatewayException('This template is still being created');

      if (builderData.templateUrl)
        return new BadGatewayException('This template is already added');

      const create = await this.template.addTemplate(
        builderData.templateCode,
        data.userId,
      );

      await this.prisma.client.builder.update({
        where: { sessionId: data.id },
        data: { templateUrl: create.slugUrl },
      });

      return {
        message: 'Templates is created',
        id: create.slugUrl,
        position: create.position,
        waitingInQueue: create.waitingInQueue,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
