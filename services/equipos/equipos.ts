import axios from 'axios';
import { Equipos, CreateEquipo, UpdateEquipo, EquipoWithPrograma } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateEquipos = async (
    data: CreateEquipo,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.post(
        `${apiUrl}/Equipos`,
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

export const getAllEquipos = async () => {
  
    try {
      const response = await axios.get<Equipos[]>(`${apiUrl}/Equipos`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getEquiposById = async (
    id: Number
) => {
  
    try {
      const response = await axios.get<UpdateEquipo>(`${apiUrl}/Equipos/${id}`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const UpdateEquipos = async (
    id: Number,
    data: UpdateEquipo,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.patch(
        `${apiUrl}/Equipos/${id}`,
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

export const DeleteEquipos = async (
    id: Number,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Equipos/${id}`, {headers}
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const getEquiposBySerial = async (
  serial: string | undefined
) => {

  try {
    const response = await axios.get<EquipoWithPrograma>(`${apiUrl}/Equipos/BySerial/${serial}`
    );

    return response.data ;
  } catch (error) {
    throw error;
  }
};