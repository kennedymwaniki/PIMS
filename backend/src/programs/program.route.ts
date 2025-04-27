import { Hono } from "hono";

import {
  getPrograms,
  createProgram,
  updateProgram,
} from "./program.controller";
import { doctorRoleAuth } from "../middleware/authBearer";

export const programRouter = new Hono();

programRouter.get("/programs", doctorRoleAuth, getPrograms);
programRouter.post("/programs", doctorRoleAuth, createProgram);
programRouter.patch("/programs/:id", doctorRoleAuth, updateProgram);
