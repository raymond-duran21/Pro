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
import { getImpresoraById, UpdateImpresora } from "@/services/equipos/impresoralocal";
import { UpdateDocking, UpdateEquipo, UpdateImpresoraLocal } from "@/types/indes";
import { PenSquareIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface UpdateFormProps {
    id: number,
}

const UpdateFormImpresora: FC<UpdateFormProps> = ({
    id,
}) => {
  const [impresoraData, setImpresoraData] = useState<UpdateImpresoraLocal>({
    id:id,
    direccion: "",
    departamento: "",
    observaciones: "",
    obsoleto: "",
  });

  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getImpresoraById(id);
        setImpresoraData(response);
      } catch (error) {
        console.error('Error al obtener datos de empleados:', error);
      }
    };
    fetchData();
    }, [id]);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImpresoraData({
      ...impresoraData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImpresoraData({
      ...impresoraData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await UpdateImpresora(impresoraData.id, impresoraData, session.data?.accessToken);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Impresora Actualizada Correctamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error Actualizando impresora:", error);
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
            <DialogTitle>Editar Impresora</DialogTitle>
            <DialogDescription>Introduzca los datos de la impresora que quiere editar.</DialogDescription>
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
                  value={impresoraData.id}
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
                value={impresoraData.direccion}
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
                value={impresoraData.departamento}
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
                value={impresoraData.observaciones}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="obsoleto" className="text-right">
                  Obsoleto
                </Label>
                <select
                  id="obsoleto"
                  name="obsoleto"
                  value={impresoraData.obsoleto}
                  onChange={handleChangeSelect}
                  className="col-span-3"
                >
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
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

export default UpdateFormImpresora;