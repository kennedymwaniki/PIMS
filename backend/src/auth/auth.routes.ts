import { Hono } from "hono";

export const authRoutes = new Hono();

import { login, registerUser } from "./auth.controller";

authRoutes.post("/register", registerUser);
authRoutes.post("/login", login);
