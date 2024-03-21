'use client'

import { getAllEmpleados } from "@/services/empleados/empleados"
import { useEffect, useState } from "react";
import { Asignaciones, Empleados } from "@/types/indes";
import {ColumnDef} from '@tanstack/react-table'
import { DataTable } from "@/app/ui/components/Table/Datatable";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import CreateFormEmpleados from "@/app/ui/components/Form/Empleados/CreateFormEmpleados";
import UpdateFormEmpleados from "@/app/ui/components/Form/Empleados/UpdateFormEmpleados";
import DeleteDialogEmpleados from "@/app/ui/components/Form/Empleados/DeleteFormEmpleados";
import { getAllAsignaciones } from "@/services/asignaciones/asignaciones";
import CreateFormAsignaciones from "@/app/ui/components/Form/Asignaciones/CreateFormAsignaciones";
import ViewModelAsignaciones from "@/app/ui/components/Form/Asignaciones/ViewAsignaciones";
import { useSession } from "next-auth/react";


const ListaAsignaciones: React.FC = () => {
    const [Data, setData] = useState<Empleados[]>([]);
    const [Id, setId] = useState(0);
    const [loading, setLoading] = useState(true);
    const session = useSession();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllEmpleados();
          setData(response);
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener datos de asignaciones:', error);
        }
      };
      fetchData();
    }, []);

    const columns: ColumnDef<Empleados>[] = [
      
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
            onCheckedChange={(value: any) => row.toggleSelected(!!value)}
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
        accessorKey: 'nombre',
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
        accessorKey: 'cedula_Pasaporte', //normal accessorKey
        header: 'Cedula &/O Pasaporte',
      },
      {
        accessorKey: 'departamento',
        header: 'Departamento',
      },
      {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => (
          <div className="flex gap-x-1 ">
            <CreateFormAsignaciones id={row.original.cedula_Pasaporte} nombre={row.original.nombre} departamento={row.original.departamento}/>
            <ViewModelAsignaciones cedula={row.original.cedula_Pasaporte} nombre={row.original.nombre}/>
          </div>
        ),
        enableSorting: false,
      },
      ]
      console.log();
    return ( 
      <div>
       <DataTable columns={columns} data={Data} filtro={"nombre"} show={true}/>
      </div>
  );
};

export default ListaAsignaciones;