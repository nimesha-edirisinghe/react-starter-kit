import { Link, createFileRoute } from "@tanstack/react-router";
import { NotFound } from "~/components/feedback/NotFound";
import { PostErrorComponent } from "~/components/feedback/PostError";
import { fetchPostById } from "../api/loaders/posts.loader";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ params }) => {
    return await fetchPostById(params.postId);
  },
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  },
});

function PostComponent() {
  const post = Route.useLoaderData();

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
      <Link
        to="/posts/$postId/deep"
        params={{
          postId: post.id,
        }}
        activeProps={{ className: "text-black font-bold" }}
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        Deep View
      </Link>
    </div>
  );
}
