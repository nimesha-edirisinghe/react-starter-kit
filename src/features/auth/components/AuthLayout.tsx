import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '~/components/ui/card';
import logoImage from '~/assets/images/logo.png';

interface AuthLayoutProps {
  description: string;
  footer?: string;
  children: React.ReactNode;
}

export function AuthLayout({ description, footer, children }: AuthLayoutProps) {
  return (
    <div className="relative overflow-hidden min-h-screen  flex items-center justify-center bg-background select-none">
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground mb-4">
            <div className="flex flex-row items-center justify-center gap-2">
              <img src={logoImage} alt="Boomerang Logo" className="h-12 w-12 object-contain" />
              <p className="truncate font-bold text-primary text-2xl mt-2">Formula Zone</p>
            </div>
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2 mb-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && (
          <CardFooter className="text-xs text-muted-foreground justify-center">{footer}</CardFooter>
        )}
      </Card>
    </div>
  );
}
