import { Module } from "@nestjs/common"
import { PrismaService } from "./prisma/prisma.service"
import { ConfigModule } from "@nestjs/config"

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: "../../../packages/shared/.env" })],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class SharedModule {}
