import axios from 'axios';
import {  CreateScanner_Ups, Scanner_Ups, UpdateScanner_Ups } from "@/types/indes";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");


export const CreateUps = async (
    data: CreateScanner_Ups
) => {

    try{ 
      const result = await axios.post(
        `${apiUrl}/Ups`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const getAllUps = async () => {
  
    try {
      const response = await axios.get<Scanner_Ups[]>(`${apiUrl}/Ups`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const getUpsById = async (
    id: Number
) => {
  
    try {
      const response = await axios.get<UpdateScanner_Ups>(`${apiUrl}/Ups/${id}`
      );

      return response.data ;
    } catch (error) {
      throw error;
    }
};

export const UpdateUps = async (
    id: Number,
    data: UpdateScanner_Ups
) => {

    try{ 
      const result = await axios.patch(
        `${apiUrl}/Ups/${id}`,
        {
            ...data,
        }
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};

export const DeleteUps = async (
    id: Number,
) => {

    try{ 
      const result = await axios.delete(
        `${apiUrl}/Ups/${id}`
      );

      return result.data;
    }catch (error) {
        throw error;
    }
};