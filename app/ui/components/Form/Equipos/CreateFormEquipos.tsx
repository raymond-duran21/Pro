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
import { CreateEmpleado, getAllEmpleados } from "@/services/empleados/empleados";
import { CreateEquipos } from "@/services/equipos/equipos";
import { CreateEquipo, Empleados } from "@/types/indes";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
 
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CreateFormProps {
}

const CreateFormEquipos: FC<CreateFormProps> = () => {
  const [equiposData, setEquiposData] = useState<CreateEquipo>({
    tipo: "",
    marca: "",
    modelo: "",
    serial: "",
    almacenamiento: "",
    memoria_Ram: "",
    procesador:"",
    so: "",
    nombre_Equipo: "",
    empleados_Cedula: "",
    observaciones: "",
    estado:"",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEquiposData({
      ...equiposData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await CreateEquipos(equiposData);
      console.log("Employee created successfully:", result.data);
      window.location.reload();

    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div>
      
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="right-[1040px] top-4 relative">Agregar Equipo</Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Agregar Equipo</DialogTitle>
            <DialogDescription>Introduzca los datos del Equipo.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serial" className="text-right">
                  Serial
                </Label>
                <Input
                  id="serial"
                  name="serial"
                  value={equiposData.serial}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">
                  Tipo
                </Label>
                <Input
                  id="tipo"
                  name="tipo"
                  value={equiposData.tipo}
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
                value={equiposData.marca}
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
                value={equiposData.modelo}
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
                value={equiposData.almacenamiento}
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
                value={equiposData.memoria_Ram}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="procesador" className="text-right">
                Procesador
              </Label>
              <Input
                id="procesador"
                name="procesador"
                value={equiposData.procesador}
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
                value={equiposData.so}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre_Equipo" className="text-right">
                Nombre Equipo
              </Label>
              <Input
                id="nombre_Equipo"
                name="nombre_Equipo"
                value={equiposData.nombre_Equipo}
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
                value={equiposData.observaciones}
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
            <Button type="submit" className="relative left-[120px]">Agregar Equipo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default CreateFormEquipos;
