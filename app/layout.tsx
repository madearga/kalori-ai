import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { Header } from "@/components/header";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "Calorie Tracker | AI-Powered Food Analysis",
  description: "Upload food images and get instant calorie counts and nutritional analysis powered by advanced AI. Track macronutrients, identify ingredients, and make informed dietary choices.",
  keywords: ["calorie tracker", "food analysis", "AI nutrition", "meal tracking", "diet planning"],
  authors: [{ name: "maux ai" }],
  creator: "maux ai",
  openGraph: {
    title: "Calorie Tracker | AI-Powered Food Analysis",
    description: "Upload food images and get instant calorie counts and nutritional analysis powered by advanced AI.",
    type: "website",
    siteName: "Calorie Tracker",
  },

  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <Header />
        <main>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
