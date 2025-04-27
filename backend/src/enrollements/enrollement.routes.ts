import { Hono } from "hono";
import { getAllEnrollments, CreateEnrollment } from "./enrollement.controller";
// import { bearerAuth } from "../middleware/authBearer"; // Uncomment if auth is needed

const enrollmentRouter = new Hono();

// Public routes (or apply middleware selectively)
enrollmentRouter.get("/enrollments", getAllEnrollments);

enrollmentRouter.post("/enrollments", CreateEnrollment);

//  routes for GET by ID, PUT, DELETE as needed
// enrollmentRouter.get("/enrollments/:id", handleGetEnrollmentById);
// enrollmentRouter.put("/enrollments/:id", handleUpdateEnrollment);
// enrollmentRouter.delete("/enrollments/:id", handleDeleteEnrollment);

export default enrollmentRouter;
