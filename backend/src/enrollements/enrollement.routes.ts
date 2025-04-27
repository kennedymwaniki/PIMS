import { doctorRoleAuth } from "./../middleware/authBearer";
import { Hono } from "hono";
import { getAllEnrollments, CreateEnrollment } from "./enrollement.controller";

const enrollmentRouter = new Hono();

enrollmentRouter.get("/enrollments", doctorRoleAuth, getAllEnrollments);

enrollmentRouter.post("/enrollments", doctorRoleAuth, CreateEnrollment);

//  routes requiring ID
// enrollmentRouter.get("/enrollments/:id", handleGetEnrollmentById);
// enrollmentRouter.put("/enrollments/:id", handleUpdateEnrollment);
// enrollmentRouter.delete("/enrollments/:id", handleDeleteEnrollment);

export default enrollmentRouter;
