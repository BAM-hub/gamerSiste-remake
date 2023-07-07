import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Console } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const profileRouter = createTRPCRouter({
  createProfile: protectedProcedure
    .input(
      z.object({
        preferedConsole: z.nativeEnum(Console),
        username: z.string(),
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        instagram: z.string().optional(),
        whatsapp: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      if (!id) throw new TRPCError({ code: "UNAUTHORIZED" });
      await ctx.prisma.profile.create({
        data: {
          ...input,
          user: {
            connect: {
              id,
            },
          },
        },
      });
      //   if (!profile) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      //   return profile;
    }),
});
