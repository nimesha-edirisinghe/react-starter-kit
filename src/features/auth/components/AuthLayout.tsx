import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '~/components/ui/card';

interface AuthLayoutProps {
  title: string;
  description: string;
  footer?: string;
  children: React.ReactNode;
}

export function AuthLayout({ title, description, footer, children }: AuthLayoutProps) {
  return (
    <div className="relative overflow-hidden min-h-screen  flex items-center justify-center bg-background select-none">
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && (
          <CardFooter className="text-xs text-muted-foreground justify-center">{footer}</CardFooter>
        )}
      </Card>
    </div>
  );
}
