import { UserButton, SignOutButton, currentUser } from "@clerk/nextjs";

export default async function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
