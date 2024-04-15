import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreateEmpleado, UpdateEmpleados, getEmpleadosById } from "@/services/empleados/empleados";
import { CreateEmpleados, Empleados, UpdateEmpleado } from "@/types/indes";
import { PenSquareIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface UpdateFormProps {
    id: number,
}

const UpdateFormEmpleados: FC<UpdateFormProps> = ({
    id,
}) => {
  const [employeeData, setEmployeeData] = useState<UpdateEmpleado>({
    id:id,
    puesto: "",
    departamento: "",
  });
  const session = useSession();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmpleadosById(id);
        setEmployeeData(response);
      } catch (error) {
        console.error('Error al obtener datos de empleados:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeData({
      ...employeeData,
      [event.target.name]: event.target.value,
    });
    console.log(employeeData);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await UpdateEmpleados(employeeData.id, employeeData, session.data?.accessToken);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Empleado Actualizado exitosamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error Actualizando empleado:", error);
    }
  };
  
  return (
    <div>
      
      <Dialog>
      <DialogTrigger >
        <Button
         className="hidden h-8 w-8 p-0 lg:flex bg-green-500">
         <PenSquareIcon className="w-auto"/>
         </Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Editar Empleado</DialogTitle>
            <DialogDescription>Introduzca los datos del Empleado que quiere editar.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  Id
                </Label>
                <Input
                  id="id"
                  name="id"
                  value={employeeData.id}
                  disabled={true}
                  onChange={handleChange}
                  className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="puesto" className="text-right">
                  Puesto
                </Label>
                <Input
                  id="puesto"
                  name="puesto"
                  value={employeeData.puesto}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="entidad" className="text-right">
                Departamento
              </Label>
              <Input
                id="departamento"
                name="departamento"
                value={employeeData.departamento}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className=" relative left-10 px-4">
              Close
            </Button>
          </DialogClose>
            <Button type="submit" className="relative left-[120px]">Actualizar Usuario</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default UpdateFormEmpleados;