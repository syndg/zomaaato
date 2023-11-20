import UserButton from "@/components/UserButton";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  return (
    <header className="z-20 sticky top-0 bg-white/70 backdrop-blur-sm border-b border-gray-300">
      <nav className="flex items-center justify-between px-5 py-2 max-w-[1200px] mx-auto">
        <Link href="/">
          <Image src="/zomato.png" height={30} width={110} alt="Zomato logo" />
          <span className="block leading-5 text-right font-bold italic -translate-x-[5px] text-lg text-primary">
            Clone
          </span>
        </Link>
        <UserButton />
      </nav>
    </header>
  );
};

export default Navbar;
