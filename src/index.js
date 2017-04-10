/**
 * Gathers the IO resources needed by the Airbitz core library.
 */
export function makeReactNativeIo () {
  return {
    console,
    fetch: (...rest) => window.fetch(...rest),
    localStorage: null,
    random: null
  }
}
