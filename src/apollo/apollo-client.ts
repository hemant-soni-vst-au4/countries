import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
  from,
  makeVar,
  TypePolicies,
} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {onError} from '@apollo/client/link/error'
// import {Plugins} from '@capacitor/core'
import {Storage} from '@capacitor/storage'

import {localTypeDefs, typePolicies} from './typePolicies'
export {currentLessonIdVar, dictationsVar, recordsVar} from './typePolicies'

// const {Storage} = Plugins

async function getNativeStorage(key) {
  const ret = await Storage.get({key})
  let value = JSON.parse(ret.value)
  if (!value) {
    value = {data: null}
  }
  return value
}

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.map(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = createHttpLink({
  // uri: 'http://localhost:4044/',
  // uri: 'http://192.168.0.3:4044/',
  uri: process.env.REACT_APP_GRAPHQL_URL,

  //   uri: 'https://gql-dev.speakypeaky.com/',
})

const authLink = setContext(async (_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = await getNativeStorage('token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token?.data ? token.data : '',
    },
  }
})

const cache = new InMemoryCache({
  typePolicies: typePolicies,
})

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache,
  typeDefs: localTypeDefs,
  // queryDeduplication: false,
})
