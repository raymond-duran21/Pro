'use client';

import React, { ReactNode } from 'react'
import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from "@chakra-ui/next-js";


export function SessionAuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={4 * 60}
      refetchOnWindowFocus={true}
    >
      
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
