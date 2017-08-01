# Airbitz Core for React Native

This library provides the dependencies needed to run [`airbitz-core-js`](https://github.com/Airbitz/airbitz-core-js) on React Native.

Use it like this:

```js
import { makeReactNativeContext } from 'react-native-airbitz-io'

const opts = {
  apiKey: '...',
  appId: '...'
}
makeReactNativeContext(opts).then(context => {
  // Use the context here...
})
```

## Installing

Use `npm intall --save git+ssh://git@github.com/airbitz/airbitz-core-react-native.git` to add this library to your project, and then do the following to to automatically re-configure the native project files:

    react-native link react-native-fast-crypto
    react-native link react-native-fs
    react-native link react-native-randombytes
