const path = require('path');

module.exports = {
  webpack: {
    alias: {
      's2-ui': path.resolve(__dirname, '../src')
    },
    configure: (webpackConfig) => {
      // Add the parent directory to watchOptions
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: /node_modules/,
        poll: 1000 // Check for changes every second
      };
      
      return webpackConfig;
    }
  },
  style: {
    postcss: {
      mode: 'file',
    },
  },
  devServer: {
    hot: true
  }
}; 