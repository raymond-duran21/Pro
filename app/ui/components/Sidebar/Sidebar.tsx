"use client";

import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { ClipboardPen, Computer, LayoutDashboard, LucideIcon, SquareUserRound } from 'lucide-react';
import React from "react";
import ItemSidebar from "./itemSidebar";

interface ISidebarItem {
    name: string;
    icon: LucideIcon;
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
        path: "/dashboard/equipos"
    },
    {
        name: "Asignaciones",
        icon: ClipboardPen,
        path: "/dashboard/asignaciones"
    }
]


export default function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-sidebar-barcolor shadow-lg z-10 p-4">
        <img src='/logo.png' alt="Logo MIVED" className=' flex  w-26 mx-auto'/>
        <div className='relative top-27 flex-col w-full space-y-8'>
        <div className="absolute inset-5 flex-col space-y-8 ">
        {items.map((item) => [
            <ItemSidebar key={item.path} item={item}/>
        ])}
        </div>
        </div>
        </div>
    );
}