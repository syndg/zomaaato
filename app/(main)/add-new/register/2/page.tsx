import { getRestaurant } from "@/actions/getRestaurant";
import FormStep2 from "@/components/forms/FormStep2";
import { redirect } from "next/navigation";

export default async function FormPage({
  searchParams,
}: {
  searchParams: { [res_id: string]: string };
}) {
  const { res_id } = searchParams;
  const restaurant = await getRestaurant(res_id);

  if (!res_id || !restaurant) {
    redirect("/add-new/register/1");
  }

  return <FormStep2 />;
}
