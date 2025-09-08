import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '@repo/shared';
import { RoleService } from './role.service';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService, private readonly roleService: RoleService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { userId } = request.body;

   return this.roleService.checkUserRole(userId);
  }
}
