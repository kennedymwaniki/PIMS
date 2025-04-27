import { Hono } from "hono";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "./clients.controller";
import { doctorRoleAuth } from "../middleware/authBearer";

const clientRouter = new Hono();

// Public routes (or apply middleware selectively)
clientRouter.get("/clients", doctorRoleAuth, getAllClients);
clientRouter.post("/clients", doctorRoleAuth, createClient);

//
clientRouter.get("/clients/:id", doctorRoleAuth, getClientById);
clientRouter.patch("/clients/:id", doctorRoleAuth, updateClient);
clientRouter.delete("/clients/:id", doctorRoleAuth, deleteClient);

export default clientRouter;
