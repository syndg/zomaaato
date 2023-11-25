import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { resId: string } },
) {
  const { resId } = params;
  const body = await req.json();

  try {
    const restaurant = await db.restaurant.update({
      where: {
        id: resId,
      },
      data: {
        ...body,
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
