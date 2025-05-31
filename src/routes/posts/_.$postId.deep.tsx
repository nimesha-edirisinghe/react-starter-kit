import { Link, createFileRoute } from "@tanstack/react-router";
import { PostErrorComponent } from "~/components/feedback/PostError";
import { fetchPostById } from "../api/loaders/posts.loader";

export const Route = createFileRoute("/posts/_/$postId/deep")({
  loader: async ({ params }) => {
    return await fetchPostById(params.postId);
  },
  errorComponent: PostErrorComponent,
  component: PostDeepComponent,
});

function PostDeepComponent() {
  const post = Route.useLoaderData();

  return (
    <div className="p-2 space-y-2">
      <Link
        to="/posts"
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        ← All Posts
      </Link>
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
    </div>
  );
}
