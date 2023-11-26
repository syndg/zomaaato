import { db } from "@/lib/db";

export const getRestaurant = async (id: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
  });

  return restaurant;
};

export const getResTypeandTiming = async (resId: string) => {
  const result = await db.restaurantTypeTimings.findUnique({
    where: {
      restaurantId: resId,
    },
  });
  return result;
};
