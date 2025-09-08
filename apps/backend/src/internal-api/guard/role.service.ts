import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/shared';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async checkUserRole(userId: string): Promise<boolean> {
    try {
      if (!userId) return false;

      const user: User | null = await this.prisma.client.user.findUnique({
        where: { userId: userId },
        include: { roles: true },
      });
      if (!user) return false;

      const checkPerrmissions = user.roles.some(
        (role) => role.value === 'ADMIN',
      );

      if (!checkPerrmissions) return false;

      return true;
    } catch (err) {
      throw err;
    }
  }
}
