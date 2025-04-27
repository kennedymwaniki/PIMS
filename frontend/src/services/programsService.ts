import {
  CreateProgramRequest,
  ProgramResponse,
  UpdateProgramRequest,
} from "../types/types";
import api from "../axios";

export const getAllPrograms = async (): Promise<ProgramResponse[]> => {
  try {
    const response = await api.get("/programs");
    if (!response.data) {
      throw new Error("No programs found");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw new Error(
      "An unexpected error occurred while fetching doctor patients"
    );
  }
};

// Get program by ID
export const getProgramById = async (id: number): Promise<ProgramResponse> => {
  try {
    const response = await api.get(`/programs/${id}`);
    if (!response.data) {
      throw new Error("Program not found");
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching program with ID ${id}:`, error);
    throw error;
  }
};

// Create a new program
export const createProgram = async (
  programData: CreateProgramRequest
): Promise<UpdateProgramRequest> => {
  try {
    const response = await api.post("/programs", programData);
    if (!response.data) {
      throw new Error("Failed to create program");
    }
    return response.data.msg;
  } catch (error) {
    console.error("Error creating program:", error);
    throw error;
  }
};

// Update a program
export const updateProgram = async (
  id: number,
  programData: UpdateProgramRequest
): Promise<ProgramResponse> => {
  try {
    const response = await api.patch(`/programs/${id}`, programData);
    if (!response.data) {
      throw new Error("Failed to update program");
    }
    return response.data;
  } catch (error) {
    console.error(`Error updating program with ID ${id}:`, error);
    throw new Error(
      "An unexpected error occurred while updating the program. Please try again later."
    );
  }
};

export const deleteProgram = async (id: number): Promise<ProgramResponse> => {
  try {
    const response = await api.delete(`/programs/${id}`);
    if (!response.data) {
      throw new Error("Failed to delete program");
    }
    return response.data;
  } catch (error) {
    console.error(`Error deleting program with ID ${id}:`, error);
    throw new Error(
      "An unexpected error occurred while deleting the program. Please try again later."
    );
  }
};
