import { PrismaClient } from "@repo/db"
import { OnModuleInit, OnModuleDestroy, Injectable } from "@nestjs/common"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleInit() {
		await this.$connect()
	}

	async onModuleDestroy() {
		await this.$disconnect()
	}
}
