import { PrismaClient } from "@/lib/generated/prisma";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

neonConfig.webSocketConstructor = ws;
const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaNeon({ connectionString });

export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        needs: { price: true },
        compute: ({ price }) => price.toString(),
      },
      rating: {
        needs: { rating: true },
        compute: ({ rating }) => rating.toString(),
      },
    },
  },
});
