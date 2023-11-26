import Link from "next/link";
import ResListCard from "@/components/ResListCard";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { currentUser } from "@clerk/nextjs";

export default async function AddNew() {
  const id = (await currentUser())?.id;

  const restaurants = await db.restaurant.findMany({
    where: {
      ownerId: id,
    },
    include: {
      images: true,
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
              className="text-xl rounded-lg font-cemibold gap-2 active:scale-95 transition-all duration-100"
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
    <div className="flex flex-col p-5 gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {restaurants.map(({ id, name, images, address }) => (
          <ResListCard
            key={id}
            id={id}
            name={name}
            image={images[0]}
            address={address}
          />
        ))}
      </div>
      <Button size="sm" asChild>
        <Link
          href="/add-new/register/1"
          className="self-start mx-auto text-xl rounded-lg font-semibold gap-2 active:scale-95 transition-all duration-100"
        >
          Add new
          <PlusCircle size={22} />
        </Link>
      </Button>
    </div>
  );
}
