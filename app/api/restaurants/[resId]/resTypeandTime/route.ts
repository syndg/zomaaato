import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { resId: string } },
) {
  const { resId } = params;
  const { open, close, ...rest } = await req.json();

  const times = {
    open: open,
    close: close,
  } as Prisma.JsonObject;

  try {
    const resTypeandTime = await db.restaurantTypeTimings.create({
      data: {
        restaurantId: resId,
        timingSlots: times,
        ...rest,
      },
    });

    console.log(resTypeandTime);
    return NextResponse.json(resTypeandTime);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { resId: string } },
) {
  const { resId } = params;
  const { open, close, ...rest } = await req.json();

  const times = {
    open: open,
    close: close,
  } as Prisma.JsonObject;

  try {
    const resTypeandTime = await db.restaurantTypeTimings.update({
      where: {
        restaurantId: resId,
      },
      data: {
        timingSlots: times,
        ...rest,
      },
    });

    console.log("[PATCH]", resTypeandTime);
    return NextResponse.json(resTypeandTime);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
