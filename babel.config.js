// babel.config.js
module.exports = function (api) {
  api.cache(true);

  // Only enable Natively.dev live editing in development AND when explicitly enabled
  const enableEditableMode =
    process.env.EXPO_PUBLIC_ENABLE_EDIT_MODE === "TRUE" &&
    process.env.NODE_ENV === "development";

  const editablePlugins = enableEditableMode
    ? [
        ["./babel-plugins/editable-elements.js", {}],
        ["./babel-plugins/inject-source-location.js", {}],
      ]
    : [];

  return {
    presets: ["babel-preset-expo"],

    plugins: [
      // Clean, elite module resolver
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
          ],
          alias: {
            "@": "./",
            "@components": "./components",
            "@contexts": "./contexts",
            "@data": "./data",
            "@hooks": "./hooks",
            "@utils": "./utils",
            "@styles": "./styles",
            "@assets": "./assets",
          },
        },
      ],

      // Natively.dev live editing — only in dev mode
      ...editablePlugins,

      // Modern JS features
      "@babel/plugin-proposal-export-namespace-from",

      // Required for Reanimated 3+ worklets (must be last!)
      "react-native-reanimated/plugin",
    ],
  };
};