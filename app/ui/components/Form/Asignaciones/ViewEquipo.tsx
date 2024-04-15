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
import { EquipoWithPrograma, UpdateEquipo } from "@/types/indes";
import { PenSquareIcon, ViewIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react";


interface ViewFormProps {
    serial: string | undefined,
}

const ViewFormEquipos: FC<ViewFormProps> = ({
    serial,
}) => {
  const [equipoData, setEquipoData] = useState<EquipoWithPrograma>({
    id: 0,
    tipo: "",
    marca: "",
    modelo: "",
    serial: "",
    codigo_Bienes_Nacionales: "",
    codigo_Invi_Mived: "",
    disco_Duro: "",
    memoria_Ram: "",
    procesador: "",
    so: "",
    nombre_Equipo: "",
    dominio_Azure: "",
    direccion: "",
    departamento: "",
    observaciones: "",
    empleados_Cedula: "",
    estado: "",
    fechaAsignacion: "",
    programas: [],
  });
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEquiposBySerial(serial);
        setEquipoData(response);
        console.log(response);
      } catch (error) {
        console.error('Error al obtener datos de empleados:', error);
      }
    };
    fetchData();
    }, [serial]);

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
          <form>
          <div className="relative p-2 font-sans gap-2">
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
                <Label htmlFor="disco_Duro" className="flex text-right justify-between">
                  Disco Duro : {equipoData.disco_Duro}
                </Label>
                
            </div>
            <div className="">
                <Label htmlFor="memoria_Ram" className="flex text-right justify-between">
                  Memoria Ram : {equipoData.memoria_Ram}
                </Label>
                
            </div>
            <div className="">
                <Label htmlFor="procesador" className="flex text-right justify-between">
                  Procesador : {equipoData.procesador}
                </Label>
                
            </div>
            <div className="">
                <Label htmlFor="so" className="flex text-right justify-between">
                  SO : {equipoData.so}
                </Label>
                
            </div>
            <div className="">
                <Label htmlFor="nombre_Equipo" className="flex text-right justify-between">
                  Nombre Equipo : {equipoData.nombre_Equipo}
                </Label>
                
            </div>
            <div className="">
                <Label htmlFor="dominio_Azure" className="flex text-right justify-between">
                  Dominio o Azure : {equipoData.dominio_Azure}
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
            <div className="">
              <Label htmlFor="programas" className="flex text-right justify-between">
                Programas: 
              </Label>
              <div>
              {equipoData.programas?.map((item) =>
                            <>
                            <div >
                            <Label>
                            {item.programa + " - " + item.estado}
                            </Label>
                            </div>
                            </>
              ) || []} 
              </div>
            </div>
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

export default ViewFormEquipos;