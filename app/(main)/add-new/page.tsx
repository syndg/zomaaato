import { getUserFromDb } from "@/actions/getUserFromDb";
import { PlusCircle } from "lucide-react";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AddNew() {
  const user = await getUserFromDb();
  const id = user?.id;

  const restaurants = await db.restaurant.findMany({
    where: {
      ownerId: id,
    },
  });

  if (restaurants.length === 0) {
    return (
      <div className="h-[80vh] grid place-content-center gap-5 text-gray-700 font-semibold">
        <p className="md:text-2xl sm:text-xl text-lg">
          You do not have any restaurants listed.
        </p>
        <div className="flex justify-center">
          <Button size="sm" asChild>
            <Link
              href="/add-new/register/1"
              className="text-xl rounded-lg font-semibold gap-2"
            >
              Add new
              <PlusCircle size={22} />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}
