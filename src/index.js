import { loadStorage, LocalStorage } from './localStorage.js'

/**
 * Gathers the IO resources needed by the Airbitz core library.
 */
export function makeReactNativeIo () {
  return loadStorage().then(items => {
    return {
      console,
      fetch: (...rest) => window.fetch(...rest),
      localStorage: new LocalStorage(items),
      random: null
    }
  })
}
