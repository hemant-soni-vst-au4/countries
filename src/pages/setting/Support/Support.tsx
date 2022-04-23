import {
  IonButton,
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonItem,
  IonText,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  useIonRouter,
  IonList,
  IonTitle
} from '@ionic/react'

// import {useGetProfileQuery} from '../../../schema/types-and-hooks'
import {GlobalService} from '../../../global/global.service'
import {useState} from 'react'
import './Support.scss'

const Support: React.FC = () => {
  const router = useIonRouter()
  // const {data} = useGetProfileQuery()
  const [isFocus, setIsFocus] = useState(false)
  const [searchText, setSearchText] = useState('')
  // console.log('searchText', searchText)

  const {
    faqCategories,
    subscriptionsAndBillingFaqs,
    appFeaturesFaqs,
    studyMethods,
    suggestions,
  } = GlobalService
  // console.log('faqCategories', faqCategories)
  const emailTeam = () => {
    router.push('/email-the-team')
  }

  const combined2 = [
    ...suggestions,
    ...subscriptionsAndBillingFaqs,
    ...appFeaturesFaqs,
    ...studyMethods,
  ]
  // console.log('combined', combined2)

  const [answer, setAnswer] = useState(combined2)

  const showAnswer = (result) => {
    setAnswer(
      [...answer].map((object) => {
        if (object.question === result.question) {
          if (object.expanded) {
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

  const filtered = answer.filter((string) => {
    return string.question.includes(`${searchText}`)
  })

  // console.log('filtered', filtered)
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
              <b>Support</b>
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

      <IonContent className="ion-padding support-content">
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
              <IonText onClick={emailTeam} className="email ion-float-right">
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
                type="text"
                showCancelButton="focus"
                value={searchText}
                onFocus={() => setIsFocus(true)}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                onIonCancel={() => setIsFocus(false)}
                animated
                placeholder="Search in FAQs"
              ></IonSearchbar>
            </IonCol>
          </IonRow>

          {isFocus ? (
            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol
                sizeXs="12"
                sizeSm="12"
                sizeMd="7"
                sizeXl="4"
                sizeLg="6"
                className="ion-no-padding ion-align-self-center"
              >
                {searchText === '' ? (
                  <IonList>
                    {answer.map((result) => (
                      <IonItem
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
                            {/* <IonCol
                            className="ion-no-padding ion-float-right"
                            sizeXs="1"
                            sizeSm="1"
                            sizeMd="1"
                            sizeXl="1"
                            sizeLg="1"
                          >
                            {result.expanded ? 
                            <IonIcon  name="chevron-down"></IonIcon>
                            : <IonIcon  name="chevron-up"></IonIcon>
                          }
                          </IonCol> */}
                          </IonRow>
                          {result.expanded ? (
                            <IonRow
                              id="expandWrapper"
                              style={{color: 'orange', display: 'block'}}
                              className="expand-wrapper"
                            >
                              {result.answer}
                            </IonRow>
                          ) : (
                            ''
                          )}
                        </div>
                      </IonItem>
                    ))}
                  </IonList>
                ) : (
                  <IonList>
                    {filtered.map((result) => (
                      <IonItem
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
                            {/* <IonCol
                            className="ion-no-padding ion-float-right"
                            sizeXs="1"
                            sizeSm="1"
                            sizeMd="1"
                            sizeXl="1"
                            sizeLg="1"
                          >
                            {result.expanded ? 
                            <IonIcon  name="chevron-down"></IonIcon>
                            : <IonIcon  name="chevron-up"></IonIcon>
                          }
                          </IonCol> */}
                          </IonRow>
                          {result.expanded ? (
                            <IonRow
                              id="expandWrapper"
                              style={{color: 'orange', display: 'block'}}
                              className="expand-wrapper"
                            >
                              {result.answer}
                            </IonRow>
                          ) : (
                            ''
                          )}
                        </div>
                      </IonItem>
                    ))}
                  </IonList>
                )}
              </IonCol>
            </IonRow>
          ) : (
            faqCategories.map((category) => (
              <IonRow key={category.title}>
                <IonCol size="12" className="ion-no-padding">
                  <IonRow className="ion-align-items-center ion-justify-content-center">
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="7"
                      sizeXl="4"
                      sizeLg="6"
                      className="ion-align-self-center"
                    >
                      <IonCard
                        routerLink={`/faqs/${category.type}`}
                        mode="ios"
                        className="card"
                        style={{cursor: 'pointer'}}
                      >
                        <IonCardContent mode="ios">
                          <IonText color="dark">{category.title}</IonText>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                </IonCol>
              </IonRow>
            ))
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Support;
