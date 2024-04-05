'use client'
import { useEffect, useState } from "react";
import { Empleados, Equipos } from "@/types/indes";
import {ColumnDef} from '@tanstack/react-table'
import { DataTable } from "@/app/ui/components/Table/Datatable";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { getAllEquipos } from "@/services/equipos/equipos";
import CreateFormEquipos from "@/app/ui/components/Form/Equipos/CreateFormEquipos";
import UpdateFormEquipos from "@/app/ui/components/Form/Equipos/UpdateFormEquipos";
import DeleteDialogEquipos from "@/app/ui/components/Form/Equipos/DeleteFormEquipos";

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
        accessorKey: 'codigo_Invi_Mived',
        header: 'Codigo Invi/Mived',
      },
      {
        accessorKey: 'codigo_Bienes_Nacionales',
        header: 'Codigo Bienes Nacionales',
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
        accessorKey: 'disco_Duro',
        header: 'Disco Duro',
      },
      {
        accessorKey: 'nombre_Equipo', 
        header: 'Nombre Equipo',
      },
      {
        accessorKey: 'dominio_Azure', 
        header: 'Dominio/Azure',
      },
      {
        accessorKey: 'direccion', 
        header: 'Direccion',
      },
      {
        accessorKey: 'departamento', 
        header: 'Departamento',
      },
      {
        accessorKey: 'empleados_Cedula',
        header: 'Id Empleado Asignado',
      },
      {
        accessorKey: 'observaciones',
        header: 'Observaciones',
      },
      {
        accessorKey: 'estado',
        header: 'Estado',
      },
      {
        accessorKey: 'fechaAsignacion',
        header: 'Fecha Asignacion',
      },
      {
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => (
          <div className="flex gap-x-1 ">
            <UpdateFormEquipos id={row.original.id}/>
            <DeleteDialogEquipos id={row.original.id}/>
          </div>
        ),
        enableSorting: false,
      },
      ]
    return ( 
      <div>
        <CreateFormEquipos/>
       <DataTable columns={columns} data={Data} filtro={"serial"} show={true}/>
      </div>
  );
};

export default ListaEquipos;