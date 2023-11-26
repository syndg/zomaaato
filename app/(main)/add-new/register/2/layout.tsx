import Image from "next/image";

export default function FormPage2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-2">
      {children}
      <div className="hidden sticky top-[8.2rem] right-0 h-[80vh] lg:grid place-content-center">
        <div className="relative w-[420px] h-[420px]">
          <Image
            src="/form2.webp"
            className="scale-95"
            alt="Picture of a clock"
            fill
          />
        </div>
      </div>
    </div>
  );
}
