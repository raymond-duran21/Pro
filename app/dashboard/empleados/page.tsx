'use client'

import { getAllEmpleados } from "@/services/empleados/empleados"
import { useEffect, useState } from "react";
import { Empleados } from "@/types/indes";
import {ColumnDef} from '@tanstack/react-table'
import { DataTable } from "@/app/ui/components/Table/Datatable";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import CreateFormEmpleados from "@/app/ui/components/Form/Empleados/CreateFormEmpleados";


const ListaEmpleados: React.FC = () => {
    const [Data, setData] = useState<Empleados[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllEmpleados();
          setData(response);
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener datos de empleados:', error);
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
        accessorKey: 'nombre',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Nombre
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
      },
      {
        accessorKey: 'id',
        header: 'Id',
      },
      {
        accessorKey: 'cedula_Pasaporte', //normal accessorKey
        header: 'Cedula &/O Pasaporte',
      },
      {
        accessorKey: 'entidad',
        header: 'Entidad',
      },
      {
        accessorKey: 'direccion',
        header: 'Direccion',
      },
      {
        accessorKey: 'departamento',
        header: 'Departamento',
      }
      ]
      console.log();
    return ( 
      <div>
       <CreateFormEmpleados/>
       <DataTable columns={columns} data={Data}/>
      </div>
  );
};

export default ListaEmpleados;
