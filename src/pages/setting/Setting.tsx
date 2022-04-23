// import {useApolloClient} from '@apollo/client'
import {
  IonButton,
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  isPlatform,
  useIonRouter,
  IonTitle,
} from '@ionic/react'

import {Route, useRouteMatch} from 'react-router'
import {storageHelper} from '../../utils/storageHelper'
import Account from './Account/Account'

import EditName from './Account/Edit/EditName'
import UpdateEmail from './Account/Edit/UpdateEmail'
import UpdatePassword from './Account/Edit/UpdatePassword'
import ShareApp from './ShareApp'
import Reminder from './Reminder'
import Language from './Language'
import Support from './Support/Support'
import AppInfo from './AppInfo'
import RateApp from './RateApp'
import EmailTeam from './Support/EmailTeam'
import Faq from './Support/Faq'
import './Setting.scss'
import ChannelService from '../../components/channel.js'

export const SettingList: React.FC = () => {
  const router = useIonRouter()

  const match = useRouteMatch<{type: string}>({path: `/faqs/:type`, exact: true})
  // console.log("march", match)
  const tab = match?.params.type
  console.log("tab", tab)

  async function handleLogout() {
    storageHelper.removeNativeStorage('leftOfData')
    // storageHelper.gaTrackEvent('Logout', 'Settings Screen')
    // storageHelper.setNativeStorage('isOnBoarding', true)
    storageHelper.setNativeStorage('isAdmin', false)
    storageHelper.removeNativeStorage('token')
    // console.log("native storage", await storageHelper.getNativeStorage('token') )
    // authService.authSubject.next(false)
    // Error in user profile -> profile is not define ->> need to fix
    // client.clearStore()
    // queryClient.clear()
    ChannelService.shutdown()
    ChannelService.clearCallbacks()
    router.push('/sign-up', 'root')
  }

  function Terms() {
    window.open('https://www.newsite.speakypeaky.com/terms-and-conditions', '_blank')
  }

  function privacyPolicy() {
    window.open('https://www.newsite.speakypeaky.com/privacypolicy', '_blank')
  }
  function rateApp() {
    if (isPlatform('ios')) {
      window.open('https://apps.apple.com/us/app/speaky-peaky/id1486127431', '_blank')
    } else if (isPlatform('android')) {
      window.open(
        'https://play.google.com/store/apps/details?id=com.summer.startenglishnow',
        '_blank',
      )
    }
  }
  return (
    <IonPage id="setting-page">
      <IonHeader mode="ios">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonButton mode="md" routerLink="/dashboard/profile">
              <IonIcon
                color="dark"
                mode="md"
                slot="icon-only"
                name="chevron-back"
              ></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>
          <div style={{textAlign: 'center'}}>
          <b>Setting</b>
          </div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton mode="md" routerLink="/dashboard/lessons" routerDirection="root">
              <IonIcon
                color="dark"
                mode="md"
                slot="icon-only"
                src="./assets/images/home.svg"
              ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="setting">
        <IonGrid>
          {/* <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              className="ion-align-self-center"
            >
              <h1 className="ion-no-margin">
                <strong>Settings</strong>
              </h1>
            </IonCol>
          </IonRow> */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              className="ion-align-self-center"
            >
              <IonItem mode="md" routerLink="/setting/account" routerDirection="forward">
                <IonLabel>Account</IonLabel>
                <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
              </IonItem>
              {isPlatform('capacitor') || isPlatform('cordova') ? (
                <IonItem mode="md" routerLink="/reminder" routerDirection="forward">
                  <IonLabel>Reminder</IonLabel>
                  <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
                </IonItem>
              ) : (
                ''
              )}
              <IonItem mode="md" routerLink="/language" routerDirection="forward">
                <IonLabel>Language</IonLabel>
                <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
              </IonItem>
              <IonItem mode="md" routerLink="/support" routerDirection="forward">
                <IonLabel>Support</IonLabel>
                <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
              </IonItem>
              <IonItem mode="md" routerLink="/share-app" routerDirection="forward">
                <IonLabel>Share this app</IonLabel>
                <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
              </IonItem>
              <IonItem mode="md" routerLink="/app-info" routerDirection="forward">
                <IonLabel>App Information</IonLabel>
                <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
              </IonItem>
              {isPlatform('capacitor') || isPlatform('cordova') ? (
                <IonItem mode="md" onClick={rateApp} routerDirection="forward">
                  <IonLabel>Rate this app</IonLabel>
                  <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
                </IonItem>
              ) : (
                ''
              )}
              <IonItem mode="md" onClick={Terms} style={{cursor: 'pointer'}}>
                <IonLabel>Term of Use</IonLabel>
                <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
              </IonItem>
              <IonItem mode="md" onClick={privacyPolicy} style={{cursor: 'pointer'}}>
                <IonLabel>Privacy Policy</IonLabel>
                <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
              </IonItem>
              <IonItem mode="md" onClick={handleLogout} style={{cursor: 'pointer'}}>
                <IonLabel>Log Out</IonLabel>
                <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export const settingRoutes = [
  {path: '/setting', exact: true, component: SettingList},
  {path: '/setting/account', exact: true, component: Account},
  {path: '/setting/edit-name', exact: true, component: EditName},
  {path: '/setting/edit-email', exact: true, component: UpdateEmail},
  {path: '/setting/edit-password', exact: true, component: UpdatePassword},
  {path: '/share-app', exact: true, component: ShareApp},
  {path: '/reminder', exact: true, component: Reminder},
  {path: '/language', exact: true, component: Language},
  {path: '/support', exact: true, component: Support},
  {path: '/app-info', exact: true, component: AppInfo},
  {path: '/rate-app', exact: true, component: RateApp},
  {path: '/email-the-team', exact: true, component: EmailTeam},
  {path: '/faqs/:type', exact: true, component: Faq},
]
export const SettingRoutes: React.FC = () => {
  return (
    <>
      <Route path="/setting/account" exact component={Account} />
      <Route path="/setting" exact component={SettingList} />
      <Route path="/setting/edit-name" exact component={EditName} />
      <Route path="/setting/edit-email" exact component={UpdateEmail} />
      <Route path="/setting/edit-Password" exact component={UpdatePassword} />
      <Route path="/share-app" exact component={ShareApp} />
      <Route path="/reminder" exact component={Reminder} />
      <Route path="/language" exact component={Language} />
      <Route path="/support" exact component={Support} />
      <Route path="/app-info" exact component={AppInfo} />
      {/* <Route path="/rate-app" exact component={RateApp} /> */}
      <Route path="/email-the-team" exact component={EmailTeam} />
      <Route path="/faqs/:type" exact component={Faq} />
    </>
  )
}
