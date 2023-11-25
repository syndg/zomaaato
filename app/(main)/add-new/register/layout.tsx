import StepVisualizer from "@/components/StepVisualizer";

export default function RegisterPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-[60px] p-3 z-10 w-full bg-background/70 backdrop-blur-md border-b border-gray-200/80">
        <StepVisualizer totalSteps={3} />
      </div>
      {children}
    </>
  );
}
