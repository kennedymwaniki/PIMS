import {
  CreateEnrollmentRequest,
  EnrollmentResponse,
  UpdateEnrollmentRequest,
} from "../types/types";
import api from "../axios";

// Get all enrollments
export const getAllEnrollments = async (): Promise<EnrollmentResponse[]> => {
  try {
    const response = await api.get("/enrollments");
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    throw error;
  }
};

// Get enrollment by ID
export const getEnrollmentById = async (
  id: number
): Promise<EnrollmentResponse> => {
  try {
    const response = await api.get(`/enrollments/${id}`);
    if (!response.data) {
      throw new Error("Enrollment not found");
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching enrollment with ID ${id}:`, error);
    throw error;
  }
};

// Create a new enrollment
export const createEnrollment = async (
  enrollmentData: CreateEnrollmentRequest
): Promise<EnrollmentResponse> => {
  try {
    const response = await api.post("/enrollments", enrollmentData);
    if (!response.data) {
      throw new Error("Failed to create enrollment");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error creating enrollment:", error);
    throw error;
  }
};

// Update an enrollment
export const updateEnrollment = async (
  id: number,
  enrollmentData: UpdateEnrollmentRequest
): Promise<EnrollmentResponse> => {
  try {
    const response = await api.patch(`/enrollments/${id}`, enrollmentData);
    if (!response.data) {
      throw new Error("Failed to update enrollment");
    }
    return response.data.data;
  } catch (error) {
    console.error(`Error updating enrollment with ID ${id}:`, error);
    throw error;
  }
};

// Delete an enrollment
export const deleteEnrollment = async (
  id: number
): Promise<EnrollmentResponse> => {
  try {
    const response = await api.delete(`/enrollments/${id}`);
    if (!response.data) {
      throw new Error("Failed to delete enrollment");
    }
    return response.data.data;
  } catch (error) {
    console.error(`Error deleting enrollment with ID ${id}:`, error);
    throw error;
  }
};

// Get enrollments by client ID
export const getEnrollmentsByClientId = async (
  clientId: number
): Promise<EnrollmentResponse[]> => {
  try {
    const response = await api.get(`/enrollments/client/${clientId}`);
    if (!response.data) {
      throw new Error("No enrollments found for this client");
    }
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching enrollments for client ID ${clientId}:`,
      error
    );
    throw error;
  }
};

// Get enrollments by program ID
export const getEnrollmentsByProgramId = async (
  programId: number
): Promise<EnrollmentResponse[]> => {
  try {
    const response = await api.get(`/enrollments/program/${programId}`);
    if (!response.data) {
      throw new Error("No enrollments found for this program");
    }
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching enrollments for program ID ${programId}:`,
      error
    );
    throw error;
  }
};
