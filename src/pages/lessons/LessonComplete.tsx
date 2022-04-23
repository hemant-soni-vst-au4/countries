import {
  IonBackButton,
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
  useIonRouter,
  useIonViewWillEnter,
  useIonViewDidEnter,
  IonText,
  IonImg,
} from '@ionic/react'
import { Media as media, MediaObject } from '@ionic-native/media'
import { isPlatform } from '@ionic/react'
import {fetchApi} from '../../fetchApis'
import {environment} from '../../enviornment'
import * as moment from 'moment'
import {Device} from '@capacitor/device'
import React, {useState, useEffect} from 'react'

import {useGetProfileQuery} from '../../schema/types-and-hooks'
import './LessonComplete.scss'

const LessonComplete: React.FC = () => {
  const router = useIonRouter()
  const {data , loading, error, refetch} = useGetProfileQuery()
  const [completedLesson, setCompletedLesson] = useState([])
  const [subscribeCompletedLesson, setSubscribeCompletedLesson] = useState([])

  const logDeviceInfo = async () => {
    let device
    const info = await Device.getInfo()
    const isApp = ['ios', 'android'].includes(info.platform)
    const isMobileWeb =
      info.platform === 'web' && ['ios', 'android'].includes(info.operatingSystem)
    const isDesktop = info.platform === 'web' && !isMobileWeb
    device = {...info, isApp, isMobileWeb, isDesktop}
    
  }

  
  let date = new Date()
  let months = new Array()
  moment.locale('en')
  months = moment.months()
  let currentMonth = months[new Date().getMonth()]
  let subStartDate = new Date(`${data?.profile.userSubscriptionStartDate}`).toDateString()
  let subEndDate = new Date(`${data?.profile.userSubscriptionEndDate}`).toDateString()

  

  const monthStartDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString()
  const monthEndDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString()


  const getCompletedLessonsByCurrentMonth = async (startDate, endDate) => {
    try {
      const res = await fetchApi('/lesson/completedLessons-within-timeRange', {
        method: 'POST',
        body: JSON.stringify({
          startDate: startDate,
          endDate: endDate,
        }),
      })

      if (res) {
        if (res.data.length) {
          setCompletedLesson(res.data)
          
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCompletedLessonsInSubscriptionSchedule = async (startDate, endDate) => {
    try {
      const res = await fetchApi('/lesson/completedLessons-within-timeRange', {
        method: 'POST',
        body: JSON.stringify({
          startDate: startDate,
          endDate: endDate,
        }),
      })

      if (res) {
        if (res.data.length) {
          setSubscribeCompletedLesson(res.data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCompletedLessonsInSubscriptionSchedule(
      data?.profile.userSubscriptionStartDate,
      data?.profile.userSubscriptionEndDate,
    )
  }, [data])
  useEffect(() => {
    // console.log('completedLesson')
  }, [completedLesson])
  useEffect(() => {
    // console.log('subscribeCompletedLesson')
  }, [subscribeCompletedLesson])

  useIonViewDidEnter(() => {
    if (isPlatform('ios')) {
      const file: MediaObject = media.create(
       environment.assetBaseUrl + 'audioFile/SMALL_CROWD_APPLAUSE.wav',
     )
     file.play()
   } else {
     const file: MediaObject = media.create(
       environment.assetBaseUrl + 'audioFile/SMALL_CROWD_APPLAUSE.mp3',
     )
     file.play()
   }
  })
  

  useIonViewWillEnter(() => {
    refetch()
    logDeviceInfo()
    if (monthStartDate && monthEndDate) {
      getCompletedLessonsByCurrentMonth(monthStartDate, monthEndDate)
    }
  })


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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

      <IonContent className="ion-padding ion-padding-top lesson-complete">
        <IonGrid className="h-100 ion-padding">
          <IonRow className="h-100 auth-form ion-align-items-center">
            <IonCol className="ion-align-self-center">
              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="6"
                  sizeLg="4"
                  sizeXl="4"
                  className="ion-align-self-center"
                >
                  <IonImg
                    className="lesson-progress"
                    src="../../../../../assets/images/lesson-completed-celebration.png"
                    alt="lesson-progress"
                  ></IonImg>
                </IonCol>
              </IonRow>
              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="7"
                  sizeLg="6"
                  sizeXl="4"
                  className="ion-align-self-center ion-text-center"
                >
                  <h1>
                    <strong>
                      Great job. <br />
                      You made it!
                    </strong>
                  </h1>
                </IonCol>
              </IonRow>
              <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top ion-margin-bottom">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="7"
                  sizeLg="6"
                  sizeXl="4"
                  className="ion-align-self-center ion-no-padding"
                >
                  <IonRow className="ion-align-items-center ion-justify-content-center">
                    <IonCol
                      size-xs="2"
                      size-sm="2"
                      size-md="1"
                      size-xl="1"
                      size-lg="1"
                      className="ion-align-self-center ion-no-padding"
                    >
                      <IonImg
                        src="../../../../../assets/images/checkmark-grey.png"
                        className="checkmark-grey"
                      ></IonImg>
                    </IonCol>
                    <IonCol
                      size-xs="10"
                      size-sm="10"
                      size-md="11"
                      size-xl="11"
                      size-lg="11"
                      className="ion-align-self-center ion-no-padding"
                    >
                      <h2>
                        <IonText color="danger">
                          <strong className="completed-lessons-count">
                            &nbsp; {completedLesson.length} &nbsp;
                          </strong>
                        </IonText>
                        {completedLesson.length <= 1 ? (
                          <small>lesson in {currentMonth}</small>
                        ) : (
                          <small>lessons in {currentMonth}</small>
                        )}
                      </h2>
                    </IonCol>
                  </IonRow>
                  <IonRow className="ion-align-items-center ion-justify-content-center">
                    <IonCol
                      size-xs="2"
                      size-sm="2"
                      size-md="1"
                      size-xl="1"
                      size-lg="1"
                      className="ion-align-self-center ion-no-padding"
                    >
                      <IonImg
                        src="../../../../../assets/images/checkmark-grey.png"
                        className="checkmark-grey"
                      ></IonImg>
                    </IonCol>
                    <IonCol
                      size-xs="10"
                      size-sm="10"
                      size-md="11"
                      size-xl="11"
                      size-lg="11"
                      className="ion-align-self-center ion-no-padding"
                    >
                      {data?.profile.currentPackage === 'Subscription' ? (
                        <h2>
                          <IonText color="danger">
                            <strong className="completed-lessons-count">
                              &nbsp; {subscribeCompletedLesson.length} &nbsp;
                            </strong>
                          </IonText>
                          {subscribeCompletedLesson.length <= 1 ? (
                            <small>
                              {' '}
                              lesson in subscription month ({subStartDate} -{subEndDate} )
                            </small>
                          ) : (
                            <small>
                              lessons in subscription month ({subStartDate} - {subEndDate}{' '}
                              )
                            </small>
                          )}
                        </h2>
                      ) : (
                        <h2>
                          <IonText color="danger">
                            <strong className="completed-lessons-count">
                              &nbsp; {data?.profile.completedLesson}
                            </strong>
                          </IonText>
                          {data?.profile.completedLesson <= 1 ? (
                            <small> &nbsp; lesson in Free Trial</small>
                          ) : (
                            <small> &nbsp; lessons in Free Trial</small>
                          )}
                        </h2>
                      )}
                    </IonCol>
                  </IonRow>
                </IonCol>
              </IonRow>
              <IonRow className="ion-padding-top ion-align-items-center ion-justify-content-center">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="7"
                  sizeLg="6"
                  sizeXl="4"
                  className="ion-align-self-center IonText-center"
                >
                  <IonButton
                  className="subs"
                    mode="ios"
                    // color="danger"
                    shape="round"
                    expand="block"
                    onClick={() => router.push('dashboard/library')}
                  >
                    More lessons
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="7"
                  sizeLg="6"
                  sizeXl="4"
                  className="ion-align-self-center IonText-center"
                >
                  <IonButton
                  style={{textTransform: "inherit"}}
                    // mode="ios"
                    color="danger"
                    fill="outline"
                    shape="round"
                    expand="block"
                    onClick={() => router.push('/dashboard/review')}
                  >
                    Review saved words / expressions
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default LessonComplete;
