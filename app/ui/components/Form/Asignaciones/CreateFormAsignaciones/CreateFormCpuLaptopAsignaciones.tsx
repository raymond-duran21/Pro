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
import { CreateAsignacion } from "@/services/asignaciones/asignaciones";
import { getAllEmpleados } from "@/services/empleados/empleados";
import { AllEmpleados, CreateAsignaciones, Empleados, Equipos } from "@/types/indes";
import { FC, useEffect, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { getAllEquipos } from "@/services/equipos/equipos";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ArrowUpDown, PackagePlus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "../../../Table/Datatable";
import React from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AsignarProgramaEquipo from "../../Equipos/AsignarProgramasEquipos";
import { useSession } from "next-auth/react";


interface CreateFormProps {
    id: string;
    nombre:string;
    departamento:string;
    tipo: string;
}
    

const CreateFormCpuLaptopAsignaciones: FC<CreateFormProps> = ({
    id,
    nombre,
    departamento,
    tipo,
}) => {
    const [asignacionesData, setasignacionesData] = useState<CreateAsignaciones>({
    empleadoId: id,
    nombreEmpleado: nombre,
    departamento: departamento,
    tipo: tipo,
    equipoId: "",
  });
    const [equipoId, setEquipoId] = useState("");
    const [tipoEquipo, setTipoEquipo] = useState("");
    const [DataEquipos, setDataEquipos] = useState<Equipos[]>([]);
    const [showProgramAssignmentButton, setShowProgramAssignmentButton] = useState(false);
    const session = useSession();

    useEffect(() => {
        setasignacionesData((prevData) => ({
          ...prevData,
          equipoId: equipoId,
          tipo: tipoEquipo,
        }));
      }, [equipoId, tipoEquipo]);

    useEffect(() => {
        const fetchDataEquipos = async () => {
          try {
            const response = await getAllEquipos();
            const equiposDisponibles = response.filter((equipo) => equipo.estado === "Disponible" && equipo.tipo === tipo);
            setDataEquipos(equiposDisponibles);
          } catch (error) {
            console.error('Error al obtener datos de empleados:', error);
          }
        };
        fetchDataEquipos();
    }, []);



    const columns: ColumnDef<Equipos>[] = [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value: any) => {row.toggleSelected(!!value)
                if (value) {
                  setEquipoId(row.original.serial);
                  setTipoEquipo(row.original.tipo);
                  setShowProgramAssignmentButton(true);
                  const rowData = row.original;
                  console.log("Valores de la fila seleccionada:", rowData);
                  // Realiza las acciones necesarias con los valores de la fila
                }
                else{
                  setEquipoId("");
                  setTipoEquipo("");
                  setShowProgramAssignmentButton(false);
                  const rowData = row.original;
                  
                }}}
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
        {
          accessorKey: 'id',
          header: 'Id',
        },
        {
          accessorKey: 'serial',
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Serial
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        },
        {
            accessorKey: 'tipo', //normal accessorKey
            header: 'Tipo',
        },
        {
            accessorKey: 'estado',
            header: 'Estado equipo',
        },
        {
          id: 'actions',
          header: 'Acciones',
          cell: ({ row }) => (
            <div className="flex gap-x-1 ">
              {showProgramAssignmentButton && (
                <AsignarProgramaEquipo EquipoId={row.original.id}/>
              )}
            </div>
          ),
          enableSorting: false,
        },
    ]

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(asignacionesData)   
    try {
      const result = await CreateAsignacion(asignacionesData, session.data?.accessToken);
      if (result.flag === false) {
        toast.error(result.message);
        console.log(result.message);
      }
      else {
        toast.success("Se ha asignado correctamente.");
        setTimeout(() => {window.location.reload();},2000);
      }
      
    } catch (error) {
      console.error("Error creando asignacion:", error);
    }
  };

  return (
    <div>
      <Dialog>
      <DialogTrigger asChild>
        <Button className="hidden h-8 w-8 p-0 lg:flex bg-green-500">
         <PackagePlus className="w-auto"/>
        </Button>
      </DialogTrigger>
      <div >
          <DialogContent className="absolute max-w-[1000px] h-[800px]">
          <DialogHeader>
            <DialogTitle>Asignar Equipo a {nombre}</DialogTitle>
            <DialogDescription>Seleccione el equipo que desea asignarle al usuario</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
          <div className=" relative w-[1000px] h-[100px] bottom-[315px] right-[270px]">
          <DataTable 
          columns={columns}
          data={DataEquipos} 
          filtro={"serial"} 
          show={false}
          />
          </div>
          <DialogFooter className=" absolute bottom-1 left-[1px]">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className=" relative left-10 px-4">
              Close
            </Button>
          </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
      </div>
    </Dialog>
  </div>
  );
};

export default CreateFormCpuLaptopAsignaciones;