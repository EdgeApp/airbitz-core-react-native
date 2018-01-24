import cryptobundle from '../tmp/crypto.bundle.js'
import { makeContext } from 'airbitz-core-js'
import { base64 } from 'rfc4648'
import crypto from 'react-native-fast-crypto'
import net from 'react-native-tcp'
import tls from 'react-native-tcp/tls'
import { makeReactNativeFolder } from 'disklet'

// We are just a wrapper around `airbitz-core-js`, so export that:
export * from 'airbitz-core-js'

let RNRandomBytes = require('react-native').NativeModules.RNRandomBytes
const { hashjs, HmacDRBG } = cryptobundle

/**
 * Wraps the native `randomBytes` function in a `Promise`.
 */
function getRandom (length) {
  return new Promise((resolve, reject) => {
    RNRandomBytes.randomBytes(length, function (err, base64String) {
      if (err) {
        reject(err)
      } else {
        resolve(base64.parse(base64String.trim()))
      }
    })
  })
}

/**
 * Creates a pseudo-random number generator based on the provided entropy.
 * This can be used to turn an async random number generator into
 * a synchronous one.
 */
export function makeRandomGenerator (entropy) {
  const rng = new HmacDRBG({
    hash: hashjs.sha256,
    entropy: entropy
  })

  return bytes => rng.generate(bytes)
}

/**
 * Gathers the IO resources needed by the Airbitz core library.
 */
export function makeReactNativeIo () {
  return Promise.all([getRandom(32)]).then(values => {
    const [entropy] = values
    let io = {
      console: {
        info: console.log,
        warn: console.warn,
        error: console.warn
      },
      net,
      fetch: (...rest) => window.fetch(...rest),
      folder: makeReactNativeFolder(),
      random: makeRandomGenerator(entropy),
      Socket: net.Socket,
      TLSSocket: tls.TLSSocket | tls.Socket // Some versions use the 2nd name
    }
    io.scrypt = crypto.scrypt
    io.secp256k1 = crypto.secp256k1
    io.pbkdf2 = crypto.pbkdf2
    return io
  })
}

/**
 * Creates an Airbitz context for use with React Native.
 */
export function makeReactNativeContext (opts) {
  return makeReactNativeIo().then(io => makeContext({ ...opts, io }))
}
