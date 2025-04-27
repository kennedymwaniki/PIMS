import {
  pgTable,
  serial,
  varchar,
  integer,
  decimal,
  boolean,
  timestamp,
  text,
  pgEnum,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enum for user roles
// prettier-ignore
export const roleEnum = pgEnum("role", ["Doctor", "admin", "both"]);
export const genderEnum = pgEnum("gender", ["male", "female", "unspecified"]);
export const statusEnum = pgEnum("status", ["active", "completed", "pending"]);
export const appointmentStatusEnum = pgEnum("appointmentStatus", [
  "scheduled",
  "completed",
  "cancelled",
  "no-show",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  contact: varchar("contact", { length: 255 }).notNull(),
  role: roleEnum("role").notNull().default("Doctor"),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  fullname: varchar("fullname", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 255 }).notNull().unique(),
  address: varchar("address", { length: 255 }).notNull(),
  dob: date("dob").notNull(),
  gender: genderEnum("gender").default("unspecified"),
});

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  isActive: boolean("isActive").notNull().default(true),
  startdate: date("startdate").notNull(),
  enddate: date("enddate").notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  clientId: integer("clientId")
    .notNull()
    .references(() => clients.id),
  programId: integer("programId")
    .notNull()
    .references(() => programs.id),
  status: statusEnum("status").default("pending"),
  enroller: integer("enroller").references(() => users.id),
  enrollmentdate: date("enrollmentdate").notNull(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  clientId: integer("clientId")
    .notNull()
    .references(() => clients.id),
  doctorId: integer("doctorId").references(() => users.id),
  appointmentdate: date("appointmentdate").notNull(),
  description: text("description").notNull(),
  status: appointmentStatusEnum("status").default("scheduled"),
});

export const userRelations = relations(users, ({ many }) => ({
  enrollments: many(enrollments), // One user can have many enrollments
  appointments: many(appointments), // One user can have many appointments
}));

export const clientRelations = relations(clients, ({ many }) => ({
  enrollments: many(enrollments), // One client can have many enrollments
  appointments: many(appointments), // One client can have many appointments
}));

export const programRelations = relations(programs, ({ many }) => ({
  enrollments: many(enrollments), // One program can have many enrollments
}));

// prettier-ignore
export const enrollmentRelations = relations(enrollments, ({one})=>({
  client: one(clients, { fields: [enrollments.clientId], references: [clients.id] }), // One enrollment belongs to one client
  program: one(programs, { fields: [enrollments.programId], references: [programs.id] }), // One enrollment belongs to one program
  enroller: one(users, { fields: [enrollments.enroller], references: [users.id] }), // One enrollment belongs to one enroller
}))

// prettier-ignore
export const appointmentRelations = relations(appointments,({one})=>({
  client: one(clients, { fields: [appointments.clientId], references: [clients.id] }), // One appointment belongs to one client
  doctor: one(users, { fields: [appointments.doctorId], references: [users.id] }), // One appointment belongs to one doctor
  
}))

export type TSUsers = typeof users.$inferSelect;
export type TIUsers = typeof users.$inferInsert;

export type TIClients = typeof clients.$inferInsert;
export type TSClients = typeof clients.$inferSelect;

export type TIPrograms = typeof programs.$inferInsert;
export type TSPrograms = typeof programs.$inferSelect;

export type TIEnrollments = typeof enrollments.$inferInsert;
export type TSEnrollments = typeof enrollments.$inferSelect;

export type TIAppointments = typeof appointments.$inferInsert;
export type TSAppointments = typeof appointments.$inferSelect;
