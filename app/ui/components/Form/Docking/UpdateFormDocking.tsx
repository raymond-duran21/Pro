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
import { UpdateEmpleados, getEmpleadosById } from "@/services/empleados/empleados";
import { getDockingById,  UpdateDockings } from "@/services/equipos/docking";
import { UpdateEquipos, getEquiposById } from "@/services/equipos/equipos";
import { UpdateDocking, UpdateEquipo } from "@/types/indes";
import { PenSquareIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface UpdateFormProps {
    id: number,
}

const UpdateFormDocking: FC<UpdateFormProps> = ({
    id,
}) => {
  const [dockingData, setDockingData] = useState<UpdateDocking>({
    id:id,
    despacho_Ministro_Viceministerio: "",
    direccion: "",
    departamento: "",
    observaciones: "",
  });

  const session = useSession();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDockingById(id);
        setDockingData(response);
      } catch (error) {
        console.error('Error al obtener datos de empleados:', error);
      }
    };
    fetchData();
    }, [id]);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDockingData({
      ...dockingData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDockingData({
      ...dockingData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await UpdateDockings(dockingData.id, dockingData, session.data?.accessToken);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Docking Actualizado Correctamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error Actualizando docking:", error);
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
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Editar Docking</DialogTitle>
            <DialogDescription>Introduzca los datos del Docking que quiere editar.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Id
                </Label>
                <Input
                  id="id"
                  name="id"
                  value={dockingData.id}
                  disabled={true}
                  onChange={handleChange}
                  className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="despacho_Ministro_Viceministerio" className="text-right">
                  Despacho Ministro/Viceministerio
                </Label>
                <Input
                  id="despacho_Ministro_Viceministerio"
                  name="despacho_Ministro_Viceministerio"
                  value={dockingData.despacho_Ministro_Viceministerio}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Direccion
              </Label>
              <Input
                id="direccion"
                name="direccion"
                value={dockingData.direccion}
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
                value={dockingData.departamento}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="observaciones" className="text-right">
                Observaciones
              </Label>
              <Input
                id="observaciones"
                name="observaciones"
                value={dockingData.observaciones}
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
            <Button type="submit" className="relative left-[120px]">Actualizar Docking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default UpdateFormDocking;