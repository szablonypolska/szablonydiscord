import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { Guild, ColorResolvable, Role } from 'discord.js-selfbot-v13';
import { ServerRole } from '../interfaces/server.interface';

@Injectable()
export class DiscordCreateRolesService {
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
  ) {}

  private roleMap: Map<string, Role> = new Map();

  async createRoles(
    guild: Guild,
    roles: ServerRole[],
    sessionId: string,
  ): Promise<Map<string, Role>> {
    this.roleMap = new Map();

    try {
      const sortedRoles = [...roles].sort((a, b) => b.position - a.position);

      let createdRole: number = 0;

      this.websocket.server.emit('update_roles_status', {
        sessionId,
        status: 'in_progress',
      });

      await this.prisma.client.generateStatus.update({
        where: { sessionId },
        data: { rolesStatus: 'in_progress' },
      });

      const everyoneRole = guild.roles.everyone;
      this.roleMap.set('everyone', everyoneRole);

      console.log(sortedRoles);

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

          this.websocket.server.emit('update_roles', {
            sessionId,
            name: role.name,
            color: role.color,
          });

          await this.prisma.client.role.create({
            data: { sessionId, name: role.name, color: String(role.color) },
          });

          this.roleMap.set(roleConfig.id, role);
        } catch (error) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      this.websocket.server.emit('update_roles_status', {
        sessionId,
        status: 'done',
      });

      await this.prisma.client.generateStatus.update({
        where: { sessionId },
        data: { rolesStatus: 'done' },
      });

      return this.roleMap;
    } catch (error) {
      console.log(error);
      this.websocket.server.emit('update_roles_status', {
        sessionId,
        status: 'error',
        rolesError: true,
      });
      await this.prisma.client.generateStatus.update({
        where: { sessionId },
        data: { rolesError: true },
      });
      throw error;
    }
  }
}
