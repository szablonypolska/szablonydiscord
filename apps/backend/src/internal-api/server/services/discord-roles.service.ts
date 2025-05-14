import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';
import { PrismaService } from '@repo/shared';
import { Guild, ColorResolvable } from 'discord.js-selfbot-v13';
import { ServerRole } from '../interfaces/server.interface';

@Injectable()
export class DiscordCreateRolesService {
  roleMap: any;
  constructor(
    private websocket: WebsocketGateway,
    private prisma: PrismaService,
  ) {}

  async createRoles(
    guild: Guild,
    roles: ServerRole[],
    sessionId: string,
  ): Promise<void> {
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

        console.log(role.name, role.color);

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
  }
}
