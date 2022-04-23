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
  IonInput,
  useIonToast,
} from '@ionic/react'
import './Edit.scss'
import { fetchApi} from '../../../../fetchApis'

import React, {useState} from 'react'
import {useGetProfileQuery} from '../../../../schema/types-and-hooks'

const EditName: React.FC = () => {
  const router = useIonRouter();
  const [present] = useIonToast();

  const [pres, dismi] = useIonLoading();

  const [inputs, setInputs] = useState('')
  // const [showLoading, setShowLoading] = useState(false);
  const {data} = useGetProfileQuery()

  const updateName = async () => {
    pres({
      message: 'Loading...',
    })
    const res = await fetchApi('/user/update-name', {
      method: 'POST',
      body: JSON.stringify({
        fullName: inputs,
        _id: data?.profile._id,
      }),
    })

    if (res.error) {
      dismi()
      present(`${res.error}`, 3000)

      // console.log('res.error', res.error)
    } else {
      dismi()
      present(`${res.message}`, 3000)
      router.push('/setting/account','back')
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
          <b>Edit Name</b>
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
      
        <IonGrid>
          {/* <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
              <h1 className="ion-no-margin">
                <strong>Edit Name</strong>
              </h1>
            </IonCol>
          </IonRow> */}
          
          <form>
            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
                <IonItem mode="ios" className="ion-no-padding auth-inputs">
                  <IonLabel position="floating">User name</IonLabel>
                  <IonInput
                    name="Name"
                    type="text"
                    value={inputs}
                    onIonChange={(e) => setInputs(e.detail.value!)}
                    placeholder="fullName"
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
                  onClick={() => updateName()}
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

export default EditName
