import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/add-new" className="text-zomato-red">
        Add a restaurant
      </Link>
      <UserButton />
    </div>
  );
}
