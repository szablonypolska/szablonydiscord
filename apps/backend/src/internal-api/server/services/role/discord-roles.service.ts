import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { Guild, ColorResolvable, Role } from 'discord.js-selfbot-v13';
import { Builder } from '../../interfaces/builder.interface';
import { BuilderEmitterService } from '../emitter/builder-emitter.service';
import { Roles } from '../../interfaces/builder-code.interface';

@Injectable()
export class DiscordCreateRolesService {
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
    private builderEmitter: BuilderEmitterService,
  ) {}

  private roleMap: Map<string, Role> = new Map();

  async createRoles(
    guild: Guild,
    roles: Roles[],
    data: Builder,
  ): Promise<Map<string, Role>> {
    this.roleMap = new Map();

    let findIdCreateRolesStage: { id: number } = { id: 0 };

    try {
      findIdCreateRolesStage = data.builderProcess.stages.find(
        (stage) => stage.type === 'ROLES_CREATE',
      );

      const sortedRoles = [...roles].sort((a, b) => b.position - a.position);

      let createdRole: number = 0;

      this.builderEmitter.builderEmit(
        data.sessionId,
        { id: findIdCreateRolesStage.id, status: 'IN_PROGRESS' },
        'status_updated',
      );

      const [, createRoleStage] = await this.prisma.client.$transaction([
        this.prisma.client.builderStage.update({
          where: { id: findIdCreateRolesStage.id },
          data: { status: 'IN_PROGRESS', startedAt: new Date() },
        }),
        this.prisma.client.roleStage.create({
          data: {
            builderStageId: findIdCreateRolesStage.id,
          },
        }),
      ]);

      const everyoneRole = guild.roles.everyone;
      this.roleMap.set('everyone', everyoneRole);

      for (const roleConfig of sortedRoles) {
        try {
          let colorValue: ColorResolvable;
          if (
            typeof roleConfig.color === 'string' &&
            roleConfig.color.startsWith('#')
          ) {
            colorValue = parseInt(
              roleConfig.color.substring(1),
              16,
            ) as ColorResolvable;
          } else {
            colorValue = roleConfig.color as ColorResolvable;
          }

          const role = await guild.roles.create({
            name: roleConfig.name,
            color: colorValue,
            hoist: roleConfig.hoist,
            position: roleConfig.position,
            permissions: roleConfig.permissions,
            mentionable: roleConfig.mentionable,
          });

          createdRole++;

          this.builderEmitter.builderEmit(
            data.sessionId,
            {
              id: findIdCreateRolesStage.id,
              name: role.name,
              color: role.color,
            },
            'roles_created',
          );

          await this.prisma.client.role.create({
            data: {
              stageId: createRoleStage.id,
              name: role.name,
              color: String(role.color),
            },
          });

          this.roleMap.set(roleConfig.id, role);
        } catch (error) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      this.builderEmitter.builderEmit(
        data.sessionId,
        {
          id: findIdCreateRolesStage.id,
          status: 'COMPLETED',
        },
        'status_updated',
      );

      await this.prisma.client.builderStage.update({
        where: { id: findIdCreateRolesStage.id },
        data: { status: 'COMPLETED', finishedAt: new Date() },
      });

      return this.roleMap;
    } catch (error) {
      console.log(error);
      this.builderEmitter.builderEmit(
        data.sessionId,
        {
          id: findIdCreateRolesStage.id,
          status: 'FAILED',
        },
        'status_updated',
      );

      await this.prisma.client.builderStage.update({
        where: { id: findIdCreateRolesStage.id },
        data: { status: 'FAILED', finishedAt: new Date() },
      });
    }
  }
}
