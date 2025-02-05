import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SharedModule } from '@repo/shared';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [SharedModule, NotificationsModule],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
