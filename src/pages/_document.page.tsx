import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="I ❤️ to build = design + develop" />
        <meta property="og:title" content="gitmel gutierrez" />
        <meta
          property="og:description"
          content="Product Designer & Builder — 0-to-1 data & AI products"
        />
        <meta property="og:url" content="https://www.gitmelgutierrez.com" />
        <meta property="og:image" content="https://www.gitmelgutierrez.com/opengraph.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="gitmel gutierrez" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="gitmel gutierrez" />
        <meta
          name="twitter:description"
          content="Product Designer & Builder — 0-to-1 data & AI products"
        />
        <meta name="twitter:image" content="https://www.gitmelgutierrez.com/opengraph.jpg" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
