import { RoleGuard } from './role.guard';
import { Module } from '@nestjs/common';
import {SharedModule} from '@repo/shared';
import { RoleService } from './role.service';


@Module({
  imports: [SharedModule],
  providers: [RoleGuard, RoleService],
  exports: [RoleGuard, RoleService],
})
export class RoleModule {}
