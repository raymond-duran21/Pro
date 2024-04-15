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
import { UpdateEquipos, getEquiposById, getEquiposBySerial } from "@/services/equipos/equipos";
import { EquipoWithPrograma, Monitor, Other, UpdateEquipo } from "@/types/indes";
import { PenSquareIcon, ViewIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react";
import axios from "axios";


interface ViewFormProps {
    serial: string | undefined,
    tipo: string
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

const ViewFormOther: FC<ViewFormProps> = ({
    serial,
    tipo
}) => {
  const [equipoData, setEquipoData] = useState<Other>({
    id: 0,
    tipo: "",
    marca: "",
    modelo: "",
    serial: "",
    direccion: "",
    departamento: "",
    observaciones: "",
    empleados_Cedula: "",
    estado: "",
    fechaAsignacion: "",
  });
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Other>(`${apiUrl}/${tipo}/BySerial/${serial}`);
        setEquipoData(response.data);
      } catch (error) {
        console.error('Error al obtener datos de los equipos:', error);
      }
    };
    fetchData();
    }, [serial, tipo]);

  return (
    <div>
      <Dialog>
      <DialogTrigger >
        <Button
         className="hidden h-8 w-8 p-0 lg:flex">
         <ViewIcon className="w-auto"/>
         </Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>Informacion Equipo</DialogTitle>
          </DialogHeader>
          <div>
          </div>
          <form >
            <div className="">
                <Label htmlFor="id" className="flex text-right justify-between font-medium">
                  Id : {equipoData.id}
                </Label>
                
            </div>
            <div className="">
                <Label htmlFor="tipo" className="flex text-right justify-between">
                  Tipo : {equipoData.tipo}
                </Label>
                
            </div>
            <div className="">
                <Label htmlFor="marca" className="flex text-right justify-between">
                  Marca : {equipoData.marca}
                </Label>
                
            </div>
            <div className="">
                <Label htmlFor="modelo" className="flex text-right justify-between">
                  Modelo : {equipoData.modelo}
                </Label>
                
            </div>
            <div className="">
                <Label htmlFor="serial" className="flex text-right justify-between">
                  Serial : {equipoData.serial}
                </Label>
                
            </div>
            <div className="">
                <Label htmlFor="direccion" className="flex text-right justify-between">
                  Direccion : {equipoData.direccion}
                </Label>
            </div>
            <div className="">
                <Label htmlFor="departamento" className="flex text-right justify-between">
                  Departamento : {equipoData.departamento}
                </Label>
                
              </div>
              <div className="">
                <Label htmlFor="empleados_Cedula" className="flex text-right justify-between">
                  Empleado Cedula : {equipoData.empleados_Cedula}
                </Label>
                
              </div>
              <div className="">
                <Label htmlFor="observaciones" className="flex text-right justify-between">
                  Observaciones : {equipoData.observaciones}
                </Label>
                
              </div>
              <div className="">
                <Label htmlFor="estado" className="flex text-right justify-between">
                  Estado : {equipoData.estado}
                </Label>
                
              </div>
              <div className="">
                <Label htmlFor="fechaAsignacion" className="flex text-right justify-between">
                  Fecha de Asignacion : {equipoData.fechaAsignacion}
                </Label>
                
              </div>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default ViewFormOther;