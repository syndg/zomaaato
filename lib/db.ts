import { PrismaClient } from "@prisma/client";
import { calculateBoundingBox } from "@/lib/utils";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    model: {
      restaurant: {
        async findRestaurantsInRadius(
          userLat: number,
          userLon: number,
          radiusInKm: number,
        ) {
          const bbox = calculateBoundingBox(userLat, userLon, radiusInKm);

          const result = await db.$queryRaw<
            {
              id: string | null;
              name: string | null;
            }[]
          >`
          SELECT id, name,
          FROM "Restaurant"
          WHERE lat IS NOT NULL AND lon IS NOT NULL
          AND ST_Within(ST_MakePoint(lon, lat),
              ST_MakeEnvelope(${bbox.minLongitude}, ${bbox.minLatitude}, ${bbox.maxLongitude}, ${bbox.maxLatitude}, 4326))
          AND ST_DistanceSphere(ST_MakePoint(lon, lat), ST_MakePoint(${userLat}, ${userLon}))`;

          return result;
        },
      },
    },
  });
};

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

export const db = globalThis.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
