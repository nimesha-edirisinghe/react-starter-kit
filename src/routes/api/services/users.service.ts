import { UserI } from "~/types/user";
import { apiClient } from "../client";

export const userService = {
  getAll: async (): Promise<UserI[]> => {
    const res = await apiClient.get<UserI[]>("/users");
    return res.data;
  },
  getById: async (id: number) => {
    const res = await apiClient.get<UserI>(`/users/${id}`);
    return res.data;
  },
};
