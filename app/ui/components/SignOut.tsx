import { clearCache } from "@/utils/clearCache";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";



const ButtonLogOut = () => {
  return (
    <div className="flex align-text-top p-3 space-x-2 ">
    <LogOut size={20}/>
    <button onClick={() => {signOut();
                            }} className="text-sm font-semibold">Cerrar sesión</button>
    </div>
  );
};

export default ButtonLogOut;