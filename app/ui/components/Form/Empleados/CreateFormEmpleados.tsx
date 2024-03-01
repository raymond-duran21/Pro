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
import { CreateEmpleado } from "@/services/empleados/empleados";
import { CreateEmpleados, Empleados } from "@/types/indes";
import { FC, useEffect, useState } from "react";

interface CreateFormProps {
}

const CreateFormEmpleados: FC<CreateFormProps> = () => {
  const [employeeData, setEmployeeData] = useState<CreateEmpleados>({
    nombre: "",
    cedula_Pasaporte: "",
    entidad: "",
    direccion: "",
    departamento: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [onClose, setOnClose] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeData({
      ...employeeData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Implement logic to create employee on server (e.g., using axios)
    try {
      const result = await CreateEmpleado(employeeData);
      console.log("Employee created successfully:", result.data);
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div>
      
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" absolute right-[1050px] top-[15px]">Agregar Empleado</Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Agregar Empleado</DialogTitle>
            <DialogDescription>Introduzca los datos del Empleado.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={employeeData.nombre}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cedula_Pasaporte" className="text-right">
                Cedula/Pasaporte
              </Label>
              <Input
                id="cedula_Pasaporte"
                name="cedula_Pasaporte"
                value={employeeData.cedula_Pasaporte}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="entidad" className="text-right">
                Entidad
              </Label>
              <Input
                id="entidad"
                name="entidad"
                value={employeeData.entidad}
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
                value={employeeData.direccion}
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
                value={employeeData.departamento}
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
            <Button type="submit" className=" relative left-[120px]">Agregar Usuario</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default CreateFormEmpleados;
