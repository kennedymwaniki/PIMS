import { Hono } from "hono";
import {
  getAllUsers,
  getUser,
  createNewUser,
  updateUserById,
  deleteUser,
} from "./users.controller";
// import { adminRoleAuth, doctorRoleAuth, bothRoleAuth } from "../middleware/authBearer"; // Uncomment and use appropriate auth middleware

const userRouter = new Hono();

userRouter.get("/users", getAllUsers);
userRouter.post("/users", createNewUser);

userRouter.get("/users/:id", getUser);
userRouter.patch("/users/:id", updateUserById);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;
