import { Hono } from "hono";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "./clients.controller";

const clientRouter = new Hono();

// Public routes (or apply middleware selectively)
clientRouter.get("/clients", getAllClients);
clientRouter.post("/clients", createClient);

//
clientRouter.get("/clients/:id", getClientById);
clientRouter.patch("/clients/:id", updateClient);
clientRouter.delete("/clients/:id", deleteClient);

export default clientRouter;
