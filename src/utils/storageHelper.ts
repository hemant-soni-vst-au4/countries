import {Storage} from '@capacitor/storage'
//   import {useStore} from 'src/reactapp/useStore'

export const storageHelper = {
  async setNativeStorage(key, value) {
    // this.storageCache[key] = {data: value}
    return await Storage.set({
      key,
      value: JSON.stringify({
        data: value,
      }),
    })
  },

  async getNativeStorage(key) {
    // if (this.storageCache[key]) {
    //   return this.storageCache[key]
    // }
    const ret = await Storage.get({key})
    let value = JSON.parse(ret.value)
    if (!value) {
      value = {data: null}
    }
    // this.storageCache[key] = value
    return value
  },

  async removeNativeStorage(key) {
    // delete this.storageCache[key]
    return await Storage.remove({key})
  },

  
}
