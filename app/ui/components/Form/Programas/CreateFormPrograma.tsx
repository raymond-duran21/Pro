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
import { CreateProgramas } from "@/services/programas/programas";
import { CreatePrograma } from "@/types/indes";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import * as React from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

interface CreateFormProps {
}

const CreateFormScanner: FC<CreateFormProps> = () => {
  const [programaData, setProgramaData] = useState<CreatePrograma>({
    programa:"",
    estado:"",
  });
  const session = useSession();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramaData({
      ...programaData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await CreateProgramas(programaData, session.data?.accessToken);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Programa creado exitosamente");
        setTimeout(() => {window.location.reload();},2000);
      }
    } catch (error) {
      console.error("Error creating Programa:", error);
    }
  };

  return (
    <div>
      
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" >Agregar Programa</Button>
      </DialogTrigger>
        <DialogContent className=" sm:max-w-[925px] ">
          <DialogHeader>
            <DialogTitle>Agregar Programa</DialogTitle>
            <DialogDescription>Introduzca los datos del Programa.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} >
            <div className="grid gap-4 py-4 ">
            <div className="col-span-3 ">
                <Label htmlFor="programa" className="text-right">
                  Programa
                </Label>
                <Input
                id="programa"
                name="programa"
                value={programaData.programa}
                onChange={handleChange}
                className="col-span-3"
              />
              </div>
            <div className="col-span-3 ">
              <Label htmlFor="estado" className="text-right">
                Estado
              </Label>
              <Input
                id="estado"
                name="estado"
                value={programaData.estado}
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
            <Button type="submit" className="relative left-[120px]">Agregar Programa</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default CreateFormScanner;