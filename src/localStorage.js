import RNFS from 'react-native-fs'

export function loadStorage () {
  return RNFS.readFile(RNFS.DocumentDirectoryPath + '/localStorage.json')
    .then(text => JSON.parse(text))
    .catch(e => {
      return {}
    })
}

function saveStorage (items) {
  return RNFS.writeFile(
    RNFS.DocumentDirectoryPath + '/localStorage.json',
    JSON.stringify(items)
  )
}

/**
 * A localStorage API emulator.
 */
export class LocalStorage {
  constructor (items = {}) {
    this.items = items

    Object.defineProperty(this, 'length', {
      get: function () {
        return Object.keys(this.items).length
      }
    })
  }

  getItem (key) {
    return key in this.items ? this.items[key] : null
  }

  setItem (key, value) {
    this.items[key] = value
    return saveStorage(this.items)
  }

  removeItem (key) {
    delete this.items[key]
    return saveStorage(this.items)
  }

  key (n) {
    return Object.keys(this.items)[n]
  }

  clear () {
    this.items = {}
    return saveStorage(this.items)
  }
}
