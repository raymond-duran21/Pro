"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import React, { useMemo } from "react";

interface ISidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
}

const ItemSidebar = ({item}:{item: ISidebarItem}) => {

    const {name, icon: Icon, path} = item;

    const router = useRouter();
    const pathname = usePathname();

    const onClick = () =>{
        router.push(path);
    }

    const isActive = useMemo (() => {
       return path === pathname;
    },[path,pathname])

    return(
        <div className={`flex items-center space-x-5 p-6 rounded-lg hover:bg-sidebar-background cursor-pointer hover:text-sidebar-active ${isActive && "bg-sidebar-background text-sidebar-active"}` }
         onClick={onClick}
        >
            <Icon size={18}/>
            <p className="text-sm font-semibold">
            {name}
            </p>
        </div>
    );
}

export default ItemSidebar;