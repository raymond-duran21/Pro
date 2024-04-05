'use client'
import { useEffect, useState } from "react";
import { Docking } from "@/types/indes";
import {ColumnDef} from '@tanstack/react-table'
import { DataTable } from "@/app/ui/components/Table/Datatable";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { getAllDockings } from "@/services/equipos/docking";
import UpdateFormDocking from "@/app/ui/components/Form/Docking/UpdateFormDocking";
import DeleteDialogDocking from "@/app/ui/components/Form/Docking/DeleteFormDocking";
import CreateFormDocking from "@/app/ui/components/Form/Docking/CreateFormDocking";
import CreateFormDockings from "@/app/ui/components/Form/Docking/CreateFormDocking";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ListaDocking: React.FC = () => {
    const [Data, setData] = useState<Docking[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { data: session, status } = useSession();

      useEffect(() => {
        if (status === "unauthenticated") {
          // Redirigir al login
          router.push("/");
        }
      }, [session, status]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllDockings();
          setData(response);
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener datos de los dockings:', error);
        }
      };
      fetchData();
    }, []);

    const columns: ColumnDef<Docking>[] = [
      
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
        accessorKey: 'despacho_Ministro_Viceministerio',
        header: 'Despacho Ministro/ Viceministerio'
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
            <UpdateFormDocking id={row.original.id}/>
            <DeleteDialogDocking id={row.original.id}/>
          </div>
        ),
        enableSorting: false,
      },
      ]
    return ( 
      <div>
        <CreateFormDockings/>
       <DataTable columns={columns} data={Data} filtro={"serial"} show={true}/>
      </div>
  );
};

export default ListaDocking;