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
  isPlatform,
  useIonToast,
  IonTitle,
} from '@ionic/react'
import {Share} from '@capacitor/share'
import {Clipboard} from '@ionic-native/clipboard'
// import {useGetProfileQuery} from '../../schema/types-and-hooks'
import './ShareApp.scss'

const ShareApp: React.FC = () => {
  const [present] = useIonToast()
  // const {data} = useGetProfileQuery()
  // console.log('account', data)
  let appURL = 'https://speakypeaky.page.link/home'

  const copy = (appURL) => {
    if (isPlatform('mobile') && !isPlatform('mobileweb')) {
      Clipboard.copy(appURL).then(() => {
        present('It’s copied!', 2000)
      })
    } else {
      navigator.clipboard.writeText(appURL).then(
        (res) => {
          present('It’s copied!', 2000)
        },

        (err) => {
          console.error('Async: Could not copy text: ', err)
        },
      )
    }
  }

  const shareApp = async () => {
    await Share.share({
      title: 'Speaky Peaky',
      text: 'Speaky Peaky',
      url: appURL,
      dialogTitle: 'Share with buddies',
    })
  }

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
          <b>Share The App</b>
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

      <IonContent>
        <IonGrid
          className="share-app ion-no-padding"
          style={{
            backgroundImage: "url('./assets/images/profile-bg-yellow copy.jpg')",
            width: '100%',
            height: '100%',
          }}
        >
          {/* <IonRow
            className="ion-align-items-center ion-justify-content-center"
            style={{padding: '16px 16px 0px 16px'}}
          >
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              className="ion-align-self-center"
            >
              <h1 className="ion-no-margin">
                <strong>Share This App</strong>
              </h1>
            </IonCol>
          </IonRow> */}
          <IonRow
            className="ion-align-items-center ion-justify-content-center"
            style={{padding: '0px 16px 16px 16px;'}}
          >
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              className="ion-align-self-center"
            >
              <p>
                Because you can help your friends and family improve their English skills
                and live their best lives speaking English fluently!
              </p>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              className="share ion-no-padding ion-align-self-center ion-align-items-center ion-justify-content-center"
            >
              <div className="share-img ion-align-items-center ion-justify-content-center">
                <img src="./assets/images/share1.svg" alt="share" />
              </div>
              {isPlatform('mobile') ? (
                <>
                  <IonButton
                    mode="ios"
                    color="danger"
                    shape="round"
                    expand="block"
                    type="button"
                    onClick={shareApp}
                  >
                    <strong>SHARE NOW</strong>
                  </IonButton>
                  <p className="ion-text-center">or copy link</p>
                </>
              ) : (
                ''
              )}
              <IonRow className="copy-link ion-margin ion-align-items-center ion-justify-content-center">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="7"
                  sizeLg="6"
                  sizeXl="4"
                  className="ion-no-padding ion-align-self-center"
                >
                  <IonRow>
                    <IonCol id="app-link" className="ion-no-padding link" size="10">
                      {appURL}
                    </IonCol>
                    <IonCol
                      className="ion-no-padding IonText-right c-red pointer"
                      size="2"
                      onClick={() => copy(appURL)}
                    >
                      <strong className="c-red pointer">COPY</strong>
                    </IonCol>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default ShareApp
