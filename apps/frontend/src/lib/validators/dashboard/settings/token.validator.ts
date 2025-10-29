import { z } from "zod"

export const tokenSchema = z.object({
	token: z.string({ required_error: "Token jest wymagany" }).min(30, "Token jest za krótki"),
})

export type TokenSchema = z.infer<typeof tokenSchema>
