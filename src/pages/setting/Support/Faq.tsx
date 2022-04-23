import {
  IonButton,
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonSearchbar,
  IonItem,
  IonList,
  IonText,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  useIonRouter,
  IonTitle
} from '@ionic/react'
// import {useGetProfileQuery} from '../../../schema/types-and-hooks'
import {GlobalService} from '../../../global/global.service'
import {userProfile} from '../../../fetchApis'
// import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'

import {useRouteMatch} from 'react-router-dom'

import './Faq.scss'
import {useState, useEffect} from 'react'

const Faq: React.FC = () => {
  const router = useIonRouter()


  useEffect(() => {
    userProfile()
  }, [])

  const emailTeam = () => {
    router.push('/email-the-team')
  }

  const match = useRouteMatch<{type: string}>({path: `/faqs/:type`, exact: true})
  // console.log('march', match)
  const tab = match?.params.type
  // console.log('tab', tab)

  let quesData
  if (tab === 'Subscriptions_and_Billing') {
    quesData = GlobalService.subscriptionsAndBillingFaqs
  } else if (tab === 'App_Features') {
    quesData = GlobalService.appFeaturesFaqs
  } else if (tab === 'Study_Methods') {
    quesData = GlobalService.studyMethods
  } else if (tab === 'Suggestions') {
    quesData = GlobalService.suggestions
  }
  const [open, setOpen] = useState(quesData)
  // console.log('open', open)

  const showAnswer = (result) => {
    setOpen(
      [...open].map((object) => {
        if (object.question === result.question) {
          if(object.expanded) {
            return {
              ...object,
              expanded: false,
            }

          } else {
          return {
            ...object,
            expanded: true,
          }
        }
        } else return object
      }),
    )
  }

  useEffect(() => {
    // console.log('result', quesData)
  }, [quesData]);

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
          <b>FAQ</b>
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

      <IonContent className="ion-padding Faq">
        <IonGrid className="ion-no-padding">
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="6"
              sizeSm="6"
              sizeMd="3"
              sizeLg="2"
              sizeXl="2"
              className="ion-align-self-center"
            >
              <h1 className="ion-no-margin">
                {/* <strong>FAQ</strong> */}
              </h1>
            </IonCol>
            <IonCol
              sizeXs="6"
              sizeSm="6"
              sizeMd="3"
              sizeLg="2"
              sizeXl="2"
              className="ion-align-self-center"
            >
              <IonText
                onClick={emailTeam}
                style={{color: 'orange', cursor: 'pointer'}}
                className="email ion-float-right"
              >
                Email the team
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeXl="4"
              sizeLg="6"
              className="ion-align-self-center"
            >
              <IonSearchbar
                mode="md"
                id="searchFaq"
                showCancelButton="focus"
                animated
                placeholder="Search in FAQs"
              ></IonSearchbar>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeXl="4"
              sizeLg="6"
              className="ion-no-padding ion-align-self-center"
            >
              <IonList>
                {open.map((result) => (
                  <IonItem
                   style={{cursor: 'pointer'}}
                    key={result.question}
                    onClick={() => {
                      // console.log('showAnswer', showAnswer(result))

                      return showAnswer(result)
                    }}
                  >
                    <div>
                      <IonRow className="ion-align-items-center ion-justify-content-center">
                        <IonCol
                          className="ion-no-padding"
                          sizeXs="12"
                sizeSm="12"
                sizeMd="12"
                sizeXl="12"
                sizeLg="12"
                        >
                          <p>Q. {result.question}</p>
                        </IonCol>
                        {/* <IonCol className="ion-no-padding ion-float-right" 
                        sizeXs="1"
                        sizeSm="1"
                        sizeMd="1"
                        sizeXl="1"
                        sizeLg="1">
                          {result.expanded ? <IoIosArrowDown /> : <IoIosArrowUp />}
                        </IonCol> */}
                      </IonRow>
                      {result.expanded ? (
                        <div
                          id="expandWrapper"
                          style={{color: 'orange', display: 'block'}}
                          className="expand-wrapper"
                        >
                          {result.answer}
                        </div>
                      ) : (
                        <div
                          id="expandWrapper"
                          style={{color: 'orange', display: 'none'}}
                          className="expand-wrapper"
                        >
                          {result.answer}
                        </div>
                      )}
                    </div>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Faq;
