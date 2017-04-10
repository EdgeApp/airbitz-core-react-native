# Airbitz React Native IO depdendencies

This library creates an `io` object with all the depenencies needed to run [`airbitz-core-js`](https://github.com/Airbitz/airbitz-core-js) on React Native.

Use it like this:

```js
import { makeContext } from 'airbitz-core-js'
import { makeReactNativeIo } from 'react-native-airbitz-io'

const contextPromise = makeReactNativeIo().then(io => {
  return makeContext({
    apiKey: '...',
    appId: '...',
    io
  })
})
```

Note that `makeReactNativeIo` calls out to native code, so it returns a `Promise` object.

## Installing

After adding this library using `yarn intall`, use `react-native link` to automatically re-configure the native project files.
