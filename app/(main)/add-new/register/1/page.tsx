import Formstep1 from "@/components/forms/FormStep1";
import { getRestaurant } from "@/actions/getRestaurant";
import { auth } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default async function FormPage({
  searchParams,
}: {
  searchParams: { [res_id: string]: string };
}) {
  const { userId } = auth();
  const { res_id } = searchParams;
  const restaurant = await getRestaurant(res_id);
  const isOwner = userId === restaurant?.ownerId;

  if (res_id && !isOwner) {
    return (
      <div className="min-h-[80vh] grid place-content-center">
        <p className="p-3 border border-primary rounded-md">
          You are not the owner of this restaurant
        </p>
      </div>
    );
  }

  return <Formstep1 initialValues={restaurant} />;
}
