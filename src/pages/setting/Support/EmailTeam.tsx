import {
  IonButton,
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonTextarea,
  IonToolbar,
  IonInput,
  useIonToast,
  useIonLoading,
  useIonRouter,
  IonTitle,
} from '@ionic/react'
import './EmailTeam.scss'
import {useState, useEffect} from 'react'
import {userProfile, fetchApi} from '../../../fetchApis'
import {useGetProfileQuery} from '../../../schema/types-and-hooks'

const EmailTeam: React.FC = () => {
  const {data} = useGetProfileQuery()
  const [present] = useIonToast()
  const router = useIonRouter()
  const [pres, dismi] = useIonLoading()
  const [description, setDescription] = useState('')
  const [subject, setSubject] = useState('')

  useEffect(() => {
    userProfile()
  }, [])

  const emailAdmin = async () => {
    pres({
      message: 'Loading...',
    })
    const res = await fetchApi('/contactus/user/set-contact-us', {
      method: 'POST',
      body: JSON.stringify({
        email: data?.profile.email,
        message: description,
      }),
    })

    if (res.error) {
      dismi()
      present(`${res.error}`, 3000)

      // console.log('res.error', res.error)
    } else {
      dismi()
      present(`${res.message}`, 3000)
      router.push('/setting', 'back')
    }
  }

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonButton mode="md" routerLink="/support">
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
              <b>Email Us</b>
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
      <IonContent className="ion-padding email-team">
        <IonGrid className="ion-no-padding">
          {/* <IonRow className="ion-align-items-center ion-justify-content-center">
      <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeLg="4" sizeXl="6" className="ion-align-self-center">
        <h1 className="ion-no-margin"><strong>Email Us</strong></h1>
      </IonCol>
    </IonRow> */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeXl="4"
              sizeLg="6"
              className="ion-align-self-center"
            >
              <p>
                Hi there! We will personally reply to you as soon as possible. If you want
                to find a solution to an issue immediately, check our
                <span className="c-orange" style={{color: 'orange'}}>
                  {' '}
                  FAQ
                </span>
                , you may find most answers you need with just a few clicks.
              </p>
            </IonCol>
          </IonRow>
          <form>
            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol
                sizeXs="12"
                sizeSm="12"
                sizeMd="7"
                sizeXl="4"
                sizeLg="6"
                className="ion-align-self-center"
              >
                <IonItem>
                  <IonInput
                    value={subject}
                    onIonChange={(e) => setSubject(e.detail.value!)}
                    placeholder="Subject*"
                    name="subject"
                  ></IonInput>
                </IonItem>

                <IonItem className="ion-margin-top">
                  <IonTextarea
                    value={description}
                    onIonChange={(e) => setDescription(e.detail.value!)}
                    rows={6}
                    placeholder="Description*"
                    name="message"
                  ></IonTextarea>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
              <IonCol
                sizeXs="12"
                sizeSm="12"
                sizeMd="7"
                sizeXl="4"
                sizeLg="6"
                className="ion-align-self-center"
              >
                <IonButton
                  mode="ios"
                  color="danger"
                  fill="outline"
                  shape="round"
                  expand="block"
                  onClick={() => emailAdmin()}
                >
                  Submit
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default EmailTeam
