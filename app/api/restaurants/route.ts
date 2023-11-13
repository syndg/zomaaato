import { NextResponse } from "next/server";
import { getUserFromDb } from "@/actions/getUserFromDb";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const user = await getUserFromDb();
  const id = user?.id;

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
