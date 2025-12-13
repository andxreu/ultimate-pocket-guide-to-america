/**
 * Metro Configuration for React Native
 * 
 * Metro is the JavaScript bundler for React Native. This configuration
 * optimizes bundling performance and caching for the Expo application.
 * 
 * Key features:
 * - File-based caching for faster rebuilds
 * - Turborepo-compatible cache structure
 * - Expo default configuration extended
 * 
 * @see https://facebook.github.io/metro/docs/configuration
 * @see https://docs.expo.dev/guides/customizing-metro/
 */

const { getDefaultConfig } = require('expo/metro-config');
const { FileStore } = require('metro-cache');
const path = require('path');

/**
 * Get the default Expo Metro configuration
 * __dirname provides the current directory path
 */
const config = getDefaultConfig(__dirname);

/**
 * Configure cache stores for improved build performance
 * 
 * Uses FileStore to cache bundled files in node_modules/.cache/metro
 * This enables:
 * - Faster subsequent builds
 * - Turborepo cache restoration
 * - Reduced CI/CD build times
 * 
 * The cache is stored in node_modules to ensure it's:
 * - Ignored by git (via .gitignore)
 * - Cleaned when running npm clean-install
 * - Shared across different environments when using monorepos
 */
config.cacheStores = [
  new FileStore({ 
    root: path.join(__dirname, 'node_modules', '.cache', 'metro') 
  }),
];

/**
 * Export the Metro configuration
 * This config is used by:
 * - expo start
 * - expo export
 * - EAS Build
 */
module.exports = config;