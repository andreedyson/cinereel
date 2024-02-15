import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/lib/Providers";
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "CineReel",
  description: "Find and Review your favorite movies.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="mx-auto max-w-[1920px] bg-[#191919] text-white">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
