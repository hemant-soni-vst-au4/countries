import * as React from 'react'
import {CachePolicies, Provider} from 'use-http'
import {Plugins} from '@capacitor/core'
const {Storage} = Plugins

async function getNativeStorage(key) {
  const ret = await Storage.get({key})
  let value = JSON.parse(ret.value)
  if (!value) {
    value = {data: null}
  }
  return value
}

const ApiProvider: React.FC = ({children}) => {
  const options = {
    cachePolicy: CachePolicies.NO_CACHE,
    interceptors: {
      request: async ({options, url, path, route}) => {
        // console.log({url, path, options})
        const token = await getNativeStorage('token')
        if (token?.data) {
          options.headers.accesstoken = token.data
        }
        // console.log({token1})
        // const token = JSON.parse(localStorage.getItem('_cap_token')).data

        return options
      },
    },
  }
  return (
    <Provider url={process.env.REACT_APP_API_URL} options={options}>
      {children}
    </Provider>
  )
}
export default ApiProvider
