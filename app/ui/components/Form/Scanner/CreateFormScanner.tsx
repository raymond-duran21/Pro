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
import { CreateScanner } from "@/services/equipos/scanner";
import { CreateDocking, CreateEquipo, CreateMonitor, CreateScanner_Ups } from "@/types/indes";
import { FC, useState } from "react";
import * as React from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

interface CreateFormProps {
}

const CreateFormScanner: FC<CreateFormProps> = () => {
  const [scannerData, setScannerData] = useState<CreateScanner_Ups>({
    marca: "",
    modelo: "",
    serial: "",
    codigo_Bienes_Nacionales: "",
    codigo_Invi_Mived: "",
    direccion: "",
    departamento: "",
    empleados_Cedula: "",
    observaciones: "",
    estado:"",
  });

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
      const result = await CreateScanner(scannerData);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Scanner creado exitosamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error creating scanner:", error);
    }
  };

  return (
    <div>
      
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" >Agregar Scanner</Button>
      </DialogTrigger>
        <DialogContent className=" sm:max-w-[925px] ">
          <DialogHeader>
            <DialogTitle>Agregar Scanner</DialogTitle>
            <DialogDescription>Introduzca los datos del Scaner.</DialogDescription>
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
                  value={scannerData.serial}
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
                value={scannerData.marca}
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
                value={scannerData.modelo}
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
                value={scannerData.codigo_Bienes_Nacionales}
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
                value={scannerData.codigo_Invi_Mived}
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
            <Button type="submit" className="relative left-[120px]">Agregar Scanner</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default CreateFormScanner;