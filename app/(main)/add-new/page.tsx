import { getUserFromDb } from "@/actions/getUserFromDb";
import { PlusCircle } from "lucide-react";
import { db } from "@/lib/db";
import Link from "next/link";

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
          <Link
            href="/add-new/register/1"
            className="flex items-center gap-2 bg-zomato-red hover:bg-zomato-red/90 py-2 px-3 text-white sm:text-xl text-md rounded-lg transition-colors duration-200"
          >
            Add new
            <PlusCircle size={22} />
          </Link>
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
