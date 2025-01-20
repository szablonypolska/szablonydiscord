import { prisma } from "@repo/db"
import { Injectable, OnModuleDestroy, Scope } from "@nestjs/common"

@Injectable({ scope: Scope.DEFAULT })
export class PrismaService implements OnModuleDestroy {
	async onModuleDestroy() {
		await prisma.$disconnect()
	}

	get client() {
		return prisma
	}
}
