const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Content-Security-Policy',
    value: `frame-ancestors 'self' https://app.contentful.com`,
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer',
  },
];

const cacheHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  },
];

const cdnCacheHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, s-maxage=300, stale-while-revalidate=600',
  },
];

module.exports = async () => {
  return [
    {
      // Apply security headers to all routes
      source: '/:path*',
      headers: securityHeaders,
    },
    {
      // Cache static assets aggressively
      source: '/favicons/:path*',
      headers: cacheHeaders,
    },
    {
      // Cache public assets
      source: '/assets/:path*',
      headers: cacheHeaders,
    },
    {
      // Cache pages with stale-while-revalidate
      source: '/((?!api|_next/static|_next/image|favicons|assets).*)',
      headers: cdnCacheHeaders,
    },
  ];
};
