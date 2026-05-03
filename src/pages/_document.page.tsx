import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        {/* DM font family — used by case-study layout */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono&display=swap"
          rel="stylesheet"
        />

        {/* Favicon links */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Designer and builder — I build things that make work (and life) a little better."
        />
        <meta property="og:title" content="git" />
        <meta
          property="og:description"
          content="Designer and builder — I build things that make work (and life) a little better."
        />
        <meta property="og:url" content="https://www.gitmelgutierrez.com" />
        <meta property="og:image" content="https://www.gitmelgutierrez.com/opengraph.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="git" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="git" />
        <meta
          name="twitter:description"
          content="Designer and builder — I build things that make work (and life) a little better."
        />
        <meta name="twitter:image" content="https://www.gitmelgutierrez.com/opengraph.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
