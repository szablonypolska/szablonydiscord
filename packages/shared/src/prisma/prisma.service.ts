import { prisma } from "@repo/db"
import { Injectable, OnModuleInit, OnModuleDestroy, Scope } from "@nestjs/common"

@Injectable({ scope: Scope.DEFAULT })
export class PrismaService implements OnModuleInit, OnModuleDestroy {
	async onModuleInit() {
		await prisma.$connect()
	}

	async onModuleDestroy() {
		await prisma.$disconnect()
	}

	get client() {
		return prisma
	}
}
