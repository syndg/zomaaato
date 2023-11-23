import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import { utapi } from "@/app/api/uploadthing/core";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { resId: string } },
) {
  const resId = params.resId;
  const id = req.nextUrl.searchParams.get("id");
  const utKey = req.nextUrl.searchParams.get("utKey");

  if (!resId || !id || !utKey) {
    return new NextResponse("Invalid request", { status: 400 });
  }

  try {
    const deletedImage = await db.restaurantImages.delete({
      where: {
        id,
      },
    });

    await utapi.deleteFiles(`${utKey}`);

    console.log("DELETED IMAGE", deletedImage);
    return NextResponse.json(deletedImage);
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
