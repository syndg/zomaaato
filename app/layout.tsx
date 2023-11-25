import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import type { Metadata } from "next";

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
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
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
