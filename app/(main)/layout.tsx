import Navbar from "@/components/Navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="max-w-[1200px] mx-auto">{children}</div>
    </>
  );
}
