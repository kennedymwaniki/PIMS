import { Context } from "hono";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserService,
} from "./users.service";
import { TIUsers } from "../drizzle/schema";
import bcrypt from "bcrypt";

// Get all users
export const getAllUsers = async (c: Context) => {
  try {
    const users = await getUsers();
    return c.json(users, 200);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return c.json(
      { error: "Failed to fetch users", details: error?.message },
      500
    );
  }
};

// Get user by ID
export const getUser = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }
  try {
    const user = await getUserById(id);
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json(user, 200);
  } catch (error: any) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return c.json(
      { error: "Failed to fetch user", details: error?.message },
      500
    );
  }
};

// Create a new user
export const createNewUser = async (c: Context) => {
  try {
    const userData = await c.req.json();

    if (
      !userData.name ||
      !userData.email ||
      !userData.pasword ||
      !userData.contact
    ) {
      return c.json(
        {
          error: "Missing required fields (name, email, password, contact)",
        },
        400
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.pasword, 10);
    userData.pasword = hashedPassword;

    const newUserResult = await createUser(userData);

    if (!newUserResult || newUserResult.length === 0) {
      return c.json({ error: "Failed to create user" }, 400);
    }

    return c.json(
      { message: "User created successfully", data: newUserResult[0] },
      201
    );
  } catch (error: any) {
    console.error("Error creating user:", error);
    // Check for unique constraint violation (example for email)
    if (error?.code === "23505" && error?.constraint === "users_email_unique") {
      return c.json({ error: "Email already exists" }, 409); // Conflict
    }
    return c.json(
      { error: "Failed to create user", details: error?.message },
      500
    );
  }
};

// Update a user
export const updateUserById = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }
  try {
    const userData = await c.req.json();

    if (userData.pasword) {
      const hashedPassword = await bcrypt.hash(userData.pasword, 10);
      userData.pasword = hashedPassword;
    }

    const updatedUserResult = await updateUser(id, userData);

    if (!updatedUserResult || updatedUserResult.length === 0) {
      return c.json({ error: "User not found or failed to update" }, 404);
    }

    return c.json(
      { message: "User updated successfully", data: updatedUserResult[0] },
      200
    );
  } catch (error: any) {
    console.error(`Error updating user with ID ${id}:`, error);
    // Check for unique constraint violation (example for email)
    if (error?.code === "23505" && error?.constraint === "users_email_unique") {
      return c.json({ error: "Email already exists" }, 409); // Conflict
    }
    return c.json(
      { error: "Failed to update user", details: error?.message },
      500
    );
  }
};

// Delete a user
export const deleteUser = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }
  try {
    const deletedUserResult = await deleteUserService(id);

    if (!deletedUserResult || deletedUserResult.length === 0) {
      return c.json({ error: "User not found or failed to delete" }, 404);
    }

    return c.json(
      { message: "User deleted successfully", data: deletedUserResult[0] },
      200
    );
  } catch (error: any) {
    console.error(`Error deleting user with ID ${id}:`, error);
    return c.json(
      { error: "Failed to delete user", details: error?.message },
      500
    );
  }
};
