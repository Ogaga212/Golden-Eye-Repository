
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.7c-.6 0-1.3.3-1.3.8V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z" />
  </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 20.9a9.6 9.6 0 0 0 4.5-1.2c-1.4-1-2.2-2.8-2.2-4.6 0-2.2 1-4.2 2.5-5.5a4.8 4.8 0 0 1 2.2-1.3c-.5-.7-1.2-1.2-2-1.5a6.9 6.9 0 0 0-6 2.3A7.2 7.2 0 0 0 9 12.3c0 2.8 1.9 5.2 4.4 6.1.1 0 .2.2.3.4a4.1 4.1 0 0 1-1.7 2.1z" />
    <path d="M16 4.3a4.2 4.2 0 0 1 2.2 1.3 4.5 4.5 0 0 0-3.3 1.4A5.4 5.4 0 0 0 13.4 9c0 .2 0 .3.1.5a11 11 0 0 1 3.4-6.2z" />
  </svg>
);

export function LoginForm() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              defaultValue="trader@gold.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required defaultValue="password" />
          </div>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Sign In
          </Button>
        </form>
        <div className="relative my-6">
          <Separator />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <span className="mx-auto flex w-fit bg-card px-2 text-sm text-muted-foreground">
              OR
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            <GoogleIcon className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full">
            <AppleIcon className="mr-2 h-4 w-4" />
            Continue with Apple
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
