import {
  IonButton,
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
  IonTitle
} from '@ionic/react'
import {Device} from '@capacitor/device'
import React, {useState} from 'react'

// import {useGetProfileQuery} from '../../schema/types-and-hooks'
import './AppInfo.scss'

const AppInfo: React.FC = () => {
  const [versioncode, setVersioncode] = useState('')
  const [versionnumber, setVersionnumber] = useState('')

  const logDeviceInfo = async () => {
    let device
    const info = await Device.getInfo()
    const isApp = ['ios', 'android'].includes(info.platform)
    const isMobileWeb =
      info.platform === 'web' && ['ios', 'android'].includes(info.operatingSystem)
    const isDesktop = info.platform === 'web' && !isMobileWeb
    device = {...info, isApp, isMobileWeb, isDesktop}

    if (!device.isApp) {
      setVersioncode('RA003')
      setVersionnumber('')
    } else {
      setVersioncode(device.appVersion)
      setVersionnumber(device.appBuild)
    }
  }


  useIonViewDidLeave(() => {
    // console.log('ionViewDidLeave event fired');
  })

  useIonViewWillLeave(() => {
    // console.log('ionViewWillLeave event fired');
  })

  useIonViewWillEnter(() => {
    logDeviceInfo()
  })
  
  return (
    <IonPage>
       <IonHeader mode="ios">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonButton mode="md" routerLink="/setting">
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
          <b>App Information</b>
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

      <IonContent className="ion-padding app-info">
        <IonGrid className="ion-no-padding">
          <IonRow
            className="ion-align-items-center ion-justify-content-center"
            style={{padding: '16px'}}
          >
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              class="ion-align-self-center"
            >
              <h1 className="ion-no-margin">
                <strong>App Information</strong>
              </h1>
            </IonCol>
          </IonRow>
          <IonRow
            className="ion-align-items-center ion-justify-content-center"
            style={{padding: '16px'}}
          >
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              className="ion-align-self-center"
            >
              <p>Build Version: {versioncode} </p>
              <p>Build Number: {versionnumber} </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default AppInfo
