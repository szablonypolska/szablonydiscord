import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SharedModule } from '@repo/shared';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from 'src/common/constants/app-options.constants';

@Module({
  imports: [CacheModule.registerAsync(RedisOptions), SharedModule],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, AuthService, CacheModule],
})
export class AuthModule {}
