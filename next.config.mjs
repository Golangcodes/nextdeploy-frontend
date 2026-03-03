/** @type {import('next').NextConfig} */
const nextConfig = {

  // ─────────────────────────────────────────────
  // OUTPUT & BUILD
  // ─────────────────────────────────────────────

  output: 'standalone',           // 'standalone' | 'export' | undefined
  distDir: '.next',               // custom build output directory
  cleanDistDir: true,             // clean dist dir before each build
  generateBuildId: async () => {  // custom build ID
    return 'my-build-id'
  },
  generateEtags: true,            // generate etags for pages
  compress: true,                 // enable gzip compression
  poweredByHeader: false,         // remove X-Powered-By header
  reactStrictMode: true,          // enable React strict mode
  trailingSlash: false,           // add trailing slash to URLs
  productionBrowserSourceMaps: false, // generate source maps in production
  crossOrigin: 'anonymous',       // 'anonymous' | 'use-credentials'

  // ─────────────────────────────────────────────
  // ENVIRONMENT VARIABLES
  // ─────────────────────────────────────────────

  env: {
    CUSTOM_VAR: 'hello',
    API_URL: 'https://api.example.com',
  },

  // ─────────────────────────────────────────────
  // IMAGES
  // ─────────────────────────────────────────────

  images: {
    // modern remotePatterns (preferred)
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'fonts.gstatic.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 's3.amazonaws.com' },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube-nocookie.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '*.googletagmanager.com',
      },
      {
        protocol: 'https',
        hostname: 'js.stripe.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],

    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    path: '/_next/image',
    loader: 'default',
  },

  // ─────────────────────────────────────────────
  // ROUTING
  // ─────────────────────────────────────────────

  basePath: '',           // base path for the app e.g. '/docs'
  assetPrefix: '',        // CDN prefix e.g. 'https://cdn.example.com'

  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/old-about',
        destination: '/about',
        permanent: false,
      },
    ]
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/some-page',
          destination: '/somewhere-else',
          has: [{ type: 'query', key: 'overrideMe' }],
        },
      ],
      afterFiles: [
        {
          source: '/non-existent',
          destination: '/somewhere-else',
        },
      ],
      fallback: [
        {
          source: '/:path*',
          destination: 'https://my-old-site.example.com/:path*',
        },
      ],
    }
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://example.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Custom-Header', value: 'my-value' },
        ],
      },
    ]
  },

  // ─────────────────────────────────────────────
  // TYPESCRIPT
  // ─────────────────────────────────────────────

  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },

  // ─────────────────────────────────────────────
  // PAGES & EXTENSIONS
  // ─────────────────────────────────────────────

  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],

  // ─────────────────────────────────────────────
  // MOVED TO TOP LEVEL IN NEXT 15/16
  // ─────────────────────────────────────────────

  reactCompiler: false,
  typedRoutes: false,
  cacheComponents: false,
  skipMiddlewareUrlNormalize: false,
  skipTrailingSlashRedirect: false,

  serverActions: {
    bodySizeLimit: '2mb',
    allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
  },

  staleTimes: {
    dynamic: 30,
    static: 180,
  },

  optimizePackageImports: [
    '@chakra-ui/react',
    '@mui/material',
    'lodash',
    'date-fns',
  ],

  // ─────────────────────────────────────────────
  // PERFORMANCE & BUNDLING
  // ─────────────────────────────────────────────

  transpilePackages: [
    'some-esm-package',
    '@mycompany/ui',
  ],

  // ─────────────────────────────────────────────
  // LOGGING
  // ─────────────────────────────────────────────

  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },

  // ─────────────────────────────────────────────
  // SASS
  // ─────────────────────────────────────────────

  sassOptions: {
    includePaths: ['./styles'],
    prependData: `$primary: #333;`,
  },

  // ─────────────────────────────────────────────
  // HTTP AGENT
  // ─────────────────────────────────────────────

  httpAgentOptions: {
    keepAlive: true,
  },

  // ─────────────────────────────────────────────
  // EXTERNAL PACKAGES (skip bundling)
  // ─────────────────────────────────────────────

  serverExternalPackages: [
    'sharp',
    '@prisma/client',
    'bcrypt',
  ],

  // ─────────────────────────────────────────────
  // DEV INDICATORS
  // ─────────────────────────────────────────────

  devIndicators: {
    position: 'bottom-right',
  },

  // ─────────────────────────────────────────────
  // WEBPACK CUSTOMIZATION
  // ─────────────────────────────────────────────

  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // add custom plugins
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.BUILD_ID': JSON.stringify(buildId),
      })
    )

    // add SVG support
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  // ─────────────────────────────────────────────
  // COMPILER OPTIONS
  // ─────────────────────────────────────────────

  compiler: {
    styledComponents: true,
  },

  // ─────────────────────────────────────────────
  // EXPERIMENTAL
  // ─────────────────────────────────────────────

  experimental: {
    optimizeCss: true,
    inlineCss: false,
    useLightningcss: false,
    cssChunking: false, // changed from 'loose' to false to satisfy type

    serverComponentsHmrCache: true,

    // Turbopack
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
      resolveAlias: {
        underscore: 'lodash',
      },
    },

    // Routing
    manualClientBasePath: false,

    // Performance
    optimisticClientCache: true,
    clientRouterFilter: true,
    clientRouterFilterRedirects: false,
    scrollRestoration: false,

    // Build
    forceSwcTransforms: false,
    swcTraceProfiling: false,
    mdxRs: false,

    // Proxy
    externalProxyRewritesResolve: false, // renamed from externalMiddlewareRewritesResolve

    // Auth
    authInterrupts: false,

    // Static generation
    staticGenerationRetryCount: 3,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25,

    // PPR (Partial Pre-rendering)
    ppr: false,

    // Taint
    taint: false,

    // View transitions
    viewTransition: false,

    // Misc
    gzipSize: true,
    fullySpecified: false,
    disableOptimizedLoading: false,
  },

}

export default nextConfig
