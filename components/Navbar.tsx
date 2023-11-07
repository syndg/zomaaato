import { getUserFromDb } from "@/actions/getUserFromDb";
import UserButton from "@/components/UserButton";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const user = await getUserFromDb();

  return (
    <header>
      <nav className="flex items-center justify-between px-5 py-4">
        <Link href="/">
          <Image src="/zomato.png" height={30} width={130} alt="Zomato logo" />
          <span className="block leading-5 text-right font-bold italic -translate-x-[5px] text-lg text-zomato-red">
            Clone
          </span>
        </Link>
        <UserButton user={user} />
      </nav>
    </header>
  );
};

export default Navbar;