import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { MainNav } from "../components/MainNav";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Koala Academy",
  description: "Koala Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider signUpForceRedirectUrl={"/"}>
          <ConvexClientProvider>
            <MainNav />
            {children}

            <Toaster />
            {/* <Footer /> */}
          </ConvexClientProvider>
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  );
}
