import { getUserFromDb } from "@/actions/getUserFromDb";
import UserButton from "@/components/UserButton";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const user = await getUserFromDb();
  const dbUser = user?.dbUser;

  return (
    <header className="z-20 sticky top-0 bg-white/70 backdrop-blur-sm">
      <nav className="flex items-center justify-between px-5 py-4 max-w-[1200px] mx-auto">
        <Link href="/">
          <Image src="/zomato.png" height={30} width={125} alt="Zomato logo" />
          <span className="block leading-5 text-right font-bold italic -translate-x-[5px] text-lg text-zomato-red">
            Clone
          </span>
        </Link>
        <UserButton user={dbUser} />
      </nav>
    </header>
  );
};

export default Navbar;
