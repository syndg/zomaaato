import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";

export default async function Admin() {
  return (
    <div>
      <header>
        <nav className="flex items-center justify-between px-5 py-4">
          <Link href="/">
            <Image
              src="/zomato.png"
              height={30}
              width={130}
              alt="Zomato logo"
            />
            <span className="block leading-5 text-right font-bold italic -translate-x-[5px] text-lg text-zomato-red">
              Clone
            </span>
          </Link>
          <div className="flex items-center px-3 py-2 gap-3 border-2 border-gray-300 hover:border-zomato-red/50 rounded-lg transition-colors duration-200">
            <h1 className="text-lg font-semibold">Admin</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
        </nav>
      </header>
      {/* <h1>Admin</h1>
      <p>Hello {user.name}</p> */}
    </div>
  );
}
