const path = require('./paths')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.build,
        publicPath: '/',
        filename: 'p5.roboflowP5.js',
        globalObject: 'this',
        library: {
            name: 'poster',
            type: 'umd',
        }
    },
    target: 'web',
    // Customize the webpack build process
    plugins: [
        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: path.public,
                to: 'assets',
                globOptions: {
                  ignore: ['*.DS_Store'],
                },
                noErrorOnMissing: true,
              },
            ],
          })
    ],
    resolve: {
        fallback: {
            util: require.resolve("util/")
          },
        modules: [path.src, 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
          '@': path.src,
          assets: path.public,
        },
      },
}