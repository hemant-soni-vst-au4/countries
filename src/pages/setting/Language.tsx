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
  IonRadioGroup,
  IonCard,
  IonCardContent,
  IonRadio,
  useIonViewWillLeave,
  useIonToast,
  useIonLoading,
  IonTitle
} from '@ionic/react'
import React, {useEffect, useState} from 'react'

// Multilanguage page content object
// import {withTranslation} from 'react-i18next'
// import {useTranslation} from 'react-i18next'
// import i18n from '../../language/i18n'
import {useGetProfileQuery} from '../../schema/types-and-hooks'
import './Language.scss'
import {userProfile, fetchApi} from '../../fetchApis'

const Language: React.FC = () => {
  const {data} = useGetProfileQuery()
  let intialLanguage = data?.profile.nativeLanguage.languageName
  // const router = useIonRouter()
  const [pres, dismi] = useIonLoading()
  const [present] = useIonToast()

  const [selected, setSelected] = useState(intialLanguage)

  // const {t, i18n} = useTranslation()

  useEffect(() => {
    userProfile()
    // console.log('info', info)
  }, [])

  useEffect(() => {

    setSelected(intialLanguage)
  }, [intialLanguage, data?.profile.nativeLanguage.languageName])

  useIonViewWillLeave(() => {
    // console.log('leave', intialLanguage)
  })

  const changeLanguage = async () => {
    pres('Please wait ...')
    const lang = await fetchApi('/subTitleLanguages/list')

    const langId = lang.data.filter((number) => {
      return number.languageName === selected
    })

    const res = await fetchApi('/user/set-subtitleLanguage', {
      method: 'POST',
      body: JSON.stringify({
        subTitleLanguageId: langId[0]._id,
      }),
    })
    if (res.error) {
      dismi()
      present(`${res.error}`, 3000)
    } else {
      dismi()
      present(`${res.message}`, 3000)
    }
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
          <b>Language</b>
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

      <IonContent className="ion-padding myCSS">
        <IonGrid
          // style={{
          //   backgroundImage: "url('./assets/images/on-boarding-language-bg.png')",
          //   width: '100%',
          //   height: '100%',
          // }}
        >
          <IonRow className="ion-align-items-center">
            <IonCol size="12" className="ion-align-self-center">
              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="7"
                  sizeLg="6"
                  sizeXl="4"
                  className="ion-align-self-center"
                >
                  <h1 className="ion-no-margin">
                    <strong>Language for Subtitles</strong>
                  </h1>
                  <p className="ion-margin-bottom">
                    Choose your language for translation
                  </p>
                </IonCol>
              </IonRow>
              <IonRadioGroup
                class="my-custom-class"
                value={selected}
                onIonChange={(e) => setSelected(e.detail.value)}
              >
                <IonRow className="ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    sizeLg="6"
                    sizeXl="4"
                    className="ion-align-self-center"
                  >
                    <IonCard className="ion-no-margin" mode="ios">
                      <IonCardContent className="ion-no-margin ion-no-padding">
                        <IonItem lines="none">
                          <IonLabel>Portuguese</IonLabel>
                          <IonRadio
                            onClick={changeLanguage}
                            color="danger"
                            mode="md"
                            slot="start"
                            value="Portuguese"
                            name="Portuguese"
                          >
                            {' '}
                          </IonRadio>
                        </IonItem>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    sizeLg="6"
                    sizeXl="4"
                    className="ion-align-self-center"
                  >
                    <IonCard className="ion-no-margin" mode="ios">
                      <IonCardContent>
                        <IonItem lines="none">
                          <IonLabel>Spanish</IonLabel>
                          <IonRadio
                            onClick={changeLanguage}
                            color="danger"
                            mode="md"
                            slot="start"
                            value="Spanish"
                            name="Spanish"
                          >
                            {' '}
                          </IonRadio>
                        </IonItem>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    sizeLg="6"
                    sizeXl="4"
                    className="ion-align-self-center"
                  >
                    <IonCard className="ion-no-margin ion-no-padding" mode="ios">
                      <IonCardContent>
                        <IonItem lines="none">
                          <IonLabel>Vietnamese</IonLabel>
                          <IonRadio
                            onClick={changeLanguage}
                            color="danger"
                            mode="md"
                            slot="start"
                            value="Vietnamese"
                            name="Vietnamese"
                          >
                            {' '}
                          </IonRadio>
                        </IonItem>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>

                <IonRow className="ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    sizeLg="6"
                    sizeXl="4"
                    className="ion-align-self-center"
                  >
                    <IonCard className="ion-no-margin" mode="ios">
                      <IonCardContent>
                        <IonItem lines="none">
                          <IonLabel>Korean</IonLabel>
                          <IonRadio
                            onClick={changeLanguage}
                            color="danger"
                            mode="md"
                            slot="start"
                            value="Korean"
                            name="korean"
                          >
                            {' '}
                          </IonRadio>
                        </IonItem>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonRadioGroup>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Language
