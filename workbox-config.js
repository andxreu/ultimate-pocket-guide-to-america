// workbox-config.js
module.exports = {
  globDirectory: "dist/",
  globPatterns: [
    "**/*.{js,css,html,json,woff2,woff,ttf}",
    "assets/images/**/*.{png,jpg,jpeg,webp,svg}",
    "icon-*.png",
    "favicon.ico",
    "manifest.json",
  ],
  swDest: "dist/sw.js",
  sourcemap: false,

  // Instant activation
  skipWaiting: true,
  clientsClaim: true,

  // Navigation fallback for SPA
  navigateFallback: "/index.html",
  navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],

  // Runtime caching strategies
  runtimeCaching: [
    // HTML — always try network first
    {
      urlPattern: ({ request }) => request.mode === "navigate",
      handler: "NetworkFirst",
      options: {
        cacheName: "html",
        networkTimeoutSeconds: 8,
        backgroundSync: {
          name: "html-queue",
          options: { maxRetentionTime: 24 * 60 },
        },
      },
    },

    // JS/CSS — cache first, then network
    {
      urlPattern: /\.(?:js|css)$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },

    // Images — cache first, long-lived
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|webp|ico)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 300,
          maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
        },
      },
    },

    // Fonts — cache forever
    {
      urlPattern: /\.(?:woff2|woff|ttf)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "fonts",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 365 * 24 * 60 * 60,
        },
      },
    },

    // API & external assets — network first
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "external",
        networkTimeoutSeconds: 10,
      },
    },
  ],

  // Optional: Clean up old caches on activation
  cleanupOutdatedCaches: true,
};