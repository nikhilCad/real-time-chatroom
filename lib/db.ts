import { PrismaClient } from "@prisma/client";

//Don't initialize too many prisma clients when using hot reload
//Does not matter in production, but in development
//too many prisma client can get initialized on each code save

//From official docs of prisma
declare global {
  var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db