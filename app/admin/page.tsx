import { UserButton } from "@clerk/nextjs";
import { getUser } from "@/lib/getUser";

export default async function Admin() {
  const user = await getUser();
  return (
    <div>
      <h1>Admin</h1>
      <p>Hello {user.name}</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
