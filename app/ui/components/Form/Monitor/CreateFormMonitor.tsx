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
import { CreateDockings } from "@/services/equipos/docking";
import { CreateEquipos } from "@/services/equipos/equipos";
import { CreateMonitores } from "@/services/equipos/monitor";
import { CreateDocking, CreateEquipo, CreateMonitor } from "@/types/indes";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import * as React from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

interface CreateFormProps {
}

const CreateFormMonitor: FC<CreateFormProps> = () => {
  const [monitorData, setMonitorData] = useState<CreateMonitor>({
    marca: "",
    modelo: "",
    pulgadas: "",
    serial: "",
    codigo_Bienes_Nacionales: "",
    codigo_Invi_Mived: "",
    direccion: "",
    departamento: "",
    empleados_Cedula: "",
    observaciones: "",
    estado:"",
  });

  const session = useSession();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonitorData({
      ...monitorData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonitorData({
      ...monitorData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await CreateMonitores(monitorData, session.data?.accessToken);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Monitor creado exitosamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error creating monitor:", error);
    }
  };

  return (
    <div>
      
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" >Agregar Monitor</Button>
      </DialogTrigger>
        <DialogContent className=" sm:max-w-[925px] ">
          <DialogHeader>
            <DialogTitle>Agregar Monitor</DialogTitle>
            <DialogDescription>Introduzca los datos del Monitor.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} >
            <div className="grid gap-4 py-4 ">
            <div className="col-span-3 sm:col-span-2 md:col-span-2">
                <Label htmlFor="serial" className="text-right">
                  Serial
                </Label>
                <Input
                  id="serial"
                  name="serial"
                  value={monitorData.serial}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="marca" className="text-right">
                Marca
              </Label>
              <Input
                id="marca"
                name="marca"
                value={monitorData.marca}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modelo" className="text-right">
                Modelo
              </Label>
              <Input
                id="modelo"
                name="modelo"
                value={monitorData.modelo}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pulgadas" className="text-right">
                Pulgadas
              </Label>
              <Input
                id="pulgadas"
                name="pulgadas"
                value={monitorData.pulgadas}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="codigo_Bienes_Nacionales" className="text-right">
                Codigo Bienes Nacionales
              </Label>
              <Input
                id="codigo_Bienes_Nacionales"
                name="codigo_Bienes_Nacionales"
                value={monitorData.codigo_Bienes_Nacionales}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="codigo_Invi_Mived" className="text-right">
                Codigo Invi/Mived
              </Label>
              <Input
                id="codigo_Invi_Mived"
                name="codigo_Invi_Mived"
                value={monitorData.codigo_Invi_Mived}
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
                value={monitorData.direccion}
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
                value={monitorData.departamento}
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
                value={monitorData.observaciones}
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
            <Button type="submit" className="relative left-[120px]">Agregar Monitor</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default CreateFormMonitor;