import db from "../drizzle/db";
import { eq } from "drizzle-orm";

import { programs, TIPrograms } from "../drizzle/schema";

export const getAllProgramsService = async () => {
  const programs = await db.query.programs.findMany({
    columns: {
      id: true,
      name: true,
      description: true,
      isActive: true,
      startdate: true,
      enddate: true,
    },
  });
  return programs;
};

export const createProgramService = async (program: TIPrograms) => {
  await db.insert(programs).values(program);
  return program;
};

export const updateProgramService = async (program: TIPrograms, id: number) => {
  const updatedProgram = await db
    .update(programs)
    .set(program)
    .where(eq(programs.id, id))
    .returning();
  return updatedProgram;
};
