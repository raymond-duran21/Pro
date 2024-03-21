import axios from 'axios';
import { Empleados,CreateEmpleados, UpdateEmpleado } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateEmpleado = async (
    data: CreateEmpleados
) => {

    try{ 
      const result = await axios.post(
        `${apiUrl}/Empleados`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const getAllEmpleados = async () => {
  
    try {
      const response = await axios.get<Empleados[]>(`${apiUrl}/Empleados`
      );
      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getEmpleadosById = async (
    id: Number
) => {
  
    try {
      const response = await axios.get<Empleados>(`${apiUrl}/Empleados/${id}`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const UpdateEmpleados = async (
    id: Number,
    data: UpdateEmpleado
) => {

    try{ 
      const result = await axios.patch(
        `${apiUrl}/Empleados/${id}`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const DeleteEmpleados = async (
    id: Number
) => {

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Empleados/${id}`
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};