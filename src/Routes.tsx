import {Redirect, Route, BrowserRouter as Router} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'
import {client} from './apollo/apollo-client'
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import {useGetProfileQuery} from './schema/types-and-hooks'

import OnBoarding from './pages/onBoarding/OnBoarding'
import AuthenticationPage from './pages/onBoarding/Authentication'
import ForgotPassword from './pages/onBoarding/ForgotPassword'
import PostBoarding from './pages/onBoarding/PostBording'
import Dashboard from './pages/Dashboard'

const WithProfile: React.FC = ({children}) => {
    const {loading, data} = useGetProfileQuery()
    if (loading) {
      return null
    }
    if (!data?.profile) {
      return <Redirect to="/login" />
    }
  
    return <>{children}</>
  }

const queryClient = new QueryClient()

const Routes: React.FC = () => {
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <ApolloProvider client={client}>
    <Router>
      <Route exact path="/on-boarding">
        <OnBoarding />
      </Route>
      <Route exact path="/post-boarding">
        <PostBoarding />
      </Route>
      <Route exact path="/login">
        <AuthenticationPage />
      </Route>
      <Route exact path="/sign-up">
        <AuthenticationPage />
      </Route>
      <Route exact path="/forgot-pw">
        <ForgotPassword />
      </Route>
      {/* <Route path="/dashboard">
              <WithProfile>
                <Dashboard />
              </WithProfile>
            </Route> */}
      <Route exact path="/">
              <Redirect to="/on-boarding" />
            </Route>
      </Router>
      </ApolloProvider>
      </QueryClientProvider>
    </>
  )
}

export default Routes;
