import { Context } from "hono";
import {
  createProgramService,
  getAllProgramsService,
  updateProgramService,
} from "./program.service";

export const getPrograms = async (c: Context) => {
  const users = await getAllProgramsService();
  return c.json(users, 200);
};

export const createProgram = async (c: Context) => {
  try {
    const program = await c.req.json();
    const createdProgram = await createProgramService(program);

    if (!createdProgram) {
      return c.text("Program not created", 400);
    }
    return c.json({ msg: createdProgram }, 201);
  } catch (error: unknown) {
    console.log(error instanceof Error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json({ error: errorMessage }, 400);
  }
};

export const updateProgram = async (c: Context) => {
  try {
    const program = await c.req.json();
    const id = Number(c.req.param("id"));
    const updatedProgram = await updateProgramService(program, id);
    if (!updatedProgram) {
      return c.text("Program not updated", 400);
    }
  } catch (error: unknown) {
    console.log(error instanceof Error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json({ error: errorMessage }, 400);
  }
};
