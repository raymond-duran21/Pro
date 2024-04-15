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
import { UpdateEquipos, getEquiposById } from "@/services/equipos/equipos";
import { UpdateEquipo } from "@/types/indes";
import { PenSquareIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AsignarProgramaEquipo from "./AsignarProgramasEquipos";
import { useSession } from "next-auth/react";


interface UpdateFormProps {
    id: number,
}

const UpdateFormEquipos: FC<UpdateFormProps> = ({
    id,
}) => {
  const [equipoData, setEquipoData] = useState<UpdateEquipo>({
    id:id,
    disco_Duro: "",
    memoria_Ram: "",
    so: "",
    nombre_Equipo: "",
    dominio_Azure: "",
    direccion: "",
    departamento: "",
    observaciones: "",
  });
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEquiposById(id);
        setEquipoData(response);
      } catch (error) {
        console.error('Error al obtener datos de empleados:', error);
      }
    };
    fetchData();
    }, [id]);

    
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEquipoData({
      ...equipoData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEquipoData({
      ...equipoData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await UpdateEquipos(equipoData.id, equipoData, session.data?.accessToken);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Equipo Actualizado Correctamente");
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
            <DialogTitle>Editar Equipo</DialogTitle>
            <DialogDescription>Introduzca los datos del Equipo que quiere editar.</DialogDescription>
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
                  value={equipoData.id}
                  disabled={true}
                  onChange={handleChange}
                  className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="almacenamiento" className="text-right">
                  Almacenamiento
                </Label>
                <Input
                  id="almacenamiento"
                  name="almacenamiento"
                  value={equipoData.disco_Duro}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memoria_Ram" className="text-right">
                Memoria Ram
              </Label>
              <Input
                id="memoria_Ram"
                name="memoria_Ram"
                value={equipoData.memoria_Ram}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="so" className="text-right">
                SO
              </Label>
              <Input
                id="so"
                name="so"
                value={equipoData.so}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre_Equipo" className="text-right">
                Nombre del Equipo
              </Label>
              <Input
                id="nombre_Equipo"
                name="nombre_Equipo"
                value={equipoData.nombre_Equipo}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dominio_Azure" className="text-right">
                Dominio
              </Label>
              <select
                  id="dominio_Azure"
                  name="dominio_Azure"
                  value={equipoData.dominio_Azure}
                  onChange={handleChangeSelect}
                  className="col-span-3"
                >
                  <option value="Select">Select</option>
                  <option value="Azure">Azure</option>
                  <option value="Dominio">Dominio</option>
                  <option value="Hibrido">Hibrido</option>
                </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Direccion
              </Label>
              <Input
                id="direccion"
                name="direccion"
                value={equipoData.direccion}
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
                disabled={true}
                value={equipoData.departamento}
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
                value={equipoData.observaciones}
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

export default UpdateFormEquipos;