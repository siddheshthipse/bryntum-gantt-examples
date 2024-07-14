import { Html, Head, Main, NextScript } from 'next/document.js';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="stylesheet" href="themes/gantt.stockholm.css" data-bryntum-theme />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
