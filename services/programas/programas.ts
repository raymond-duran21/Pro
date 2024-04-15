import axios from 'axios';
import { CreateAsignaciones, Asignaciones, Programas, CreatePrograma, AsignarProgramasEquipos } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateProgramas = async (
    data: CreatePrograma,
    token: string | undefined

) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.post(
        `${apiUrl}/Programas`,
        {
            ...data,
        },
        {
            headers,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const AsignarProgramasEquipo = async (
    equipoId: number,
    programaId: number[],
    token: string | undefined

) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.post(
        `${apiUrl}/Programas/Asignar`,
        {
          equipoId,
          programaId
        },
        {
            headers,
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
    id: Number,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Programas/${id}`, {headers}
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};