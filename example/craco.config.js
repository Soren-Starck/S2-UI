const path = require('path');

module.exports = {
  webpack: {
    alias: {
      's2-ui': path.resolve(__dirname, '../src')
    }
  },
  style: {
    postcss: {
      mode: 'file',
    },
  },
}; 