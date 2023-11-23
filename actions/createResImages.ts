import { db } from "@/lib/db";

export const createResImages = async (
  resId: string,
  imgUrl: string,
  key: string,
) => {
  try {
    const img = await db.restaurantImages.create({
      data: {
        imageUrl: imgUrl,
        restaurantId: resId,
        utKey: key,
      },
    });
    return img;
  } catch (err) {
    console.log(err);
  }
};

export const getImages = async (resId: string) => {
  try {
    const images = await db.restaurantImages.findMany({
      where: {
        restaurantId: resId,
      },
    });
    return images;
  } catch (err) {
    console.log(err);
  }
};
