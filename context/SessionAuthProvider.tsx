'use client';

import React, { ReactNode } from 'react'
import { SessionProvider } from "next-auth/react"

interface Props{
    children: ReactNode
}

const SessionAuthProvider = ({children}: Props) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SessionAuthProvider