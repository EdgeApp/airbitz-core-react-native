import cryptobundle from '../tmp/crypto.bundle.js'
import { loadStorage, LocalStorage } from './localStorage.js'
import { base64 } from 'rfc4648'
import crypto from 'react-native-fast-crypto'
import { Platform } from 'react-native'

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
  return Promise.all([getRandom(32), loadStorage()]).then(values => {
    const [entropy, items] = values
    let io = {
      console: {
        info (...args) {
          console.log(...args)
        },
        warn (...args) {
          console.log(...args)
        },
        error (...args) {
          console.log(...args)
        }
      },
      fetch: (...rest) => window.fetch(...rest),
      localStorage: new LocalStorage(items),
      random: makeRandomGenerator(entropy)
    }
    if (Platform.OS === 'ios') {
      io.scrypt = crypto.scrypt
    }
    return io
  })
}
