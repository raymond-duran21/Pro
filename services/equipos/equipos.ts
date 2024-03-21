import axios from 'axios';
import { Equipos, CreateEquipo, UpdateEquipo } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateEquipos = async (
    data: CreateEquipo
) => {

    try{ 
      const result = await axios.post(
        `${apiUrl}/Equipos`,
        {
            ...data,
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
    data: UpdateEquipo
) => {

    try{ 
      const result = await axios.patch(
        `${apiUrl}/Equipos/${id}`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const DeleteEquipos = async (
    id: Number,
) => {

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Equipos/${id}`
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};