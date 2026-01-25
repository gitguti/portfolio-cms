import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Urbanist } from 'next/font/google';
import './utils/globals.css';
import { useRouter } from 'next/router';

import { GoogleAnalytics } from 'nextjs-google-analytics';
import { Hotjar } from 'nextjs-hotjar';

import { Layout } from '@src/components/templates/layout';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' });

const App = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Hotjar id={'3590987'} sv={6} />
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
      <Analytics />
    </>
  );
};

export default appWithTranslation(App);
