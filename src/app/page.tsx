import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Logo className="h-16 w-16 text-primary" />
          <div className="text-center">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
              Gold
            </h1>
            <p className="mt-1 text-muted-foreground">
              Welcome back. Sign in to your account.
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
