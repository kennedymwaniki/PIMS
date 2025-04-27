import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { clients, TIClients, TSClients } from "../drizzle/schema";

export const getClientsService = async () => {
  const clients = await db.query.clients.findMany({
    columns: {
      id: true,
      fullname: true,
      email: true,
      phone: true,
      address: true,
      dob: true,
    },
    with: {
      enrollments: {
        columns: {
          id: true,
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
      appointments: {
        columns: {
          id: true,
          appointmentdate: true,
          description: true,
          status: true,
        },
        with: {
          doctor: {
            columns: {
              id: true,
              name: true,
              email: true,
              contact: true,
              role: true,
            },
          },
        },
      },
    },
  });
  return clients;
};

export const getClientByIdService = async (id: number) => {
  const client = await db.query.clients.findFirst({
    where: eq(clients.id, id),
    columns: {
      id: true,
      fullname: true,
      email: true,
      phone: true,
      address: true,
      dob: true,
    },
    with: {
      enrollments: {
        columns: {
          id: true,
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
      appointments: {
        columns: {
          id: true,
          appointmentdate: true,
          description: true,
          status: true,
        },
        with: {
          doctor: {
            columns: {
              id: true,
              name: true,
              email: true,
              contact: true,
              role: true,
            },
          },
        },
      },
    },
  });
  return client;
};

export const createClientService = async (client: TIClients) => {
  const newClient = await db.insert(clients).values(client).returning();
  return newClient;
};

export const updateClientService = async (id: number, client: TIClients) => {
  const updatedClient = await db
    .update(clients)
    .set(client)
    .where(eq(clients.id, id))
    .returning();
  return updatedClient;
};

export const deleteClientService = async (id: number) => {
  const deletedClient = await db
    .delete(clients)
    .where(eq(clients.id, id))
    .returning();
  return deletedClient;
};
