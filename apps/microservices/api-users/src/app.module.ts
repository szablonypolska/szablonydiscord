import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { SharedModule } from '@repo/shared';
import { UserModule } from './scan-users/user.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({ cache: true }),
    UserModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}
