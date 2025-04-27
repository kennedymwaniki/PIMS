import { Hono } from "hono";
import {
  getAllUsers,
  getUser,
  createNewUser,
  updateUserById,
  deleteUser,
} from "./users.controller";
import { doctorRoleAuth } from "../middleware/authBearer";

const userRouter = new Hono();

userRouter.get("/users", doctorRoleAuth, getAllUsers);
userRouter.post("/users", createNewUser);

userRouter.get("/users/:id", doctorRoleAuth, getUser);
userRouter.patch("/users/:id", doctorRoleAuth, updateUserById);
userRouter.delete("/users/:id", doctorRoleAuth, deleteUser);

export default userRouter;
