import ResListCard from "@/components/ResListCard";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import AddNewButton from "@/components/AddNewButton";

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
          <AddNewButton />
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
            address={address as Prisma.JsonObject}
          />
        ))}
      </div>
      <AddNewButton />
    </div>
  );
}
