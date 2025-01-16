import { PrismaClient } from "@prisma/client"
import { withPulse } from "@prisma/extension-pulse"

const prisma = new PrismaClient({ log: ["warn", "error"] }).$extends(
	withPulse({
		apiKey: process.env["PULSE_API_KEY"] as string,
	})
)

export { prisma }
