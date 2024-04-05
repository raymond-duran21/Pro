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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CreateDockings } from "@/services/equipos/docking";
import { CreateEquipos } from "@/services/equipos/equipos";
import { CreateFlotas } from "@/services/equipos/flota";
import { CreateMonitores } from "@/services/equipos/monitor";
import { CreateScanner } from "@/services/equipos/scanner";
import { CreateTabletas } from "@/services/equipos/tabletas";
import { CreateDocking, CreateEquipo, CreateFlota, CreateMonitor, CreateScanner_Ups, CreateTableta } from "@/types/indes";
import {  CalendarIcon } from "lucide-react";
import { FC, useState } from "react";
import * as React from "react"
import { toast } from 'react-toastify';
import { format } from "date-fns"
import 'react-toastify/dist/ReactToastify.css';
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
 

interface CreateFormProps {
}

const CreateFormTabletas: FC<CreateFormProps> = () => {
  const [date, setDate] = React.useState<Date>()

  const [tabletaData, setTabletaData] = useState<CreateTableta>({
    marca: "",
    modelo: "",
    serial: "",
    codigo_SIAB: "",
    numero: "",
    direccion: "",
    departamento: "",
    edificio: "",
    fechaAdquisicion: date ? date : new Date(),
    observaciones: "",
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabletaData({
      ...tabletaData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTabletaData({
      ...tabletaData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await CreateTabletas(tabletaData);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Tableta creada exitosamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error creating tableta:", error);
    }
  };

  return (
    <div>
      
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" >Agregar Tableta</Button>
      </DialogTrigger>
        <DialogContent className=" sm:max-w-[925px] ">
          <DialogHeader>
            <DialogTitle>Agregar Tableta</DialogTitle>
            <DialogDescription>Introduzca los datos de la Tableta.</DialogDescription>
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
                  value={tabletaData.serial}
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
                value={tabletaData.marca}
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
                value={tabletaData.modelo}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="codigo_SIAB" className="text-right">
                Codigo de SIAB
              </Label>
              <Input
                id="codigo_SIAB"
                name="codigo_SIAB"
                value={tabletaData.codigo_SIAB}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="numero" className="text-right">
                Numero
              </Label>
              <Input
                id="numero"
                name="numero"
                value={tabletaData.numero}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="numero" className="text-right">
                Fecha Asignacion
              </Label>
              <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Seleccione la fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Direccion
              </Label>
              <Input
                id="direccion"
                name="direccion"
                value={tabletaData.direccion}
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
                value={tabletaData.departamento}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edificio" className="text-right">
                Edificio
              </Label>
              <Input
                id="edificio"
                name="edificio"
                value={tabletaData.edificio}
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
                value={tabletaData.observaciones}
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
            <Button type="submit" className="relative left-[120px]">Agregar Tableta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default CreateFormTabletas;