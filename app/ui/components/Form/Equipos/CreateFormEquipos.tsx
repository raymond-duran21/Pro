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
import { CreateEquipos } from "@/services/equipos/equipos";
import { CreateEquipo } from "@/types/indes";
import { FC, useState } from "react";
import * as React from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

interface CreateFormProps {
}

const CreateFormEquipos: FC<CreateFormProps> = () => {
  const [equiposData, setEquiposData] = useState<CreateEquipo>({
    tipo: "",
    marca: "",
    modelo: "",
    serial: "",
    codigo_Bienes_Nacionales: "",
    codigo_Invi_Mived: "",
    disco_Duro: "",
    memoria_Ram: "",
    procesador:"",
    so: "",
    nombre_Equipo: "",
    dominio_Azure: "",
    direccion: "",
    departamento: "",
    programas: "",
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
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEquiposData({
      ...equiposData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await CreateEquipos(equiposData);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Equipo creado exitosamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div>
      
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" >Agregar Equipo</Button>
      </DialogTrigger>
        <DialogContent className=" sm:max-w-[925px] ">
          <DialogHeader>
            <DialogTitle>Agregar Equipo</DialogTitle>
            <DialogDescription>Introduzca los datos del Equipo.</DialogDescription>
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
                  value={equiposData.serial}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">
                  Tipo
                </Label>
                <select
                  id="tipo"
                  name="tipo"
                  value={equiposData.tipo}
                  onChange={handleChangeSelect}
                  className="col-span-3"
                >
                  <option value="Select">Select</option>
                  <option value="CPU">CPU</option>
                  <option value="Laptop">Laptop</option>
                </select>
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
              <Label htmlFor="codigo_Bienes_Nacionales" className="text-right">
                Codigo Bienes Nacionales
              </Label>
              <Input
                id="codigo_Bienes_Nacionales"
                name="codigo_Bienes_Nacionales"
                value={equiposData.codigo_Bienes_Nacionales}
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
                value={equiposData.codigo_Invi_Mived}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="disco_Duro" className="text-right">
                Disco Duro
              </Label>
              <Input
                id="disco_Duro"
                name="disco_Duro"
                value={equiposData.disco_Duro}
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
              <Label htmlFor="dominio_Azure" className="text-right">
                Dominio
              </Label>
              <select
                  id="dominio_Azure"
                  name="dominio_Azure"
                  value={equiposData.dominio_Azure}
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
                value={equiposData.direccion}
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
                value={equiposData.departamento}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="programas" className="text-right">
                Programas
              </Label>
              <Input
                id="programas"
                name="programas"
                value={equiposData.programas}
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
