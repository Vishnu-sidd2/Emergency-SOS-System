// craco.config.js
// Load configuration from environment or config file
const path = require('path');

// Environment variable overrides
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === 'true',
};

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      // --- DEBUGGING: Confirm Craco config is loaded ---
      console.log("Craco config loaded and applying Webpack customizations.");
      // --- END DEBUGGING ---

      // Find the existing source-map-loader rule and modify it, or add a new one if necessary.
      // This approach tries to be more explicit about handling source-map-loader.
      const sourceMapLoaderRule = {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          // Exclude the specific module causing the source map warning
          // Using a more general regex pattern for robustness
          /node_modules[\\\/]@mediapipe[\\\/]tasks-vision/,
          // Add other problematic modules here if they arise
        ],
      };

      // Check if source-map-loader is already in the rules.
      // If it is, we might need to modify it or ensure our rule comes first/last.
      // For simplicity, we'll push a new rule, assuming Webpack handles precedence,
      // or that the existing rule doesn't conflict too badly.
      // If the warning still persists, we might need to find and modify the existing rule.
      webpackConfig.module.rules.push(sourceMapLoaderRule);


      // Disable hot reload completely if environment variable is set
      if (config.disableHotReload) {
        // Remove hot reload related plugins
        webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
          return !(plugin.constructor.name === 'HotModuleReplacementPlugin');
        });

        // Disable watch mode
        webpackConfig.watch = false;
        webpackConfig.watchOptions = {
          ignored: /.*/, // Ignore all files
        };
      } else {
        // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
          ],
        };
      }

      return webpackConfig;
    },
  },
};