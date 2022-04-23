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
  IonInput,
  useIonLoading,
  IonLoading,
  useIonToast,
} from '@ionic/react'
import './Edit.scss'
import React, {useEffect, useState} from 'react'
import {userProfile, fetchApi} from '../../../../fetchApis'
import {useGetProfileQuery} from '../../../../schema/types-and-hooks'

const UpdateEmail: React.FC = () => {
  const router = useIonRouter()
  const [pres, dismi] = useIonLoading()
  const [inputs, setInputs] = useState('')
  const [present] = useIonToast()
  const [showLoading, setShowLoading] = useState(false)
  const {data} = useGetProfileQuery()

  useEffect(() => {
    userProfile()
  }, [])

  const updateEmail = async () => {
    pres({
      message: 'Loading...',
    })

    const res = await fetchApi('/user/update-email', {
      method: 'POST',
      body: JSON.stringify({
        email: inputs.toLowerCase(),
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
              <b>Edit Email</b>
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
                  <strong>Edit Email</strong>
                </h1>
              </IonCol>
            </IonRow> */}
          <form>
            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
                <IonItem mode="ios" className="ion-no-padding auth-inputs">
                  <IonLabel position="floating">User Email</IonLabel>
                  <IonInput
                    value={inputs}
                    onIonChange={(e) => setInputs(e.detail.value!)}
                    type="text"
                    placeholder="Email"
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
                  onClick={() => updateEmail()}
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

export default UpdateEmail
