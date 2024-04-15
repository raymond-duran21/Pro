import * as React from "react"
import { FC, useEffect, useState } from "react";
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CreateAsignaciones } from "@/types/indes";
import CreateFormAsignaciones from "./CreateFormAsignaciones/CreateFormCpuLaptopAsignaciones";
import { PackagePlus } from "lucide-react";
import CreateFormCpuLaptopAsignaciones from "./CreateFormAsignaciones/CreateFormCpuLaptopAsignaciones";
import CreateFormMonitorAsignaciones from "./CreateFormAsignaciones/CreateFormMonitorAsignaciones";
import CreateFormDockingAsignaciones from "./CreateFormAsignaciones/CreateFormDockingAsignaciones";
import CreateFormImpresoraAsignaciones from "./CreateFormAsignaciones/CreateFormImpresoraAsignaciones";
import CreateFormScannerAsignaciones from "./CreateFormAsignaciones/CreateFormScannerAsignaciones";
import CreateFormUpsAsignaciones from "./CreateFormAsignaciones/CreateFormUpsAsignaciones";
import CreateFormFlotasAsignaciones from "./CreateFormAsignaciones/CreateFormFlotasAsignaciones";
import CreateFormTabletasAsignaciones from "./CreateFormAsignaciones/CreateFormTabletasAsignaciones";

interface CreateFormProps {
    id: string;
    nombre:string;
    departamento:string;
}
    

const SelectFormAsignaciones: React.FC<CreateFormProps> = ({
    id,
    nombre,
    departamento,
}) => {
    const [asignacionesData, setasignacionesData] = useState<CreateAsignaciones>({
    empleadoId: id,
    nombreEmpleado: nombre,
    departamento: departamento,
    tipo: "",
    equipoId: "",
  });
    const [equipoId, setEquipoId] = useState("");
    const [tipoEquipo, setTipoEquipo] = useState("");

  <CreateFormAsignaciones id={asignacionesData.empleadoId} nombre={asignacionesData.nombreEmpleado} departamento={asignacionesData.departamento} tipo="CPU"/>
  return (
    <Popover>
      <PopoverTrigger asChild>
      <Button className="hidden h-8 w-8 p-0 lg:flex bg-green-500">
      <PackagePlus className="w-auto"/>
      </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium ">Que desea agregar?</h4>

          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-8">
              <Label>CPU</Label>
              <CreateFormCpuLaptopAsignaciones id={asignacionesData.empleadoId} nombre={asignacionesData.nombreEmpleado} departamento={asignacionesData.departamento} tipo="CPU"/>
            </div>
            <div className="grid grid-cols-3 items-center gap-8">
              <Label>Laptop</Label>
              <CreateFormCpuLaptopAsignaciones id={asignacionesData.empleadoId} nombre={asignacionesData.nombreEmpleado} departamento={asignacionesData.departamento} tipo="Laptop"/>
            </div>
            <div className="grid grid-cols-3 items-center gap-8">
              <Label>Monitor</Label>
              <CreateFormMonitorAsignaciones id={asignacionesData.empleadoId} nombre={asignacionesData.nombreEmpleado} departamento={asignacionesData.departamento} tipo="Monitor"/>
            </div>
            <div className="grid grid-cols-3 items-center gap-8">
              <Label>Docking Station</Label>
              <CreateFormDockingAsignaciones id={asignacionesData.empleadoId} nombre={asignacionesData.nombreEmpleado} departamento={asignacionesData.departamento} tipo="Docking"/>
            </div>
            <div className="grid grid-cols-3 items-center gap-8">
              <Label>Impresora Local</Label>
              <CreateFormImpresoraAsignaciones id={asignacionesData.empleadoId} nombre={asignacionesData.nombreEmpleado} departamento={asignacionesData.departamento} tipo="Impresora"/>
            </div>
            <div className="grid grid-cols-3 items-center gap-8">
              <Label>Scanner</Label>
              <CreateFormScannerAsignaciones id={asignacionesData.empleadoId} nombre={asignacionesData.nombreEmpleado} departamento={asignacionesData.departamento} tipo="Scanner"/>
            </div>
            <div className="grid grid-cols-3 items-center gap-8">
              <Label>Ups</Label>
              <CreateFormUpsAsignaciones id={asignacionesData.empleadoId} nombre={asignacionesData.nombreEmpleado} departamento={asignacionesData.departamento} tipo="Ups"/>
            </div>
            <div className="grid grid-cols-3 items-center gap-8">
              <Label>Flotas</Label>
              <CreateFormFlotasAsignaciones id={asignacionesData.empleadoId} nombre={asignacionesData.nombreEmpleado} departamento={asignacionesData.departamento} tipo="Flota"/>
            </div>
            <div className="grid grid-cols-3 items-center gap-8">
              <Label>Tabletas</Label>
              <CreateFormTabletasAsignaciones id={asignacionesData.empleadoId} nombre={asignacionesData.nombreEmpleado} departamento={asignacionesData.departamento} tipo="Tableta"/>
            </div>
           
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SelectFormAsignaciones;