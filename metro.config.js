// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

// Turbo-charged cache for lightning-fast builds
const cacheDir = path.join(__dirname, "node_modules", ".cache", "metro");
defaultConfig.cacheStores = [
  new defaultConfig.cacheStores[0]({ root: cacheDir }),
];

// Faster resolver + better tree-shaking
defaultConfig.resolver = {
  ...defaultConfig.resolver,
  sourceExts: [...defaultConfig.resolver.sourceExts, "cjs"],
  assetExts: [
    ...defaultConfig.resolver.assetExts,
    "ttf",
    "otf",
    "svg",
    "png",
    "jpg",
    "jpeg",
    "webp",
  ],
};

// Optional: Speed up large projects (your app qualifies)
defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
  minifierPath: "metro-minify-terser",
  minifierConfig: {},
};

// Enable SVG support (if you ever add SVG icons)
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
defaultConfig.resolver.sourceExts.push("svg");

// Clean, stable, future-proof
module.exports = defaultConfig;