
function assert (val, msg) {
  if (!val) {
    throw new Error(msg || 'Assertion failed')
  }
}

export default assert
