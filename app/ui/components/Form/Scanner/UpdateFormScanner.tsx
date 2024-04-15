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
import { getMonitorById, UpdateMonitores } from "@/services/equipos/monitor";
import { getScannerById, UpdateScanner } from "@/services/equipos/scanner";
import { UpdateDocking, UpdateEquipo, UpdateMonitor, UpdateScanner_Ups } from "@/types/indes";
import { PenSquareIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface UpdateFormProps {
    id: number,
}

const UpdateFormScanner: FC<UpdateFormProps> = ({
    id,
}) => {
  const [scannerData, setScannerData] = useState<UpdateScanner_Ups>({
    id:id,
    direccion: "",
    departamento: "",
    observaciones: "",
  });
  
  const session = useSession();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getScannerById(id);
        setScannerData(response);
      } catch (error) {
        console.error('Error al obtener datos de empleados:', error);
      }
    };
    fetchData();
    }, [id]);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScannerData({
      ...scannerData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setScannerData({
      ...scannerData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await UpdateScanner(scannerData.id, scannerData, session.data?.accessToken);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Scanner Actualizado Correctamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error Actualizando scanner:", error);
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
            <DialogTitle>Editar Scanner</DialogTitle>
            <DialogDescription>Introduzca los datos del Scanner que quiere editar.</DialogDescription>
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
                  value={scannerData.id}
                  disabled={true}
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
                value={scannerData.direccion}
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
                value={scannerData.departamento}
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
                value={scannerData.observaciones}
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
            <Button type="submit" className="relative left-[120px]">Actualizar Scanner</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default UpdateFormScanner;