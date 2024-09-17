import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1).max(256),
        lastName: z.string().min(1).max(256),
        address: z.string().min(1),
        email: z
          .string()
          .min(1, { message: "This field has to be filled." })
          .email("This is not a valid email."),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(users).values({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        address: input.address,
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(users).where(eq(users.id, input.id)).returning();
    }),
  getLatestUser: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.users.findFirst({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });
    return users ?? null;
  }),
  getUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });
    return users ?? null;
  }),
});
