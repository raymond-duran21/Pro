'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

    

const Equipos = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirigir al login
      router.push("/");
    }
  }, [session, status]);
  
    return <div>Equipos</div>;
  };
  
  export default Equipos;