import axios from 'axios';
import { CreateFlota, CreateScanner_Ups, Flotas, Scanner_Ups, UpdateFlota, UpdateScanner_Ups } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateFlotas = async (
    data: CreateFlota,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.post(
        `${apiUrl}/Flotas`,
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

export const getAllFlotas = async () => {
  
    try {
      const response = await axios.get<Flotas[]>(`${apiUrl}/Flotas`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getFlotasById = async (
    id: Number
) => {
  
    try {
      const response = await axios.get<UpdateFlota>(`${apiUrl}/Flotas/${id}`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const UpdateFlotas = async (
    id: Number,
    data: UpdateFlota,
    token: string | undefined
) => {
    if (!token) return;

      const headers = {
          Authorization: `Bearer ${token}`,
      };

    try{ 
      const result = await axios.patch(
        `${apiUrl}/Flotas/${id}`,
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

export const DeleteFlotas = async (
    id: Number,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Flotas/${id}`, {headers}
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};