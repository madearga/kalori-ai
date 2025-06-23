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
  title: "Kalori-AI | Analisis Kalori Makanan dengan AI",
  description: "Upload foto makanan dan dapatkan analisis kalori serta nutrisi instan menggunakan AI. Lacak makronutrien, identifikasi bahan makanan, dan buat keputusan diet yang tepat.",
  keywords: ["kalori tracker", "analisis makanan", "AI nutrisi", "pelacakan makanan", "perencanaan diet", "kalori AI"],
  authors: [{ name: "maux ai" }],
  creator: "maux ai",
  openGraph: {
    title: "Kalori-AI | Analisis Kalori Makanan dengan AI",
    description: "Upload foto makanan dan dapatkan analisis kalori serta nutrisi instan menggunakan AI.",
    type: "website",
    siteName: "Kalori-AI",
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
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kalori-AI" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/logo.png" />
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
