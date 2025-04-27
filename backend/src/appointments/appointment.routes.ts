import { Hono } from "hono";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "./appointment.controller";
// import { bearerAuth } from "../middleware/authBearer"; // Uncomment if auth is needed

export const appointmentRouter = new Hono();

// Public routes (or apply middleware selectively)
appointmentRouter.get("/appointments", getAllAppointments);
appointmentRouter.post("/appointments", createAppointment);

// Routes requiring ID
appointmentRouter.get("/appointments/:id", getAppointmentById);
appointmentRouter.patch("/appointments/:id", updateAppointment);
appointmentRouter.delete("/appointments/:id", deleteAppointment);
