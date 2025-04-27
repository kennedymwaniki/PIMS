import { Context } from "hono";
import {
  getClientsService,
  getClientByIdService,
  createClientService,
  updateClientService,
  deleteClientService,
} from "./clients.service";
import { clients, TIClients } from "../drizzle/schema";
import db from "../drizzle/db";
import { eq } from "drizzle-orm";

// Get all clients
export const getAllClients = async (c: Context) => {
  try {
    const clients = await getClientsService();
    if (!clients || clients.length === 0) {
      return c.json({ msg: "No clients found" }, 404);
    }
    return c.json(clients, 200);
  } catch (error: any) {
    console.error("Error fetching clients:", error);
    return c.json(
      { error: "Failed to fetch clients", details: error?.message },
      500
    );
  }
};

// Get client by ID
export const getClientById = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }
  try {
    const client = await getClientByIdService(id);
    if (!client) {
      return c.json({ error: "Client not found" }, 404);
    }
    return c.json(client, 200);
  } catch (error: any) {
    console.error(`Error fetching client with ID ${id}:`, error);
    return c.json(
      { error: "Failed to fetch client", details: error?.message },
      500
    );
  }
};

// Create a new client
export const createClient = async (c: Context) => {
  try {
    const clientData: TIClients = await c.req.json();

    // if (
    //   !clientData.fullname ||
    //   !clientData.email ||
    //   !clientData.phone ||
    //   !clientData.address ||
    //   !clientData.dob
    // ) {
    //   return c.json(
    //     {
    //       error:
    //         "Missing required fields (fullname, email, phone, address, dob)",
    //     },
    //     400
    //   );
    // }

    const existingClient = await db.query.clients.findFirst({
      where: eq(clients.email, clientData.email),
    });

    if (existingClient) {
      return c.json({ error: "Client with this email already exists" }, 400);
    }

    const newClientResult = await createClientService(clientData);

    if (!newClientResult || newClientResult.length === 0) {
      return c.json({ error: "Failed to create client" }, 500);
    }

    return c.json(
      { message: "Client created successfully", data: newClientResult[0] },
      201
    );
  } catch (error: any) {
    console.error("Error creating client:", error);
    return c.json(
      { error: "Failed to create client", details: error?.message },
      500 // Use 500 for server errors
    );
  }
};

// Update a client
export const updateClient = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }
  try {
    const clientData: TIClients = await c.req.json();

    if (
      !clientData.fullname &&
      !clientData.email &&
      !clientData.phone &&
      !clientData.address &&
      !clientData.dob
    ) {
      return c.json({ error: "No fields provided for update" }, 400);
    }

    const updatedClientResult = await updateClientService(id, clientData);

    if (!updatedClientResult || updatedClientResult.length === 0) {
      return c.json({ error: "Client not found or failed to update" }, 404);
    }

    return c.json(
      { message: "Client updated successfully", data: updatedClientResult[0] },
      200
    );
  } catch (error: any) {
    console.error(`Error updating client with ID ${id}:`, error);
    return c.json(
      { error: "Failed to update client", details: error?.message },
      500
    );
  }
};

// Delete a client
export const deleteClient = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }
  try {
    const deletedClientResult = await deleteClientService(id);

    if (!deletedClientResult || deletedClientResult.length === 0) {
      return c.json({ error: "Client not found or failed to delete" }, 404);
    }

    return c.json(
      { message: "Client deleted successfully", data: deletedClientResult[0] },
      200
    );
  } catch (error: any) {
    console.error(`Error deleting client with ID ${id}:`, error);
    return c.json(
      { error: "Failed to delete client", details: error?.message },
      500
    );
  }
};
