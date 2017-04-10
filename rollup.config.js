import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
const packageJson = require('./package.json')

export default {
  entry: 'src/index.js',
  external: Object.keys(packageJson.dependencies),
  plugins: [
    buble(),
    commonjs({
      include: 'tmp/crypto.bundle.js'
    })
  ],
  targets: [
    {
      dest: packageJson.main,
      format: 'cjs',
      sourceMap: true
    }
  ]
}
