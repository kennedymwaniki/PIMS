import { Hono } from "hono";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "./appointment.controller";
import { doctorRoleAuth } from "../middleware/authBearer";

export const appointmentRouter = new Hono();

appointmentRouter.get("/appointments", doctorRoleAuth, getAllAppointments);
appointmentRouter.post("/appointments", createAppointment);

// Routes requiring ID
appointmentRouter.get("/appointments/:id", doctorRoleAuth, getAppointmentById);
appointmentRouter.patch("/appointments/:id", doctorRoleAuth, updateAppointment);
appointmentRouter.delete(
  "/appointments/:id",
  doctorRoleAuth,
  deleteAppointment
);
