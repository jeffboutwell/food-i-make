import type { Metadata } from "next";
import "./globals.css";
import { bitter } from "@/lib/fonts";
import { Inter } from "next/font/google";
import { TopMenu } from "@/lib/components/molecules/top-menu/top-menu";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Food I Make",
  description: "A collection of my favorite (mostly) vegan recipes.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: true,
  manifest: "site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${bitter.className} background`}>
        <main className="RootLayout__main flex flex-col items-center justify-center px-8">
          <TopMenu />
          {children}
        </main>
      </body>
    </html>
  );
}
