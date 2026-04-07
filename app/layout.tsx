import type { Metadata } from "next";
import "./globals.css";
import { inclusiveSans } from "@/lib/fonts";
import Providers from "./providers";
import { Header } from "@/lib/components/organisms/header/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

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
    <html
      lang="en"
      className={inclusiveSans.className}
      suppressHydrationWarning
    >
      <body className="background">
        <Providers>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <div className="flex flex-col gap-y-12 justify-center w-10/12 max-w-5xl mx-auto my-8">
              {children}
            </div>
          </SidebarInset>
        </Providers>
      </body>
    </html>
  );
}
