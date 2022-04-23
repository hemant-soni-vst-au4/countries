import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  useIonRouter,
} from '@ionic/react'
import {cog} from 'ionicons/icons'
import {useState} from 'react'
import UserLevel from './UserLevel'
import {ProfileAvatar} from './ProfileAvatar'
import UserProgress from './UserProgress'
import './ProfileTab.scss'

const ProfileTab: React.FC = () => {
  const router = useIonRouter()
  const [segment, setSegment] = useState('progress')

  return (
    <IonPage>
      <IonContent fullscreen className="profile-page">
        <IonGrid className="ion-padding-top">
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol
              sizeXs="2"
              sizeSm="2"
              sizeLg="3"
              sizeXl="2"
              sizeMd="3"
              className="ion-align-self-end"
            >
              {' '}
            </IonCol>
            <IonCol
              sizeXs="8"
              sizeSm="8"
              sizeLg="5"
              sizeXl="4"
              sizeMd="5"
              className="ion-align-self-center"
            >
              <ProfileAvatar />
            </IonCol>
            <IonCol
              sizeXs="2"
              sizeSm="2"
              sizeLg="3"
              sizeXl="2"
              sizeMd="3"
              className="ion-align-self-start"
            >
              <IonButtons
                className="ion-float-right"
                // mode="ios"
              >
                <IonButton
                  // routerLink="/setting"
                  // routerDirection="forward"
                  // onClick={() => setShowModal(true)}
                  // mode="ios"
                  onClick={() => {
                    // navController.navigateForward('/setting')
                    router.push('/setting', 'forward')
                  }}
                >
                  <IonIcon color="dark" mode="ios" slot="icon-only" icon={cog} />
                </IonButton>
              </IonButtons>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeLg="9"
              sizeXl="7"
              sizeMd="9"
              className="ion-no-padding ion-align-self-center"
            >
              <IonSegment
                color="danger"
                mode="md"
                value={segment}
                onIonChange={(e) => {
                  setSegment(e.detail.value)
                  // sharedService.gaTrackEvent('TabChangedProfile', e.detail.value)
                }}
              >
                <IonSegmentButton mode="md" value="progress">
                  <IonLabel>My Progress</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton mode="md" value="level">
                  <IonLabel>My Level</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeLg="7"
              sizeXl="6"
              sizeMd="8"
              className="ion-no-padding ion-align-self-center"
            >
              {segment === 'progress' ? <UserProgress /> : <UserLevel />}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default ProfileTab
