// We are just a shim at this point:
const edgeLogin = require("edge-login")
module.exports = {
  ...edgeLogin,
  makeReactNativeContext: edgeLogin.makeEdgeContext
}
