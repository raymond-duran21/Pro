"use client";
import { AppWindow, ClipboardPen, Computer, LayoutDashboard, LucideIcon, SquareUserRound } from 'lucide-react';
import React from "react";
import ItemSidebar from "./itemSidebar";
import ButtonLogOut from '../SignOut';
import { useSession } from 'next-auth/react';

interface ISidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
    items?: ISubItem[];
}

interface ISubItem {
    name: string;
    path: string;
  }



const items: ISidebarItem[] = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },
    {
        name: "Empleados",
        icon: SquareUserRound,
        path: "/dashboard/empleados"
    },
    
    {
        name: "Equipos",
        icon: Computer,
        path: "/dashboard/equipos",
        items: [
            {
                name: "General",
                path: "/dashboard/equipos"
            },
            {
                name: "CPU/Laptop",
                path: "/dashboard/equipos/cpu-laptop"
            },
            {
                name: "Monitor",
                path: "/dashboard/equipos/monitor"
            },
            {
                name: "Scanner",
                path: "/dashboard/equipos/scanner"
            },
            {
                name: "Docking Station",
                path: "/dashboard/equipos/docking-station"
            },
            {
                name: "UPS",
                path: "/dashboard/equipos/ups"
            },
            {
                name: "Impresora Local",
                path: "/dashboard/equipos/impresora-local"
            },
            {
                name: "Flotas",
                path: "/dashboard/equipos/flotas"
            },
            {
                name: "Tabletas",
                path: "/dashboard/equipos/tabletas"
            },
        ]
    },
    {
        name: "Asignaciones",
        icon: ClipboardPen,
        path: "/dashboard/asignaciones"
    },
    {
        name: "Programas",
        icon: AppWindow,
        path: "/dashboard/programas"
    },
    
];


export default function Sidebar() {
    
    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-sidebar-barcolor shadow-lg z-10 p-4">
        <div className='flex flex-col space-y-12 w-full'>
        <img src='/logo.png' alt="Logo MIVED" className=' flex  w-26 mx-auto'/>
        <div className="flex flex-col space-y-2 ">
        {items.map((item, index) => (
            <ItemSidebar key={index} item={item} />
          ))}
        <div className="flex flex-col space-y-2 ">
        <ButtonLogOut/>
        </div>
        </div>
        </div>
        </div>
    );
}