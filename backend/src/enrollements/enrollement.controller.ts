import { Context } from "hono";
import { createEnrollment, getEnrollments } from "./enrollement.service";
import { TIEnrollments } from "../drizzle/schema";

// Get all enrollments
export const getAllEnrollments = async (c: Context) => {
  try {
    const enrollments = await getEnrollments();
    if (!enrollments || enrollments.length === 0) {
      return c.text("No enrollments found", 200);
    }
    return c.json(enrollments, 200);
  } catch (error: any) {
    console.error("Error fetching enrollments:", error);
    return c.json(
      { error: "Failed to fetch enrollments", details: error?.message },
      400
    );
  }
};

// Create a new enrollment
export const CreateEnrollment = async (c: Context) => {
  try {
    const enrollmentData = await c.req.json();

    if (
      !enrollmentData.clientId ||
      !enrollmentData.programId ||
      !enrollmentData.enrollmentdate
    ) {
      return c.json(
        {
          error:
            "Missing required fields (clientId, programId, enrollmentdate)",
        },
        400
      );
    }

    const newEnrollmentResult = await createEnrollment(enrollmentData);

    if (!newEnrollmentResult) {
      return c.json({ error: "Failed to create enrollment" }, 400);
    }

    return c.json(
      { message: "Enrollment created successfully", data: newEnrollmentResult },
      201
    );
  } catch (error: any) {
    console.error("Error creating enrollment:", error);
    return c.json(
      { error: "Failed to create enrollment", details: error?.message },
      400
    );
  }
};
