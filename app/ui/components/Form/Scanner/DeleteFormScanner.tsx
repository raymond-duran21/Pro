import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { DeleteEmpleados } from "@/services/empleados/empleados";
import { DeleteDockings } from "@/services/equipos/docking";
import { DeleteMonitor } from "@/services/equipos/monitor";
import { DeleteScanner } from "@/services/equipos/scanner";
import { UserX } from "lucide-react";
import { FC } from "react"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


  interface DeleteFormProps {
    id: Number
  }

  const DeleteDialogScanner: FC<DeleteFormProps> =({
    id,
}) => {


    const handleSubmit = async () => {
        try {
          const result = await DeleteScanner(id);
          if (result.flag === false) {
            toast.error(result.message);
            console.log(result.message);
          }
          else {
            toast.success("Scanner eliminado exitosamente");
            setTimeout(() => {window.location.reload();},2000);
          }
        } catch (error) {
          console.error("Error Eliminando scanner:", error);
        }
      };

    return(
    <AlertDialog>
    <AlertDialogTrigger>
        <Button
         className=" hidden h-8 w-8 p-0 lg:flex bg-red-600">
        <UserX className="w-auto"/>
         </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Estas seguro que quieres eliminar este scanner?</AlertDialogTitle>
        <AlertDialogDescription>
        Esta acción no se puede deshacer. Esto eliminará permanentemente 
        el Scanner y eliminará sus datos de nuestros servidores.
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleSubmit}>Borrar</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
    );
    }

export default DeleteDialogScanner;