import { PrismaClient } from "@prisma/client"
import { withPulse } from "@prisma/extension-pulse"

const prisma = new PrismaClient().$extends(
	withPulse({
		apiKey: process.env["PULSE_API_KEY"] as string,
	})
)

console.log(`api key`, prisma)

export { prisma }
