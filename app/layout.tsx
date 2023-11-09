import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Zomaaato",
  description: "A fullstack clone of Zomato. (A food delivery app)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(poppins.className, "relative")}>
          <NextTopLoader
            height={4}
            color="rgb(239, 79, 95)"
            showSpinner={false}
          />
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
