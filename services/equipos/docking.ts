import axios from 'axios';
import { CreateDocking, Docking, UpdateDocking } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateDockings = async (
    data: CreateDocking
) => {

    try{ 
      const result = await axios.post(
        `${apiUrl}/Docking`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const getAllDockings = async () => {
  
    try {
      const response = await axios.get<Docking[]>(`${apiUrl}/Docking`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getDockingById = async (
    id: Number
) => {
  
    try {
      const response = await axios.get<UpdateDocking>(`${apiUrl}/Docking/${id}`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const UpdateDockings = async (
    id: Number,
    data: UpdateDocking
) => {

    try{ 
      const result = await axios.patch(
        `${apiUrl}/Docking/${id}`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const DeleteDockings = async (
    id: Number,
) => {

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Docking/${id}`
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};