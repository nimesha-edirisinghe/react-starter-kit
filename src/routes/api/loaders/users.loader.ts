import { userService } from "../services/users.service";
import type { UserI } from "~/types/user";

export async function fetchUsers(): Promise<UserI[]> {
  try {
    return await userService.getAll();
  } catch (error) {
    console.error("Loader: fetchUsers failed", error);
    throw new Error("Failed to load users");
  }
}

export async function fetchUserById(userId: string): Promise<UserI> {
  try {
    const id = parseInt(userId, 10);
    if (isNaN(id)) throw new Error("Invalid user ID");

    return await userService.getById(id);
  } catch (error) {
    console.error("Loader: fetchUserById failed", error);
    throw new Error("Failed to load user");
  }
}
