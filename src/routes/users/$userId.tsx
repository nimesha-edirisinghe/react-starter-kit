import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "~/components/feedback/NotFound";
import { UserErrorComponent } from "~/components/feedback/UserError";
import { fetchUserById } from "../api/loaders/users.loader";

export const Route = createFileRoute("/users/$userId")({
  loader: async ({ params }) => {
    return await fetchUserById(params.userId);
  },
  errorComponent: UserErrorComponent,
  component: UserComponent,
  notFoundComponent: () => {
    return <NotFound>User not found</NotFound>;
  },
});

function UserComponent() {
  const user = Route.useLoaderData();

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{user.name}</h4>
      <div className="text-sm">{user.email}</div>
    </div>
  );
}
