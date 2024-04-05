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
import { getFlotasById, UpdateFlotas } from "@/services/equipos/flota";
import { getMonitorById, UpdateMonitores } from "@/services/equipos/monitor";
import { getScannerById, UpdateScanner } from "@/services/equipos/scanner";
import { UpdateDocking, UpdateEquipo, UpdateFlota, UpdateMonitor, UpdateScanner_Ups } from "@/types/indes";
import { PenSquareIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface UpdateFormProps {
    id: number,
}

const UpdateFormFlotas: FC<UpdateFormProps> = ({
    id,
}) => {
  const [flotasData, setFlotasData] = useState<UpdateFlota>({
    id:id,
    numero: "",
    datos: "",
    direccion: "",
    edificio: "",
    observaciones: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFlotasById(id);
        setFlotasData(response);
      } catch (error) {
        console.error('Error al obtener datos de la flota:', error);
      }
    };
    fetchData();
    }, [id]);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlotasData({
      ...flotasData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFlotasData({
      ...flotasData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await UpdateFlotas(flotasData.id, flotasData);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Flota Actualizada Correctamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error Actualizando flota:", error);
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
            <DialogTitle>Editar Flota</DialogTitle>
            <DialogDescription>Introduzca los datos de la flota que quiere editar.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
            <div className="col-span-3 sm:col-span-2 md:col-span-2">
                <Label htmlFor="nombre" className="text-right">
                  Id
                </Label>
                <Input
                  id="id"
                  name="id"
                  value={flotasData.id}
                  disabled={true}
                  onChange={handleChange}
                  className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="numero" className="text-right">
                Numero
              </Label>
              <Input
                id="numero"
                name="numero"
                value={flotasData.numero}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="datos" className="text-right">
                Plan de Datos
              </Label>
              <Input
                id="datos"
                name="datos"
                value={flotasData.datos}
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
                value={flotasData.direccion}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edificio" className="text-right">
                Edificio
              </Label>
              <Input
                id="edificio"
                name="edificio"
                value={flotasData.edificio}
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
                value={flotasData.observaciones}
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
            <Button type="submit" className="relative left-[120px]">Actualizar Flota</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default UpdateFormFlotas;