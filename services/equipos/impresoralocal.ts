import axios from 'axios';
import { CreateImpresoraLocal, ImpresoraLocal, UpdateImpresoraLocal } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateImpresora = async (
    data: CreateImpresoraLocal
) => {

    try{ 
      const result = await axios.post(
        `${apiUrl}/Impresora`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const getAllImpresoras = async () => {
  
    try {
      const response = await axios.get<ImpresoraLocal[]>(`${apiUrl}/Impresora`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getImpresoraById = async (
    id: Number
) => {
  
    try {
      const response = await axios.get<UpdateImpresoraLocal>(`${apiUrl}/Impresora/${id}`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const UpdateImpresora = async (
    id: Number,
    data: UpdateImpresoraLocal
) => {

    try{ 
      const result = await axios.patch(
        `${apiUrl}/Impresora/${id}`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const DeleteImpresora = async (
    id: Number,
) => {

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Impresora/${id}`
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};