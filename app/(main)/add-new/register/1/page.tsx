import Formstep1 from "@/components/FormStep1";
import { db } from "@/lib/db";

export default async function Page() {
  // Dummy data
  const restaurants = await db.restaurant.findUnique({
    where: {
      id: "hello",
    },
  });

  return <Formstep1 initialValues={restaurants} />;
}
