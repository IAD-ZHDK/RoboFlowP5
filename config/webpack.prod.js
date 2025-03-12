const path = require('./paths')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        path: path.build,
        publicPath: '/',
    },
    optimization: {
        minimize: true,
      },
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      },
})
