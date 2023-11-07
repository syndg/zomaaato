import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid place-content-center h-screen">
      {children}
      <p className="text-center text-lg mt-10">
        Back to{" "}
        <Link href="/" className="text-zomato-red font-semibold">
          Homepage
        </Link>
      </p>
    </div>
  );
}
