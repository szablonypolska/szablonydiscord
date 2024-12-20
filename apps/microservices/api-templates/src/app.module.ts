import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { SharedModule } from '@repo/shared';
import { TemplateModule } from './scan-template/template.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({ cache: true }),
    TemplateModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}
