import axios from 'axios';
import { CreateScanner_Ups, Scanner_Ups, UpdateScanner_Ups } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateScanner = async (
    data: CreateScanner_Ups,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.post(
        `${apiUrl}/Scanner`,
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

export const getAllScanners = async () => {
  
    try {
      const response = await axios.get<Scanner_Ups[]>(`${apiUrl}/Scanner`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getScannerById = async (
    id: Number
) => {
  
    try {
      const response = await axios.get<UpdateScanner_Ups>(`${apiUrl}/Scanner/${id}`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const UpdateScanner = async (
    id: Number,
    data: UpdateScanner_Ups,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.patch(
        `${apiUrl}/Scanner/${id}`,
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

export const DeleteScanner = async (
    id: Number,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Scanner/${id}`,{headers}
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};