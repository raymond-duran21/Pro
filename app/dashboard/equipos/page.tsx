'use client'

import { useEffect, useState } from "react";
import { Empleados, Equipos } from "@/types/indes";
import {ColumnDef} from '@tanstack/react-table'
import { DataTable } from "@/app/ui/components/Table/Datatable";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { getAllEquipos } from "@/services/equipos/equipos";


const ListaEquipos: React.FC = () => {
    const [Data, setData] = useState<Equipos[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllEquipos();
          setData(response);
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener datos de empleados:', error);
        }
      };
      fetchData();
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
            onCheckedChange={(value: any) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
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
        accessorKey: 'id',
        header: 'Id',
      },
      {
        accessorKey: 'tipo', 
        header: 'Tipo',
      },
      {
        accessorKey: 'marca',
        header: 'Marca',
      },
      {
        accessorKey: 'modelo',
        header: 'Modelo',
      },
      {
        accessorKey: 'almacenamiento',
        header: 'Almacenamiento',
      },
      {
        accessorKey: 'memoria_Ram', 
        header: 'Memoria Ram',
      },
      {
        accessorKey: 'procesador',
        header: 'Procesador',
      },
      {
        accessorKey: 'so',
        header: 'SO',
      },
      {
        accessorKey: 'almacenamiento',
        header: 'Almacenamiento',
      },
      {
        accessorKey: 'nombre_Equipo', 
        header: 'Nombre Equipo',
      },
      {
        accessorKey: 'empleadosId',
        header: 'Id Empleado Asignado',
      },
      {
        accessorKey: 'observaciones',
        header: 'Observaciones',
      },
      {
        accessorKey: 'fechaAsignacion',
        header: 'Fecha Asignacion',
      }
      ]
      console.log();
    return ( 
      <div>
       <DataTable columns={columns} data={Data}/>
      </div>
  );
};

export default ListaEquipos;