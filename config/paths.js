const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve(__dirname, '../dist'), 
  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),

  // template files
  templates: path.resolve(__dirname, '../demo/'),
 
  //templates: path.resolve(__dirname, '../2024_Exhibition/'),
}