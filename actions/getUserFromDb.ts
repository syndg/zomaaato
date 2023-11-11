import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export const getUserFromDb = async () => {
  const currUser = await currentUser();

  if (!currUser) {
    return;
  }

  const { id } = currUser;

  const dbUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!dbUser) {
    throw new Error("User not found");
  }

  return { id, dbUser };
};
