import axios from 'axios';
import { CreateMonitor, Monitor, UpdateMonitor } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateMonitores = async (
    data: CreateMonitor,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.post(
        `${apiUrl}/Monitor`,
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

export const getAllMonitores = async () => {
  
    try {
      const response = await axios.get<Monitor[]>(`${apiUrl}/Monitor`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getMonitorById = async (
    id: Number
) => {
  
    try {
      const response = await axios.get<UpdateMonitor>(`${apiUrl}/Monitor/${id}`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const UpdateMonitores = async (
    id: Number,
    data: UpdateMonitor,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.patch(
        `${apiUrl}/Monitor/${id}`,
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

export const DeleteMonitor = async (
    id: Number,
    token: string | undefined
) => {

    if (!token) return;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Monitor/${id}`,{headers}
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};