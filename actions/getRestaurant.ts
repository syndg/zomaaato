import { db } from "@/lib/db";

export const getRestaurant = async (id: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
  });

  return restaurant;
};
