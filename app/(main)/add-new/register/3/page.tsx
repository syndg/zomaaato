import ResImageUploader from "@/components/ResImageUploader";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function FormPage3({
  searchParams,
}: {
  searchParams: { [res_id: string]: string };
}) {
  const { res_id } = searchParams;
  const resImages = await db.restaurantImages.findMany({
    where: {
      restaurantId: res_id,
    },
  });

  if (!res_id) {
    redirect("/add-new/register/1");
  }
  return <ResImageUploader resId={res_id} dbImages={resImages} />;
}
