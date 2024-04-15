import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { DeleteAsignaciones, getAsignacionesByCedula } from "@/services/asignaciones/asignaciones";
import { Asignaciones, Equipos } from '@/types/indes';
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
import { Computer, PackagePlus } from "lucide-react";
import { FC, useEffect, useState } from "react"
import { DataTable } from "../../Table/Datatable";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Item } from "@radix-ui/react-dropdown-menu";
import { useSession } from "next-auth/react";
import ViewFormEquipos from "./ViewEquipo";
import ViewFormOther from "./ViewOther";
import ViewFormTableta from "./ViewTabletas";
import ViewFormFlotas from "./ViewFlotas";

interface ViewModel {
    cedula: string,
    nombre: string,
}

const ViewModelAsignaciones: FC<ViewModel> =({
    cedula,
    nombre,
}) => {
    const [asignacionesData, setAsignacionesData] = useState<Asignaciones[]>([]);
    const [selectedAsignacion, setSelectedAsignacion] = useState<number | null>(null);
    const [viewEquipo, setViewEquipo] = useState<string>();
    const session = useSession();
    
    

        useEffect(() => {
            const fetchData = async () => {
              try {
                const response = await getAsignacionesByCedula(cedula);
                setAsignacionesData(response);
                setSelectedAsignacion(response.length > 0 ? response[0].id : null);
              } catch (error) {
                console.error('Error al obtener datos de empleados:', error);
              }
            };
            fetchData();
        }, [cedula]);

          const handleDelete = async () => {
            if (selectedAsignacion) {
              const result = await DeleteAsignaciones(selectedAsignacion, session.data?.accessToken);
              if (result.flag === false) {
                toast.error(result.message);
                console.log(result.message);
              } else {
                toast.success("Asignación eliminada exitosamente");
                // Update data after deletion (consider API call or local filtering)
                setAsignacionesData(asignacionesData.filter((item) => item.id !== selectedAsignacion));
                setSelectedAsignacion(null); // Clear selection after deletion
              }
            } else {
              console.warn("No selected item to delete");
            }
          };
          const handleCardClick = (asignacionId: number, equipoId?: string) => {
            setViewEquipo(equipoId);
            setSelectedAsignacion(asignacionId);
            console.log(asignacionId) // Update selected ID on card click
          };
          

    return(
        
        <div>
        <Dialog>
      <DialogTrigger asChild>
        <Button className="hidden h-8 w-8 p-0 lg:flex bg-slate-500">
         <Computer className="w-auto"/>
        </Button>
      </DialogTrigger>
      <div className="">
          <DialogContent className="absolute max-w-[1000px] h-[700px]">
          <DialogHeader>
            <DialogTitle> Equipo asignado a {nombre}</DialogTitle>
            <DialogDescription>Estos son los equipos asignados a este empleado, si desea eliminar su asignacion, 
                presione sobre el equipo que desea eliminar y luego,
                el boton de debajo.</DialogDescription>
          </DialogHeader>
          <div className=" grid grid-cols-4 gap-4 mb-[200px]">
                    {asignacionesData.map((item, index) =>
                            <>
                            <div>
                            <Card 
                            key={item.id}
                            className={`cursor-pointer ${
                              selectedAsignacion === item.id ? "bg-red-200" : ""
                            }`} // Apply selected class based on ID
                            onClick={() => handleCardClick(item.id, item.equipoId)}>
                            <CardHeader >
                              <CardTitle className="flex justify-between">{item.tipo}{(() => {
                                      switch (item.tipo) {
                                        case 'CPU':
                                          return <ViewFormEquipos serial={item.equipoId} />;
                                        case 'Laptop':
                                          return <ViewFormEquipos serial={item.equipoId} />;
                                        case 'Impresora':
                                          return <ViewFormOther serial={item.equipoId} tipo={item.tipo}/>;
                                        case 'Monitor':
                                          return <ViewFormOther serial={item.equipoId} tipo={item.tipo}/>;
                                        case 'Scanner':
                                          return <ViewFormOther serial={item.equipoId} tipo={item.tipo}/>;
                                        case 'Ups':
                                          return <ViewFormOther serial={item.equipoId} tipo={item.tipo}/>;
                                        case 'Docking':
                                          return <ViewFormOther serial={item.equipoId} tipo={item.tipo}/>;
                                        case 'Tableta':
                                          return <ViewFormTableta serial={item.equipoId} />;
                                        case 'Flota':
                                          return <ViewFormFlotas serial={item.equipoId} />;
                                        default:
                                          return <div>No se encontró un componente adecuado para {item.tipo}</div>;
                                      }
                                    })()  } </CardTitle>
                            </CardHeader>
                            <CardContent>
                            <p className="font-semibold">Serial equipo: </p>
                            <p>{item.equipoId}</p>
                            <p className="font-semibold">Fecha Asignacion: </p>
                            <p>{item.fecha_Asignacion.toString()}</p>
                            </CardContent>
                            <CardFooter>
                            <span className=" absolute font-light ">{index + 1}</span>
                            </CardFooter>
                            <div className=" flex align-top justify-center ">
                            </div>
                          </Card>
                          </div>
                            </>
                    )}
          </div>
          <DialogFooter className=" absolute bottom-[10px] left-[370px]">
        <AlertDialog>
        <AlertDialogTrigger>
        {asignacionesData.length > 0 ? (
          <Button className=" bg-red-600">
                        Delete
          </Button>
        ) : (
          <div></div>  
        )}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Estas seguro que quieres eliminar este equipo</AlertDialogTitle>
            <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará la asignacion del equipo.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Borrar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
          </DialogFooter>
      </DialogContent>
      </div>
    </Dialog>
        </div>
    )
}

export default ViewModelAsignaciones;
