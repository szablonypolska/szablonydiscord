import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { PublishDto } from '../dto/publish.dto';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class PublishTemplate {
  constructor(private prisma: PrismaService) {}
  private uid = new ShortUniqueId({ length: 5 });

  async publishTemplate(data: PublishDto) {
    try {
      const [user, builderData] = await this.prisma.client.$transaction([
        this.prisma.client.user.findUnique({ where: { userId: data.userId } }),
        this.prisma.client.generateStatus.findUnique({
          where: { sessionId: data.id },
        }),
      ]);

      if (!user) throw new UnauthorizedException('You are not authorized');
      if (!builderData)
        throw new BadGatewayException('This builder ai status not exists');

      if (!builderData.templateCode)
        throw new BadGatewayException('This template is still being created');

      if (builderData.templateUrl)
        return new BadGatewayException('This template is already added');

      const create = await this.prisma.client.templates.create({
        data: {
          templateId: this.uid.rnd(),
          link: `https://discord.new/${builderData.templateCode}`,
          slugUrl: this.uid.rnd(),
          categories: 'AI',
          title: builderData.title,
          description: builderData.description,
          authorId: data.userId,
        },
      });

      await this.prisma.client.generateStatus.update({
        where: { sessionId: data.id },
        data: { templateUrl: create.slugUrl },
      });

      return { message: 'Templates is created', id: create.slugUrl };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
