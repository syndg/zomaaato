import { getRestaurant } from "@/actions/getRestaurant";
import FormStep2 from "@/components/forms/FormStep2";
import { redirect } from "next/navigation";
import { getResTypeandTiming } from "@/actions/getRestaurant";
import { auth } from "@clerk/nextjs";

export default async function FormPage({
  searchParams,
}: {
  searchParams: { [res_id: string]: string };
}) {
  const { res_id } = searchParams;
  const restaurant = await getRestaurant(res_id);
  const resTypeandTiming = await getResTypeandTiming(res_id);
  const { userId } = auth();

  if (!res_id || !restaurant) {
    redirect("/add-new/register/1");
  }

  if (userId !== restaurant.ownerId) {
    return (
      <div className="min-h-[80vh] grid place-content-center">
        <p className="p-3 border border-primary rounded-md">
          You are not the owner of this restaurant
        </p>
      </div>
    );
  }

  return <FormStep2 resId={res_id} initialValues={resTypeandTiming} />;
}
