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
import { CreateEmpleado } from "@/services/empleados/empleados";
import { CreateEmpleados, Empleados } from "@/types/indes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface CreateFormProps {
}

const CreateFormEmpleados: FC<CreateFormProps> = () => {
  const [empleadoData, setempleadoData] = useState<CreateEmpleados>({
    nombre: "",
    cedula_Pasaporte: "",
    puesto: "",
    departamento: "",
  });
  const session = useSession();

  
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setempleadoData({
      ...empleadoData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await CreateEmpleado(empleadoData, session.data?.accessToken);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Empleado creado exitosamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error creando empleado:", error);
    }
  };

  return (
    <div>
      
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" >Agregar Empleado</Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Agregar Empleado</DialogTitle>
            <DialogDescription>Introduzca los datos del Empleado.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={empleadoData.nombre}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cedula_Pasaporte" className="text-right">
                Cedula/Pasaporte
              </Label>
              <Input
                id="cedula_Pasaporte"
                name="cedula_Pasaporte"
                value={empleadoData.cedula_Pasaporte}
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
                value={empleadoData.puesto}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="departamento" className="text-right">
                Departamento
              </Label>
              <Input
                id="departamento"
                name="departamento"
                value={empleadoData.departamento}
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
            <Button type="submit" className="relative left-[120px]">Agregar Usuario</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default CreateFormEmpleados;
