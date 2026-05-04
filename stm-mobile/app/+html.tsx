import { type PropsWithChildren } from 'react';

/** Ensures RN Web root can fill the viewport (fixes blank / zero-height body on some setups). */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en" style={{ height: '100%', overflowX: 'hidden' }}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5"
        />
        <meta name="theme-color" content="#013220" />
      </head>
      <body
        style={{
          height: '100%',
          margin: 0,
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch' as const,
          minHeight: '100dvh',
        }}
      >
        {children}
      </body>
    </html>
  );
}
