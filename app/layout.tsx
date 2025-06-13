import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { Header } from "@/components/header";
import { InstallPrompt } from "@/components/InstallPrompt";

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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Calories Tracker" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#ffffff" />
        <script src="/register-service-worker.js" defer></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <Header />
        <main>
          {children}
        </main>
        <Toaster />
        <InstallPrompt />
      </body>
    </html>
  );
}
