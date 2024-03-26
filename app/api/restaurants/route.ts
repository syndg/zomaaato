import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const id = (await currentUser())?.id;
  console.log(id);

  const { latitude, longitude, city, pincode, fullAddress, ...rest } =
    await req.json();

  const addressJson = {
    city,
    pincode,
    fullAddress,
  } as Prisma.JsonObject;

  try {
    const restaurant = await db.restaurant.create({
      data: {
        ownerId: id,
        address: addressJson,
        lat: parseFloat(latitude),
        lon: parseFloat(longitude),
        ...rest,
      },
    });

    console.log(restaurant);
    return NextResponse.json(restaurant);
  } catch (error) {
    console.log("[RESTAURANT-POST]: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
