import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { DeleteAsignaciones, getAsignacionesByCedula } from "@/services/asignaciones/asignaciones";
import { Asignaciones } from "@/types/indes"
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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

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
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

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

          const handleSelectAsignacion = (itemId: number) => {
            setSelectedAsignacion(itemId);
            setSelectedCardId(itemId);
            console.log(itemId) 
          };

          const handleDelete = async () => {
            if (selectedAsignacion) {
              const updatedData = asignacionesData.filter(
                (item) => item.id == selectedAsignacion
              );
              const result = await DeleteAsignaciones(selectedAsignacion);
              console.log("Asignacion Eliminada Correctamente:",result);
              window.location.reload();
            } else {
              console.warn('No selected item to delete');
            }
          };
          
    return(
        <div>
        <Dialog>
      <DialogTrigger asChild>
        <Button className="hidden h-8 w-8 p-0 lg:flex bg-slate-500">
         <Computer className="w-auto"/>
        </Button>
      </DialogTrigger>
      <div >
          <DialogContent className="absolute max-w-[800px] h-[600px]">
          <DialogHeader>
            <DialogTitle> Equipo asignado a {nombre}</DialogTitle>
            <DialogDescription>Estos son los equipos asignados a este empleado, si desea eliminar su asignacion, 
                presione sobre el equipo que desea eliminar y luego,
                el boton de debajo.</DialogDescription>
          </DialogHeader>
          <div className=" relative w-[700px] h-[80px] bottom-[315px] right-[270px]">
          {asignacionesData.length > 0 ? (
            <Carousel className="absolute left-[500px] top-[150px] w-full max-w-xs">
                <CarouselContent>
                    {asignacionesData.map((item, index) => (
                    <CarouselItem key={item.id}>
                        <div className="p-1">
                        <Card onClick={() => handleSelectAsignacion(item.id)}
                                className={
                                selectedCardId === item.id 
                                  ? 'bg-red-400'
                                  : ''
                              }>
                            <CardContent className="aspect-square items-center justify-center p-6">
                            <p className=" text-xl font-semibold">{item.equipoId}</p>
                            <p className=" text-xl font-semibold">{item.nombre_Equipo}</p>
                            <p className=" text-xl font-semibold">{item.estado}</p>
                            <p className=" text-xl font-semibold">{item.fecha_Asignacion.toString()}</p>
                            <span className=" absolute text-xl font-light bottom-[50px]">{index + 1}</span>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
                
                ) : (
                    <div className=" absolute left-[500px] top-[150px] w-full max-w-xs">
                    <Card className="aspect-square items-center justify-center p-6">
                    <CardContent>
                        <h1 className=" text-xl font-bold">
                        No tiene equipo asignado
                        </h1>
                        
                        <p className="text-l font-medium absolute top-[150px]">
                        Aún no se ha asignado ningún equipo a este usuario.
                        </p>
                    </CardContent>
                    </Card>
                    </div>
                )}
          </div>
          <DialogFooter className=" absolute bottom-[90px] left-[370px]">
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
            <AlertDialogTitle>Estas seguro que quieres eliminar este empleado?</AlertDialogTitle>
            <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente 
            el Empleado y eliminará sus datos de nuestros servidores.
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
