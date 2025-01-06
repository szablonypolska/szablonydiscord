import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@repo/shared';

@Injectable()
export class ListenerService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit(): Promise<void> {}
}
