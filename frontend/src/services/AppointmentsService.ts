import {
  AppointmentResponse,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
} from "../types/types";
import api from "../axios";

// Get all appointments
export const getAllAppointments = async (): Promise<AppointmentResponse[]> => {
  try {
    const response = await api.get("/appointments");
    if (!response.data) {
      throw new Error("No appointments found");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

// Get appointment by ID
export const getAppointmentById = async (
  id: number
): Promise<AppointmentResponse> => {
  try {
    const response = await api.get(`/appointments/${id}`);
    if (!response.data) {
      throw new Error("Appointment not found");
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching appointment with ID ${id}:`, error);
    throw error;
  }
};

// Create a new appointment
export const createAppointment = async (
  appointmentData: CreateAppointmentRequest
): Promise<AppointmentResponse> => {
  try {
    const response = await api.post("/appointments", appointmentData);
    if (!response.data) {
      throw new Error("Failed to create appointment");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

// Update an appointment
export const updateAppointment = async (
  id: number,
  appointmentData: UpdateAppointmentRequest
): Promise<AppointmentResponse> => {
  try {
    const response = await api.patch(`/appointments/${id}`, appointmentData);
    if (!response.data) {
      throw new Error("Failed to update appointment");
    }
    return response.data.data;
  } catch (error) {
    console.error(`Error updating appointment with ID ${id}:`, error);
    throw error;
  }
};

// Delete an appointment
export const deleteAppointment = async (
  id: number
): Promise<AppointmentResponse> => {
  try {
    const response = await api.delete(`/appointments/${id}`);
    if (!response.data) {
      throw new Error("Failed to delete appointment");
    }
    return response.data.data;
  } catch (error) {
    console.error(`Error deleting appointment with ID ${id}:`, error);
    throw error;
  }
};

// Get appointments by client ID
export const getAppointmentsByClientId = async (
  clientId: number
): Promise<AppointmentResponse[]> => {
  try {
    const response = await api.get(`/appointments/client/${clientId}`);
    if (!response.data) {
      throw new Error("No appointments found for this client");
    }
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching appointments for client ID ${clientId}:`,
      error
    );
    throw error;
  }
};

// Get appointments by doctor ID
export const getAppointmentsByDoctorId = async (
  doctorId: number
): Promise<AppointmentResponse[]> => {
  try {
    const response = await api.get(`/appointments/doctor/${doctorId}`);
    if (!response.data) {
      throw new Error("No appointments found for this doctor");
    }
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching appointments for doctor ID ${doctorId}:`,
      error
    );
    throw error;
  }
};
