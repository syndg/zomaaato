import Formstep1 from "@/components/forms/FormStep1";
import { db } from "@/lib/db";

export default async function FormPage({
  searchParams,
}: {
  searchParams: { [res_id: string]: string };
}) {
  const { res_id } = searchParams;

  if (!res_id) {
    return <Formstep1 />;
  }

  const restaurant = await db.restaurant.findUnique({
    where: {
      id: res_id,
    },
  });

  return <Formstep1 initialValues={restaurant} />;
}
