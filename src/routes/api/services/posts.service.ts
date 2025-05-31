import { PostI } from "~/types/post";
import { apiClient } from "../client";

export const postService = {
  getAll: async (): Promise<PostI[]> => {
    const res = await apiClient.get<PostI[]>("/posts");
    return res.data;
  },
  getById: async (id: number) => {
    const res = await apiClient.get<PostI>(`/posts/${id}`);
    return res.data;
  },
};
