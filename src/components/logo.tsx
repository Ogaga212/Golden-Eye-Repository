import * as React from 'react';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="12" cy="12" r="10" className="text-primary" fill="currentColor" />
        <path
            d="M15.5 8.5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-2"
            className="stroke-primary-foreground"
        />
        <path d="M7.5 12.5h5" className="stroke-primary-foreground" />
    </svg>
);
