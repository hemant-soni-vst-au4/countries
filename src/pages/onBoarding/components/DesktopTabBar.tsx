import {
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonImg,
  IonRouterLink,
  isPlatform,
} from '@ionic/react'
import React from 'react'
import {useLocation, matchPath} from 'react-router-dom'
// import {useProfile} from '../useStore'

export function LessonIcon({active}) {
  return (
    <IonIcon
      src={
        active
          ? '/assets/images/bottom-tab/lesson-active.svg'
          : '/assets/images/bottom-tab/lessons.svg'
      }
    />
  )
}
export function LibraryIcon({active}) {
  return (
    <IonIcon
      src={
        active
          ? '/assets/images/bottom-tab/search-active.svg'
          : '/assets/images/bottom-tab/search.svg'
      }
    />
  )
}
export function ReviewIcon({active}) {
  return (
    <IonIcon
      src={
        active
          ? '/assets/images/bottom-tab/review-active.svg'
          : '/assets/images/bottom-tab/review.svg'
      }
    />
  )
}
export function ProfileIcon({active}) {
  return (
    <IonIcon
      src={
        active
          ? '/assets/images/bottom-tab/profile-active.svg'
          : '/assets/images/bottom-tab/profile.svg'
      }
    />
  )
}

export function DesktopTabBar() {
  const location = useLocation()
  // const {profile} = useProfile()
  const profile = {fullName: 'dev'}

  if (isPlatform('mobile')) {
    return null
  }

  const curTab = matchPath(location.pathname, {
    path: `/dashboard/:tab`,
    exact: true,
  })?.params['tab']

  return (
    <div className="desktop-tabbar">
      <div className="speaky-peaky-logo">
        <IonRouterLink routerLink="/dashboard/lessons">
          <IonImg src="/assets/images/speaky-peaky_logo.png" />
        </IonRouterLink>
      </div>
      <IonTabBar mode="md">
        <IonTabButton tab="lessons" href="/dashboard/lessons">
          <LessonIcon active={curTab === 'lessons'} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="library" href="/dashboard/library">
          <LibraryIcon active={curTab === 'library'} />
          <IonLabel>Library</IonLabel>
        </IonTabButton>

        <IonTabButton tab="review" href="/dashboard/review">
          <ReviewIcon active={curTab === 'review'} />
          <IonLabel>Review</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile" href="/dashboard/profile">
          <ProfileIcon active={curTab === 'profile'} />
          <IonLabel>{profile?.fullName || 'Profile'}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </div>
  )
}
