import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { appointments, TIAppointments } from "../drizzle/schema";

export const getAppointmentsService = async () => {
  const appointments = await db.query.appointments.findMany();
  return appointments;
};

export const getAppointmentByIdService = async (id: number) => {
  const appointment = await db.query.appointments.findFirst({
    where: eq(appointments.id, id),
  });
  return appointment;
};

export const updateAppointmentService = async (
  appointment: TIAppointments,
  id: number
) => {
  const updatedAppointment = await db
    .update(appointments)
    .set(appointment)
    .where(eq(appointments.id, id))
    .returning();
  return updatedAppointment;
};

export const createAppointmentService = async (appointment: TIAppointments) => {
  const newAppointment = await db.insert(appointments).values(appointment);
  return newAppointment;
};

export const deleteAppointmentService = async (id: number) => {
  const deletedAppointment = await db
    .delete(appointments)
    .where(eq(appointments.id, id))
    .returning();
  return deletedAppointment;
};
