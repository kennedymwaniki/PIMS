import { serve } from "@hono/node-server";
import { Hono } from "hono";
import clientRouter from "./clients/clients.routes";
import { programRouter } from "./programs/program.route";
import enrollmentRouter from "./enrollements/enrollement.routes";
import { appointmentRouter } from "./appointments/appointment.routes";
import userRouter from "./users/users.routes"; // Import user router
import { authRoutes } from "./auth/auth.routes";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono().basePath("/api");
app.use(logger());
app.use(
  cors({
    origin: "*", // specify your frontend URL
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (c) => {
  return c.text("Hello from Hono!");
});

// Mount routers
app.route("/", clientRouter);
app.route("/", programRouter);
app.route("/", enrollmentRouter);
app.route("/", appointmentRouter);
app.route("/", userRouter);
app.route("/auth/", authRoutes);

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
