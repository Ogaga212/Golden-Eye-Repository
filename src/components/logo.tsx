import * as React from 'react';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <circle cx="12" cy="12" r="10" className="text-primary" />
        <path
            fillRule="evenodd"
            d="M13.245 7.772a.75.75 0 00-1.066.976 3.003 3.003 0 01-1.34 3.252.75.75 0 10.72 1.302A4.503 4.503 0 0013.5 9.12V7.875a.75.75 0 00-.255-.103z"
            clipRule="evenodd"
            className="fill-primary-foreground"
        />
        <path
            d="M12 4.5a7.5 7.5 0 11-7.05 10.373A.75.75 0 005.82 14.1a6 6 0 105.74-7.925.75.75 0 00-.56-1.425z"
            className="fill-primary-foreground"
        />
    </svg>
);