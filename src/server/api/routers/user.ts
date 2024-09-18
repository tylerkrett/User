import { eq, inArray } from "drizzle-orm";
import { withCursorPagination } from "drizzle-pagination";
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
        ids: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(users)
        .where(inArray(users.id, input.ids))
        .returning();
    }),
  getLatestUser: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.users.findFirst({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });
    return users ?? null;
  }),
  getUser: publicProcedure.input(
   z.object({id: z.number()})
  ).query(async ({ input, ctx }) => {
    const user = await ctx.db.query.users.findFirst({ where: (user, { eq }) => eq(user.id, input.id),})
    return user ?? null;
  }),
  getUsers: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(50).default(5),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.query.users.findMany(
        withCursorPagination({
          limit: input.limit,
          cursors: [
            [
              users?.createdAt,
              "desc",
              input.cursor ? new Date(input.cursor) : undefined,
            ],
          ],
        }),
      );
      return {
        // return the data of posts for that user
        data,
        // return the next cursor
        nextCursor: data.length
          ? data.length
            ? data[data.length - 1]?.createdAt.toISOString()
            : null
          : null,
      };
    }),
});
