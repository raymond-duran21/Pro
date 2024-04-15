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
import { UpdateTabletas } from "@/services/equipos/tabletas";
import { UpdateDocking, UpdateEquipo, UpdateFlota, UpdateMonitor, UpdateScanner_Ups, UpdateTableta } from "@/types/indes";
import { PenSquareIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface UpdateFormProps {
    id: number,
}

const UpdateFormTabletas: FC<UpdateFormProps> = ({
    id,
}) => {
  const [tabletaData, setTabletaData] = useState<UpdateTableta>({
    id:id,
    numero: "",
    direccion: "",
    edificio: "",
    observaciones: "",
  });

  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFlotasById(id);
        setTabletaData(response);
      } catch (error) {
        console.error('Error al obtener datos de la flota:', error);
      }
    };
    fetchData();
    }, [id]);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabletaData({
      ...tabletaData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTabletaData({
      ...tabletaData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await UpdateTabletas(tabletaData.id, tabletaData, session.data?.accessToken);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Tableta Actualizada Correctamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error Actualizando tableta:", error);
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
            <DialogTitle>Editar Tableta</DialogTitle>
            <DialogDescription>Introduzca los datos de la tableta que quiere editar.</DialogDescription>
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
                  value={tabletaData.id}
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
                value={tabletaData.numero}
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
                value={tabletaData.direccion}
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
                value={tabletaData.edificio}
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
                value={tabletaData.observaciones}
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
            <Button type="submit" className="relative left-[120px]">Actualizar Tableta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default UpdateFormTabletas;