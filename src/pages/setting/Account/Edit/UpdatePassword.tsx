import {
  IonButton,
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  useIonRouter,
  useIonLoading,
  IonLoading,
  IonInput,
  useIonToast,
} from '@ionic/react'
import {useGetProfileQuery} from '../../../../schema/types-and-hooks'
import React, {useEffect, useState} from 'react'
import {userProfile, fetchApi} from '../../../../fetchApis'

const UpdatePassword: React.FC = () => {
  const router = useIonRouter()
  const [present] = useIonToast()
  const [pres, dismi] = useIonLoading()

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showLoading, setShowLoading] = useState(false)

  const {data} = useGetProfileQuery()

  useEffect(() => {
    userProfile()
  }, [])

  const updatePassword = async () => {
    pres({
      message: 'Loading...',
    })

    const res = await fetchApi('/user/update-password', {
      method: 'POST',
      body: JSON.stringify({
        password: password,
        newPassword: newPassword,
        _id: data?.profile._id,
      }),
    })

    if (res.error) {
      dismi()
      present(`${res.error}`, 3000)
    } else {
      dismi()
      present(`${res.message}`, 3000)
      router.push('/setting/account', 'back')
    }
  }
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonButton mode="md" routerLink="/setting/account">
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
              <b>Edit Password</b>
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

      <IonContent className="ion-padding">
        <IonLoading
          cssClass="custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
          duration={2000}
        />
        <IonGrid>
          {/* <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
              <h1 className="ion-no-margin">
                <strong>Edit Password</strong>
              </h1>
            </IonCol>
          </IonRow> */}
          <form>
            <IonRow class="ion-align-items-center ion-justify-content-center">
              <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
                <IonItem mode="ios" class="ion-no-padding auth-inputs">
                  <IonLabel position="floating">Current Password</IonLabel>
                  <IonInput
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    type="password"
                    placeholder="password"
                    required
                  >
                    {' '}
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow class="ion-align-items-center ion-justify-content-center">
              <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
                <IonItem mode="ios" class="ion-no-padding auth-inputs">
                  <IonLabel position="floating">New Password</IonLabel>
                  <IonInput
                    value={newPassword}
                    onIonChange={(e) => setNewPassword(e.detail.value!)}
                    type="password"
                    placeholder="newPassword"
                    required
                  >
                    {' '}
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
              <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
                <IonButton
                  mode="ios"
                  color="danger"
                  fill="outline"
                  shape="round"
                  expand="block"
                  onClick={() => updatePassword()}
                >
                  Save
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
              <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
                <IonButton
                  mode="ios"
                  color="medium"
                  fill="outline"
                  shape="round"
                  expand="block"
                  routerLink="/setting/account"
                >
                  Cancel
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default UpdatePassword
