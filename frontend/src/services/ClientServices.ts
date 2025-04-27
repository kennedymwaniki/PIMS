// get all clients
import { ClientResponse } from "../types/types";

import api from "../axios";

export const getAllClients = async (): Promise<ClientResponse[]> => {
  try {
    const response = await api.get("/clients");
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};
