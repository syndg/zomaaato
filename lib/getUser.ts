import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const currUser = await currentUser();

  if (!currUser) {
    return redirect("/login");
  }

  const dbUser = await db.user.findUnique({
    where: {
      id: currUser.id,
    },
  });

  if (!dbUser) {
    const newUser = await db.user.create({
      data: {
        id: currUser.id,
        email: currUser.emailAddresses[0].emailAddress,
        name: `${currUser.firstName} ${currUser.lastName}`,
      },
    });
    return newUser;
  }

  return dbUser;
};
