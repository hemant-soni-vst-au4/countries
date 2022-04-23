import {Redirect, Route} from 'react-router-dom'
import {IonApp, IonRouterOutlet, useIonAlert, isPlatform} from '@ionic/react'
import {IonReactRouter} from '@ionic/react-router'
import Home from './pages/Home'
import './styles/global.scss'
import Cookies from 'js-cookie'
import {storageHelper} from './utils/storageHelper'
import {useEffect, useState} from 'react'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import Dashboard from './pages/Dashboard'
import LessonIntro from './pages/lessons/LessonIntro'
import {settingRoutes} from './pages/setting/Setting'
import OnBoarding from './pages/onBoarding/OnBoarding'
import AuthPage from './pages/onBoarding/Authentication'
import ForgotPassword from './pages/onBoarding/ForgotPassword'
import PostBoarding from './pages/onBoarding/PostBording'
import {ApolloProvider} from '@apollo/client'
import {client} from './apollo/apollo-client'
import {QueryClient, QueryClientProvider} from 'react-query'
import LessonsHome from './pages/lessons/LessonsHome'
import {useGetProfileQuery} from './schema/types-and-hooks'
import SearchList from './pages/library/SearchListPage'
import CourseListPage from './pages/lessons/CourseList'
import PopularLessonList from './pages/lessons/PopularLessonList'
import NewUploadsList from './pages/lessons/NewUploadsList'
import SavedLessonsList from './pages/lessons/SavedLessonsList'
import DraftLessonsList from './pages/lessons/DraftLessonsList'
import LessonDetailsPage from './pages/lessons/LessonDetails'
import CourseDetailsPage from './pages/lessons/CourseDetailsPage'
import LessonStepsPage from './pages/lessons/lessonSteps/LessonStepsPage'
import SubscriptionPlans from './pages/Subscription/Subscriptionplans'
import LessonComplete from './pages/lessons/LessonComplete'
import Subscription from './pages/Subscription/Subscription'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const queryClient = new QueryClient()

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

const App: React.FC = () => {
  const [present] = useIonAlert()
  const [local, setLocal] = useState('')
  let ios
  const [newVersionAvailable, setNewVersionAvailable] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState(null)
  const [dispatch, setDispatch] = useState(false)
  

  const updateServiceWorker = async () => {
    if (waitingWorker) {
      waitingWorker.postMessage({type: 'SKIP_WAITING'})

      waitingWorker.addEventListener('statechange', (e) => {
        if (e.target.state === 'activated') {
          window.location.reload()
        }
      })
    }
    setNewVersionAvailable(false)
  }
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      serviceWorkerRegistration.register({
        onSuccess: () => setDispatch(true),
        onUpdate: (registration) => {
          setWaitingWorker(registration.waiting)
          setNewVersionAvailable(true)
        },
        onWaiting: (registration) => {
          setWaitingWorker(registration.waiting)
          setNewVersionAvailable(true)
        },
      })
    }
  }, [])

  if (newVersionAvailable) {
    present({
      message: 'A new version is available. Want to load the new version?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('not installing new version')
          },
        },
        {
          text: 'Okay',
          handler: () => {
            updateServiceWorker()
          },
        },
      ],
    })
  }

  useEffect(() => {}, [newVersionAvailable, local])

  useEffect(() => {
    storageHelper.getNativeStorage('token').then((token) => {
      if (token?.data) {
        setLocal('/dashboard/lessons')
      } else {
        setLocal('/on-boarding')
      }
    })
  }, [])

  if (isPlatform('mobileweb') && !Cookies.get('did-suggest-app')) {
    present({
      header: 'Hey there,',
      message: 'For better experience, would you like to download the Speaky Peaky app?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            Cookies.set('did-suggest-app', 'yes', {expires: 7})
          },
        },
        {
          text: 'Download',
          handler: () => {
            Cookies.set('did-suggest-app', 'yes', {expires: 7})
            window.open('https://speakypeaky.page.link/home')
          },
        },
      ],
    })
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <IonApp
        
        >
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route path="/dashboard">
                <WithProfile>
                  <Dashboard />
                </WithProfile>
              </Route>
              <Route path="/lessons" exact>
                <LessonsHome />
              </Route>
              <Route path="/lessons/intro">
                <LessonIntro />
              </Route>
              <Route path="/lesson-details/:subLessonId">
                <WithProfile>
                  <LessonDetailsPage />
                </WithProfile>
              </Route>
              <Route path="/course-details/:lessonId">
                <WithProfile>
                  <CourseDetailsPage />
                </WithProfile>
              </Route>
              <Route path="/lesson-steps/:subLessonId/:isDraft" exact={false}>
                <WithProfile>
                  <LessonStepsPage />
                </WithProfile>
              </Route>
              <Route exact path="/on-boarding">
                <OnBoarding />
              </Route>
              <Route exact path="/post-boarding">
                <PostBoarding />
              </Route>

              <Route exact path="/login">
                <AuthPage />
              </Route>
              <Route exact path="/sign-up">
                <AuthPage />
              </Route>
              <Route exact path="/forgot-pw">
                <ForgotPassword />
              </Route>

              <Route exact path="/my-courses">
                <CourseListPage />
              </Route>
              <Route exact path="/popular">
                <PopularLessonList />
              </Route>
              <Route exact path="/new-uploads">
                <WithProfile>
                  <NewUploadsList />
                </WithProfile>
              </Route>
              <Route exact path="/subscription">
                <WithProfile>
                  <Subscription />
                </WithProfile>
              </Route>
              <Route exact path="/saved-lessons">
                <SavedLessonsList />
              </Route>
              <Route exact path="/draft-lessons">
                <DraftLessonsList />
              </Route>
              <Route exact path="/library/:topicId">
                <SearchList />
              </Route>

              <Route exact path="/subscriptionplans">
                <SubscriptionPlans />
              </Route>
              <Route exact path="/lesson-complete">
                <LessonComplete />
              </Route>

              {settingRoutes.map((route) => (
                <Route key={route.path} {...route} />
              ))}

              <Route exact path="/">
                <Redirect to={local} />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </ApolloProvider>
    </QueryClientProvider>
  )
}

export default App
