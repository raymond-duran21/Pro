import axios from 'axios';
import { CreateAsignaciones, Asignaciones, Programas, CreatePrograma, AsignarProgramaEquipo } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateProgramas = async (
    data: CreatePrograma
) => {

    try{ 
      const result = await axios.post(
        `${apiUrl}/Programas`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const AsignarProgramasEquipos = async (
    data: AsignarProgramaEquipo
) => {

    try{ 
      const result = await axios.post(
        `${apiUrl}/Programas/Asignar`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const getAllProgramas = async () => {
  
    try {
      const response = await axios.get<Programas[]>(`${apiUrl}/Programas`
      );
      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getProgramasById = async (
    id: Number
) => {
  
    try {
      const response = await axios.get<Programas>(`${apiUrl}/Programas/${id}`);

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const DeleteProgramas = async (
    id: Number
) => {

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Programas/${id}`
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};