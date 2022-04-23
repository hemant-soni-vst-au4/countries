import {
  IonIcon,
  IonImg,
  IonLabel,
  IonRouterLink,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  isPlatform,
  useIonRouter,
  useIonViewWillEnter,
} from '@ionic/react'
import clsx from 'clsx'
import React from 'react'
import {Redirect, Route, useRouteMatch} from 'react-router'
import {useGetProfileQuery, useGetDashboardQuery} from '../schema/types-and-hooks'
import LibraryTab from './library/LibraryTab'
import ProfileTab from './profile/ProfileTab'
import ReviewTab from './review/ReviewTab'
import './Dashboard.scss'
import LessonsTab from './lessons/LessonTab';
import ChannelService from '../components/channel.js'

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

function TabIcon({active, image}) {
  return (
    <IonIcon
    src={`/assets/images/bottom-tab/${image}${active ? '-active' : ''}.svg`} />
  )
}

const Loading: React.FC = () => {
  return <Redirect to="/dashboard/lessons" />
}

const Dashboard: React.FC = () => {
  const {
    data: {profile}, loading, refetch
  } = useGetProfileQuery({fetchPolicy: 'cache-and-network'});
  const today = weekdays[new Date().getDay()]
  const dashboardRes = useGetDashboardQuery({
    variables: {
      day: today === 'Saturday' || today === 'Sunday' ? 'Weekend' : today,
      videoLevel: profile.userLevelName,
    },
    fetchPolicy: 'cache-and-network',
  })
  const {data, error} = dashboardRes
  const router = useIonRouter()
  const isMobile = isPlatform('mobile')
  const match = useRouteMatch<{tab: string}>({path: `/dashboard/:tab`, exact: true})
  
  const tab = match?.params.tab
  const isDesktop = isPlatform('desktop')
  
  
 
  React.useEffect(() => {
    ChannelService.boot({
      "pluginKey": "8fbfb1cc-1a70-4f31-bf0c-05573008f269", //please fill with your plugin key
      "channelButtonOption": {
        "xMargin": 16,
        "yMargin": 16,
        "position": 'right',  // 'left', 'right'
      },
      "memberId": `${profile?._id}`, //fill with user id
      "profile": {
        "name": `${profile?.fullName}`, //fill with user name
        "mobileNumber": "YOUR_USER_MOBILE_NUMBER",
        "email": `${profile?.email}`, 
      }
    })
  }, [])

  React.useEffect(() => {
    // console.log('useEffect')
  }, [today])

  useIonViewWillEnter(() => {
    refetch()
    // console.log("profile56", profile)
  },[profile])
  

  React.useEffect(() => {
    // console.log("data loaded")
  }, [profile])

 
 
  
  return (
    <>
      {!isMobile && (
        <div className="logo-desktop">
          <IonRouterLink routerLink="/dashboard/lessons">
            <IonImg src="/assets/images/speaky-peaky_logo.png" />
          </IonRouterLink>
        </div>
      )}
      <IonTabs className={isMobile ? 'mobile-tab' : 'desktop-tab'}>
        <IonTabBar slot={isMobile ? 'bottom' : 'top'} >
          <IonTabButton tab="lessons" href="/dashboard/lessons">
            <TabIcon active={tab === 'lessons'} image="lessons" />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="library" href="/dashboard/library">
            <TabIcon active={tab === 'library'} image="search" />
            <IonLabel>Explore</IonLabel>
          </IonTabButton>

          <IonTabButton tab="review" href="/dashboard/review">
            <TabIcon active={tab === 'review'} image="review" />
            <IonLabel>Review</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" href="/dashboard/profile">
            <TabIcon active={tab === 'profile'} image="profile" />
            <IonLabel id="user-name">{profile.fullName || 'Profile'}</IonLabel>
          </IonTabButton>
        </IonTabBar>
        <IonRouterOutlet>
          <Route path="/dashboard/:tab(lessons)" component={LessonsTab} exact={true} />
          <Route path="/dashboard/:tab(library)" component={LibraryTab} />
          <Route path="/dashboard/:tab(review)" component={ReviewTab} />
          <Route path="/dashboard/:tab(profile)" component={ProfileTab} />
          <Route path="/dashboard/" component={Loading} exact={true} />
        </IonRouterOutlet>
      </IonTabs>
    </>
  )
}

export default Dashboard;
