import { createFileRoute, Link } from '@tanstack/react-router';
import { FileSearch } from 'lucide-react';
import { Button } from '~/components/ui/button';

export const Route = createFileRoute('/_protected/posts/')({
  component: PostsIndexComponent
});

function PostsIndexComponent() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2">
      <FileSearch className="h-10 w-10 text-muted-foreground" />
      <h2 className="text-xl font-semibold">No post selected</h2>
      <p className="text-sm text-muted-foreground">
        Please choose a post from the list on the left.
      </p>
      <Button asChild variant="outline">
        <Link to="/posts/$postId" params={{ postId: '1' }}>
          Go to first post
        </Link>
      </Button>
    </div>
  );
}
