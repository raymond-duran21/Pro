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
import { DeleteEquipos } from "@/services/equipos/equipos";
import { UserX } from "lucide-react";
import { FC } from "react"


  interface DeleteFormProps {
    id: Number
  }

  const DeleteDialogEquipos: FC<DeleteFormProps> =({
    id,
}) => {


    const handleSubmit = async () => {
        try {
          const result = await DeleteEquipos(id);
          console.log("Empleado Eliminado Correctamente:",result);
          window.location.reload();
          
        } catch (error) {
          console.error("Error Eliminando empleado:", error);
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
        <AlertDialogTitle>Estas seguro que quieres eliminar este empleado?</AlertDialogTitle>
        <AlertDialogDescription>
        Esta acción no se puede deshacer. Esto eliminará permanentemente 
        el Empleado y eliminará sus datos de nuestros servidores.
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

export default DeleteDialogEquipos;