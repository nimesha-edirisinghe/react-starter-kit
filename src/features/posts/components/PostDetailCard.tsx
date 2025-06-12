interface PostDetailCardProps {
  title: string;
  body: string;
}

export const PostDetailCard = ({ title, body }: PostDetailCardProps) => {
  return (
    <div className="rounded-lg border bg-background p-5 shadow-sm transition hover:shadow-md">
      <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
};
