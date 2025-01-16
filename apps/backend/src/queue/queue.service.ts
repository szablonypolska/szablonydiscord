import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PrismaService } from '@repo/shared';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('scanQueue') private readonly queue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  async getLengthWaitElement(): Promise<boolean> {
    try {
      const length = await this.queue.getWaitingCount();

      if (length > 0) return false;

      return true;
    } catch (err) {
      console.log(err);
    }
  }
}

// model Templates {
//   in Int @id @default(autoincrement())
//   templateId String
//   categories String
//   dateCreate String
//   Link String
//   title String
//   usageCount Int?
//   clickButtonUse Int?
//   server String?
//   serverLink String?
// }
