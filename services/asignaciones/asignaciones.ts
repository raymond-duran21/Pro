import axios from 'axios';
import { CreateAsignaciones, Asignaciones } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateAsignacion = async (
    data: CreateAsignaciones,
    token: string | undefined
) => {
    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.post(
        `${apiUrl}/Asignaciones`,
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

export const getAllAsignaciones = async () => {
  
    try {
      const response = await axios.get<Asignaciones[]>(`${apiUrl}/Asignaciones`
      );
      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getAsignacionesById = async (
    id: Number
) => {
  
    try {
      const response = await axios.get<Asignaciones>(`${apiUrl}/Asignaciones/${id}`);

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getAsignacionesByCedula = async (
    cedula: string
) => {
  try {
    const response = await axios.get(`${apiUrl}/Asignaciones/ByCedula/${cedula}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const DeleteAsignaciones = async (
    id: Number,
    token: string | undefined
) => {
    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Asignaciones/${id}`,{
            headers,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};