// app/providers.tsx
"use client";

import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ImageKitProvider urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT}>
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
};

export default AuthProvider;
