import { AuditoriaResult } from "@/types/indes";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

export const getAllAuditorias = async (
  token: string | undefined
) => {
  if (!token) return;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get<AuditoriaResult[]>(`${apiUrl}/Auditoria`, {
      headers,
    });
    return response.data;

  } catch (error) {
    throw error;
  }
};