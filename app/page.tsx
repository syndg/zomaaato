import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <Link href="/admin">Admin page</Link>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
