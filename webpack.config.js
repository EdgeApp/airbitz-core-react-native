module.exports = {
  entry: './src/crypto.js',
  externals: ['buffer'],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  output: {
    filename: './tmp/crypto.bundle.js',
    libraryTarget: 'commonjs'
  }
}
