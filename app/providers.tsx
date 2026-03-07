// app/providers.tsx
"use client";

import { ImageKitProvider as ImageKitContextProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
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
      <ImageKitProvider>{children}</ImageKitProvider>
    </AuthProvider>
  );
};

export default Providers;
