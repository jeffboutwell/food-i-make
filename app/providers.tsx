// app/providers.tsx
"use client";

import { ImageKitProvider as ImageKitContextProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

const ImageKitProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageKitContextProvider
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""}
    >
      {children}
    </ImageKitContextProvider>
  );
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="theme-preference"
      >
        <ImageKitProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ImageKitProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Providers;
