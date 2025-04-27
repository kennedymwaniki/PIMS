import { programs } from "./../drizzle/schema";
import { TSUsers, TIUsers } from "./../drizzle/schema";
import db from "../drizzle/db";
import { eq } from "drizzle-orm";

import { users } from "../drizzle/schema";

export const getUsers = async () => {
  const users = await db.query.users.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
      contact: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    with: {
      appointments: {
        columns: {
          id: true,
          appointmentdate: true,
          description: true,
          status: true,
        },
      },
      enrollments: {
        columns: {
          id: true,
          enroller: true,
          enrollmentdate: true,
          status: true,
        },
        with: {
          program: {
            columns: {
              name: true,
              description: true,
              isActive: true,
              startdate: true,
              enddate: true,
            },
          },
        },
      },
    },
  });
  return users;
};

export const getUserById = async (id: number) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      id: true,
      name: true,
      email: true,
      contact: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    with: {
      appointments: {
        columns: {
          id: true,
          appointmentdate: true,
          description: true,
          status: true,
        },
      },
      enrollments: {
        columns: {
          id: true,
          enroller: true,
          enrollmentdate: true,
          status: true,
        },
        with: {
          program: {
            columns: {
              name: true,
              description: true,
              isActive: true,
              startdate: true,
              enddate: true,
            },
          },
        },
      },
    },
  });
  return user;
};

export const createUser = async (user: TIUsers) => {
  const User = await db.insert(users).values(user).returning();
  return User;
};

export const updateUser = async (id: number, user: TIUsers) => {
  const updatedUser = await db
    .update(users)
    .set(user)
    .where(eq(users.id, id))
    .returning();
  return updatedUser;
};

export const deleteUserService = async (id: number) => {
  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  return deletedUser;
};

export const getUserAppointments = async (id: number) => {
  const appointments = await db.query.users.findMany({
    where: eq(users.id, id),
    with: {
      appointments: {
        columns: {
          id: true,
          appointmentdate: true,
          description: true,
          status: true,
        },
      },
    },
  });
  return appointments;
};
