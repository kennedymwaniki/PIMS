import { Context } from "hono";
import {
  getAppointmentsService,
  getAppointmentByIdService,
  createAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
} from "./appointment.service";
import { TIAppointments } from "../drizzle/schema";

// Get all appointments
export const getAllAppointments = async (c: Context) => {
  try {
    const appointments = await getAppointmentsService();
    if (!appointments || appointments.length === 0) {
      return c.json({ msg: "No appointments found" }, 200);
    }
    return c.json(appointments, 200);
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return c.json(
      { error: "Failed to fetch appointments", details: error?.message },
      400
    );
  }
};

// Get appointment by ID
export const getAppointmentById = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }
  try {
    const appointment = await getAppointmentByIdService(id);
    if (!appointment) {
      return c.json({ error: "Appointment not found" }, 404);
    }
    return c.json(appointment, 200);
  } catch (error: any) {
    console.error(`Error fetching appointment with ID ${id}:`, error);
    return c.json(
      { error: "Failed to fetch appointment", details: error?.message },
      400
    );
  }
};

// Create a new appointment
export const createAppointment = async (c: Context) => {
  try {
    const appointmentData: TIAppointments = await c.req.json();

    if (
      !appointmentData.clientId ||
      !appointmentData.doctorId ||
      !appointmentData.appointmentdate ||
      !appointmentData.description
    ) {
      return c.json(
        {
          error:
            "Missing required fields (clientId, doctorId, appointmentdate, description)",
        },
        400
      );
    }

    const newAppointmentResult = await createAppointmentService(
      appointmentData
    );

    if (!newAppointmentResult) {
      return c.json({ error: "Failed to create appointment" }, 500);
    }

    const createdAppointment = Array.isArray(newAppointmentResult)
      ? newAppointmentResult[0]
      : newAppointmentResult;

    return c.json(
      { message: "Appointment created successfully", data: createdAppointment },
      201
    );
  } catch (error: any) {
    console.error("Error creating appointment:", error);
    return c.json(
      { error: "Failed to create appointment", details: error?.message },
      500
    );
  }
};

export const updateAppointment = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }
  try {
    const appointmentData: TIAppointments = await c.req.json();

    if (Object.keys(appointmentData).length === 0) {
      return c.json({ error: "No fields provided for update" }, 400);
    }

    const updatedAppointmentResult = await updateAppointmentService(
      appointmentData,
      id
    );

    if (!updatedAppointmentResult || updatedAppointmentResult.length === 0) {
      return c.json(
        { error: "Appointment not found or failed to update" },
        404
      );
    }

    return c.json(
      {
        message: "Appointment updated successfully",
        data: updatedAppointmentResult[0],
      },
      200
    );
  } catch (error: any) {
    console.error(`Error updating appointment with ID ${id}:`, error);
    return c.json(
      { error: "Failed to update appointment", details: error?.message },
      500
    );
  }
};

// Delete an appointment
export const deleteAppointment = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }
  try {
    const deletedAppointmentResult = await deleteAppointmentService(id);

    if (!deletedAppointmentResult || deletedAppointmentResult.length === 0) {
      return c.json(
        { error: "Appointment not found or failed to delete" },
        404
      );
    }

    return c.json(
      {
        message: "Appointment deleted successfully",
        data: deletedAppointmentResult[0],
      },
      200
    );
  } catch (error: any) {
    console.error(`Error deleting appointment with ID ${id}:`, error);
    return c.json(
      { error: "Failed to delete appointment", details: error?.message },
      500
    );
  }
};
