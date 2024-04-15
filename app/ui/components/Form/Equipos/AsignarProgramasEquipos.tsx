"use client"
 
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FC, useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { AppWindow } from "lucide-react"
import { toast } from "react-toastify"
import { AsignarProgramasEquipos, Programas } from "@/types/indes"
import { AsignarProgramasEquipo, getAllProgramas } from "@/services/programas/programas"
import { useSession } from "next-auth/react"
 
interface EquipoPrograma{
  EquipoId: number
}

const AsignarProgramaEquipo: FC<EquipoPrograma> =({
  EquipoId
}) => {

  const session = useSession();

const [Data, setData] = useState<Programas[]>([]);
const [selectedProgramas, setSelectedProgramas] = useState<number[]>([]);
const { handleSubmit, register } = useForm();


const handleProgramasChange = (event: React.ChangeEvent<HTMLInputElement>, programaId: number) => {
  if (event.target.checked) {
    setSelectedProgramas([...selectedProgramas, programaId]);
  } else {
    setSelectedProgramas(selectedProgramas.filter((id) => id !== programaId));
  }
};

console.log(selectedProgramas)

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProgramas();
        setData(response);
      } catch (error) {
        console.error('Error al obtener datos de los programas', error);
      }
    };
    fetchData();
  }, []);
  
  const FormSchema = z.object({
    items: z.array(z.string()).min(1, 'Debe seleccionar al menos un programa.'),
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await AsignarProgramasEquipo(EquipoId, selectedProgramas, session.data?.accessToken);
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
    // Aquí puedes realizar la lógica para enviar los datos con los programas seleccionados
  };

return (
      <Popover>
        <PopoverTrigger>
          <Button type="button" className=" h-5"><AppWindow size={10} /></Button>
        </PopoverTrigger>
        <PopoverContent>
        <form onSubmit={onSubmit}>
          {Data.map((programa) => (
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    key={programa.id}
                    type="checkbox"
                    id={`programa-${programa.id}`}
                    name="items"
                    
                    value={programa.id.toString()}
                    onChange={() => {
                      setSelectedProgramas((prev) =>
                        prev.includes(programa.id) ? prev.filter((id) => id !== programa.id) : [...prev, programa.id]
                      ); handleProgramasChange
                    }}
                  />
                  <label htmlFor={`programa-${programa.id}`}>{programa.programa}</label> 
                  <label>-{programa.estado}</label>
                </div>
              </div>
          ))}
        <Button type="submit">Asignar</Button>
         </form>
        </PopoverContent>
      </Popover>
)
}
export default AsignarProgramaEquipo;