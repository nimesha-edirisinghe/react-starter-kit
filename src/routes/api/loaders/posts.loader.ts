import { PostI } from "~/types/post";
import { postService } from "../services/posts.service";

export async function fetchPosts(): Promise<PostI[]> {
  try {
    return await postService.getAll();
  } catch (error) {
    console.error("Loader: fetchPosts failed", error);
    throw new Error("Failed to load posts");
  }
}

export async function fetchPostById(postId: string): Promise<PostI> {
  try {
    const id = parseInt(postId, 10);
    if (isNaN(id)) throw new Error("Invalid post ID");

    return await postService.getById(id);
  } catch (error) {
    console.error("Loader: fetchPostById failed", error);
    throw new Error("Failed to load post");
  }
}
