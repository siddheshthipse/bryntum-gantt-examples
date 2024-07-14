import React from 'react';
import '@/styles/globals.scss';

export const metadata = {
    title       : 'Bryntum Gantt - Basic setup with TypeScript (NEXT.js App Router)',
    description : 'This demo contains the NEXT.js Gantt chart wrapper and the demo is written in TypeScript'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="themes/gantt.stockholm.css" data-bryntum-theme />
                <link rel="icon" href="favicon.png" type="image/png" />
            </head>
            <body>{children}</body>
        </html>
    );
}
