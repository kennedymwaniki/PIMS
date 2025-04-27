import db from "../drizzle/db";
import { enrollments, TIAppointments, TIEnrollments } from "../drizzle/schema";

export const createEnrollment = async (enrollment: TIEnrollments) => {
  await db.insert(enrollments).values(enrollment);
  return enrollment;
};

export const getEnrollments = async () => {
  const enrollments = await db.query.enrollments.findMany({
    columns: {
      id: true,
      enrollmentdate: true,
      status: true,
    },
    with: {
      client: {
        columns: {
          id: true,
          fullname: true,
          email: true,
          phone: true,
        },
      },
      program: {
        columns: {
          id: true,
          name: true,
          description: true,
          isActive: true,
          startdate: true,
          enddate: true,
        },
      },
    },
  });
  return enrollments;
};

// export const;
