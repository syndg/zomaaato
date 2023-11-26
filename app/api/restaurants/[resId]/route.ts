import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { resId: string } },
) {
  const { resId } = params;
  const { lat, lng, city, pincode, fullAddress, ...rest } = await req.json();
  const addressJson = {
    lat,
    lng,
    city,
    pincode,
    fullAddress,
  } as Prisma.JsonObject;

  try {
    const restaurant = await db.restaurant.update({
      where: {
        id: resId,
      },
      data: {
        address: addressJson,
        ...rest,
      },
    });

    return NextResponse.json(restaurant);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { resId: string } },
) {
  const { resId } = params;

  try {
    const deletedRestaurant = await db.restaurant.delete({
      where: {
        id: resId,
      },
    });

    return NextResponse.json(deletedRestaurant);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
