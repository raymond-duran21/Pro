import axios from 'axios';
import { CreateFlota, CreateScanner_Ups, Flotas, Scanner_Ups, Tabletas, UpdateFlota, UpdateScanner_Ups, UpdateTableta } from "@/types/indes";
import { CreateTableta } from '../../types/indes';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateTabletas = async (
    data: CreateTableta
) => {

    try{ 
      const result = await axios.post(
        `${apiUrl}/Tableta`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const getAllTabletas = async () => {
  
    try {
      const response = await axios.get<Tabletas[]>(`${apiUrl}/Tableta`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getTabletasById = async (
    id: Number
) => {
  
    try {
      const response = await axios.get<UpdateTableta>(`${apiUrl}/Tableta/${id}`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const UpdateTabletas = async (
    id: Number,
    data: UpdateTableta
) => {

    try{ 
      const result = await axios.patch(
        `${apiUrl}/Tableta/${id}`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const DeleteTabletas = async (
    id: Number,
) => {

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Tableta/${id}`
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};