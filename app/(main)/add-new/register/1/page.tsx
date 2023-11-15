import Formstep1 from "@/components/forms/FormStep1";
import { getRestaurant } from "@/actions/getRestaurant";

export default async function FormPage({
  searchParams,
}: {
  searchParams: { [res_id: string]: string };
}) {
  const { res_id } = searchParams;
  const restaurant = await getRestaurant(res_id ? res_id : "");

  return <Formstep1 initialValues={restaurant} />;
}
