import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react';
// eslint-disable-next-line import/no-unresolved
import { SpeedInsights } from '@vercel/speed-insights/next';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Urbanist } from 'next/font/google';
import './utils/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { GoogleAnalytics } from 'nextjs-google-analytics';
import { Hotjar } from 'nextjs-hotjar';

import { Layout } from '@src/components/templates/layout';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' });

const App = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();
  const [loadHotjar, setLoadHotjar] = useState(false);

  // Delay Hotjar loading until after initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadHotjar(true);
    }, 3000); // 3 second delay allows critical content to load first

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GoogleAnalytics gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} trackPageViews />
      {loadHotjar && <Hotjar id={'3590987'} sv={6} />}
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <ContentfulLivePreviewProvider
          enableInspectorMode={pageProps.previewActive}
          enableLiveUpdates={pageProps.previewActive}
          locale={locale || 'en-US'}
        >
          <>
            <main className={`${urbanist.variable} font-sans`}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </main>
            <div id="portal" className={`${urbanist.variable} font-sans`} />
          </>
        </ContentfulLivePreviewProvider>
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default appWithTranslation(App);
