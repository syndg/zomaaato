import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export async function POST(req: Request) {
  const id = (await currentUser())?.id;

  const body = await req.json();
  try {
    const restaurant = await db.restaurant.create({
      data: {
        ownerId: id,
        ...body,
      },
    });

    console.log(restaurant);
    return NextResponse.json(restaurant);
  } catch (error) {
    console.log("[RESTAURANT-POST]: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
