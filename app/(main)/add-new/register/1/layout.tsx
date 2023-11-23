import Image from "next/image";

export default function FormPage1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      {children}
      <div className="grid place-content-center">
        <div className="hidden md:block relative w-[500px] h-[500px]">
          <Image
            src="/form1.jpg"
            className="scale-95"
            alt="Picture of a cafe/restaurant."
            fill
          />
        </div>
      </div>
    </div>
  );
}
