// get all clients
import { ClientCreateResponse, ClientResponse, CreateClientRequest } from "../types/types";

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

export const getClientById = async (id: number): Promise<ClientResponse> => {
  try {
    const response = await api.get(`/clients/${id}`);
    if (!response.data) {
      throw new Error("No client found");
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching client with ID ${id}:`, error);
    throw error;
  }
};

export const createClient = async (clientData: CreateClientRequest): Promise<ClientCreateResponse> => {
  try {
    const response = await api.post('/clients', clientData);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const updateClient = async (id: number, clientData: Partial<CreateClientRequest>): Promise<ClientResponse> => {
  try {
    const response = await api.put(`/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error(`Error updating client with ID ${id}:`, error);
    throw error;
  }
};

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await api.delete(`/clients/${id}`);
  } catch (error) {
    console.error(`Error deleting client with ID ${id}:`, error);
    throw error;
  }
};
