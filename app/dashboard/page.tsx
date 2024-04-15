'use client'

import { useEffect } from "react";
import EchartsBarChart from "../ui/components/Graphics/BarChart";
import EchartsPieChart from "../ui/components/Graphics/PieChart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const router = useRouter();

      const { data: session, status } = useSession();
    
      useEffect(() => {
        if (status === "unauthenticated") {
          // Redirigir al login
          router.push("/");
        }
      }, [session, status]);


    return (
        <div className=" relative top-[100px] right-[300px]">
          <h1 className=" relative text-6xl bottom-[80px] left-[130px] opacity-40">APP INVENTARIO TIC</h1>
          <EchartsPieChart/>
        </div>
    )
  }