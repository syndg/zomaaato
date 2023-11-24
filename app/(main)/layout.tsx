import Navbar from "@/components/Navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100svh]">
      <Navbar />
      <main className="max-w-[1200px] mx-auto">{children}</main>
    </div>
  );
}
