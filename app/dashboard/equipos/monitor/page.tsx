'use client'
import { useEffect, useState } from "react";
import { Docking, Empleados, Equipos, ImpresoraLocal, Monitor } from "@/types/indes";
import {ColumnDef} from '@tanstack/react-table'
import { DataTable } from "@/app/ui/components/Table/Datatable";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { getAllEquipos } from "@/services/equipos/equipos";
import CreateFormEquipos from "@/app/ui/components/Form/Equipos/CreateFormEquipos";
import UpdateFormEquipos from "@/app/ui/components/Form/Equipos/UpdateFormEquipos";
import DeleteDialogEquipos from "@/app/ui/components/Form/Equipos/DeleteFormEquipos";
import { getAllDockings } from "@/services/equipos/docking";
import { getAllImpresoras } from "@/services/equipos/impresoralocal";
import { getAllMonitores } from "@/services/equipos/monitor";
import UpdateFormDocking from "@/app/ui/components/Form/Docking/UpdateFormDocking";
import DeleteDialogDocking from "@/app/ui/components/Form/Docking/DeleteFormDocking";
import CreateFormDocking from "@/app/ui/components/Form/Docking/CreateFormDocking";
import UpdateFormMonitor from "@/app/ui/components/Form/Monitor/UpdateFormMonitor";
import DeleteDialogMonitor from "@/app/ui/components/Form/Monitor/DeleteFormMonitor";
import CreateFormMonitor from "@/app/ui/components/Form/Monitor/CreateFormMonitor";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ListaMonitor: React.FC = () => {
    const [Data, setData] = useState<Monitor[]>([]);
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
          const response = await getAllMonitores();
          setData(response);
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener datos de los monitores:', error);
        }
      };
      fetchData();
    }, []);

    const columns: ColumnDef<Monitor>[] = [
      
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
        accessorKey: 'pulgadas',
        header: 'Pulgadas'
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
            <UpdateFormMonitor id={row.original.id}/>
            <DeleteDialogMonitor id={row.original.id}/>
          </div>
        ),
        enableSorting: false,
      },
      ]
    return ( 
      <div>
        <CreateFormMonitor/>
       <DataTable columns={columns} data={Data} filtro={"serial"} show={true}/>
      </div>
  );
};

export default ListaMonitor;