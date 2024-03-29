import Image from "next/image";

export default function FormPage2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-2">
      {children}
      <div className="hidden sticky top-[8rem] right-0 h-[75vh] lg:grid place-content-center">
        <div className="relative w-[450px] h-[450px]">
          <Image
            src="/form1.jpg"
            className="scale-95"
            alt="Picture of a clock"
            fill
          />
        </div>
      </div>
    </div>
  );
}
