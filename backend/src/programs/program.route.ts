import { Hono } from "hono";

import {
  getPrograms,
  createProgram,
  updateProgram,
} from "./program.controller";

export const programRouter = new Hono();

programRouter.get("/programs", getPrograms);
programRouter.post("/programs", createProgram);
programRouter.patch("/programs/:id", updateProgram);
