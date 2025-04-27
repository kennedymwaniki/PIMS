import { users } from "./../drizzle/schema";
import { Context } from "hono";
import db from "../drizzle/db";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { jwt } from "hono/jwt";
import { sign } from "hono/jwt";

export const registerUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    const User = await db.query.users.findFirst({
      where: eq(users.email, user.email),
    });
    if (User) {
      return c.json(
        { error: "A User with the given email already exists" },
        400
      );
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const createdUser = await db.insert(users).values(user).returning();
    if (!createdUser) {
      return c.text("User not created", 400);
    }
    return c.json({ msg: createdUser }, 201);
  } catch (error: unknown) {
    console.log(error instanceof Error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json({ error: errorMessage }, 400);
  }
};

export const login = async (c: Context) => {
  try {
    const user = await c.req.json();
    const foundUser = await db.query.users.findFirst({
      where: eq(users.email, user.email),
    });
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser?.password as string
    );
    if (!isPasswordValid) {
      return c.json({ error: "Invalid password" }, 400);
    } else {
      let payload = {
        id: foundUser?.id,
        email: foundUser?.email,
        role: foundUser?.role,
        exp: Date.now() + 1000 * 60 * 60 * 24, // 1 day expiration
      };
      const secret = process.env.JWT_SECRET as string;
      const token = await sign(payload, secret);
      return c.json(
        {
          msg: "Login successful",
          token: token,
          user: {
            id: foundUser?.id,
            email: foundUser?.email,
            role: foundUser?.role,
            name: foundUser?.name,
          },
        },
        200
      );
    }
  } catch (error: unknown) {
    console.log(error instanceof Error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json({ error: errorMessage }, 400);
  }
};
