import {Plugins} from '@capacitor/core'

import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTextarea,
  useIonToast,
} from '@ionic/react'
import {close} from 'ionicons/icons'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {useHistory, useParams} from 'react-router-dom'
import {currentLessonIdVar} from '../../../apollo/apollo-client'
import {
  Lesson,
  useGetLessonDeatilQuery,
  useGetProfileQuery,
  useReportLessonIssueMutation,
} from '../../../schema/types-and-hooks'
// import {useStore} from 'src/reactapp/useStore'
import * as yup from 'yup'

// import {getNativeStorage} from '../nativeStorage'
import {LessonPlayer} from './LessonPlayer'
import {LessonStepDictation} from './LessonStepDictation'
import {LessonStepHeader} from './LessonStepHeader'
import {LessonStepListen} from './LessonStepListen'
import {LessonStepReListen} from './LessonStepReListen'
import {LessonStepReview} from './LessonStepReview'
import {LessonStepPractice} from './step4Practice/LessonStepPractice'
import {useLessonStore} from './useLessonStore'
import {ErrorBoundary} from 'react-error-boundary'
import {msg} from '../../../language/translation.en'
import {storageHelper} from '../../../utils/storageHelper'
import {Device} from '@capacitor/device'
import {App} from '@capacitor/app'
import './LessonStepsPage.scss'

const {Keyboard, Filesystem} = Plugins

interface CommonData {
  profile: any
  acronymsList: [any]
}

const lessonParamsSchema = yup.object().shape({
  subLessonId: yup.string().required(),
  isDraft: yup.boolean().required(),
})

const lessonSteps = [
  {
    name: 'Step 1 : Listen',
    _id: 'Listen',
  },
  {
    name: 'Step 2 : Dictation',
    _id: 'Dictation',
  },
  {
    name: 'Step 3 : Review',
    _id: 'Review',
  },
  {
    name: 'Step 4 : Practice',
    _id: 'Practice',
  },
  {
    name: 'Step 5 : Re-listen',
    _id: 'Re-listen',
  },
]

async function getUserPlatform() {
  let appInfo
  try {
    appInfo = await App.getInfo()
  } catch {}
  const info = await Device.getInfo()
  const userPlatform = `${info.manufacturer} ( ${info.platform} ) ${info.model} ( ${info.osVersion} ) - ${appInfo?.version}`
  return userPlatform
}

function ReportIssueModal({isOpen, onDismiss}) {
  const lesson = useLessonStore((state) => state.lesson)
  const step = useLessonStore((state) => state.step)
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  const [value, setValue] = React.useState('')
  const [presentToast] = useIonToast()
  const [reportIssue] = useReportLessonIssueMutation({
    onCompleted: (data) => {
      if (data.reportLessonIssue) {
        presentToast(msg['CONTACT_US_REQUEST_SENT_SUCCESSFULLY'], 2000)
        onDismiss()
      } else {
        presentToast(msg['TRY_AGAIN'], 2000)
      }
    },
  })

  async function handleSave() {
    const message = value.trim()

    if (message.length === 0) {
      presentToast('Please enter a message.')
      return
    }

    const userPlatform = await getUserPlatform()

    const report = {
      message: message,
      scene: sceneIdx + 1,
      step: lessonSteps[step - 1].name,
      lessonName: lesson.lessonName,
      userPlatform: userPlatform,
    }
    reportIssue({
      variables: {
        report,
      },
    })
  }

  return (
    <IonModal
      mode="ios"
      isOpen={isOpen}
      cssClass="reportIssueModal"
      onWillDismiss={onDismiss}
    >
      <div className="app-report-issue">
        <IonRow>
          <IonCol>
            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol size="11" className="ion-align-self-center">
                <h4 className="ion-no-margin c-orange">
                  Would you like to report an issue?
                </h4>
              </IonCol>
              <IonCol size="1" className="ion-align-self-center ion-text-right">
                <IonIcon
                  mode="md"
                  icon={close}
                  className="pointer"
                  id="modal-dismiss"
                  onClick={onDismiss}
                  // (click)="onDismiss()"
                ></IonIcon>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol size="12" className="ion-align-self-center report-block">
                <IonItem lines="none" className="issue-textarea ion-margin-bottom">
                  <IonTextarea
                    rows={5}
                    placeholder="Please write the issue here..."
                    value={value}
                    onIonChange={(e) => setValue(e.detail.value)}
                  ></IonTextarea>
                </IonItem>
                <IonText>- Lesson : {lesson.lessonName}</IonText>
                <br />
                <IonText>- Scene : {sceneIdx + 1}</IonText>
                <br />
                <IonText>- {lessonSteps[step - 1].name}</IonText>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
              <IonCol size="12" className="ion-align-self-center">
                <IonButton
                  mode="ios"
                  color="danger"
                  fill="outline"
                  shape="round"
                  expand="block"
                  onClick={handleSave}
                >
                  Submit
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </div>
    </IonModal>
  )
}

function LessonStepPage() {
  const ionContentRef = React.useRef<HTMLIonContentElement>()
  const footerRef = React.useRef<any>()
  const [showReportModal, setShowReportModal] = React.useState(false)
  const lesson = useLessonStore((state) => state.lesson)
  const setScrollTop = useLessonStore((state) => state.setScrollTop)
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const step = useLessonStore((state) => state.step)
  const stop = useLessonStore((state) => state.stop)
  console.log("step and stop", step, stop)

  function Footer(props) {
    const [myPortal, setMyPortal] = React.useState<any>(null)
    React.useEffect(() => {
      if (footerRef.current) {
        const portal = ReactDOM.createPortal(props.children, footerRef.current)
        setMyPortal(portal)
      }
    }, [footerRef.current, setMyPortal])
    return myPortal
  }

  function handleReportIssue() {
    stop()
    setShowReportModal(true)
  }

  return (
    <IonPage className="lesson-step-page">
      <LessonStepHeader />
      <IonContent
        id="ion-content"
        ref={ionContentRef}
        scrollEvents={true}
        onIonScroll={(e) => {
          setScrollTop(e.detail.scrollTop)
        }}
      >
        <IonGrid className="ion-no-padding">
          <IonRow className="lesson ion-align-items-center ion-justify-content-center">
            <IonCol 
            
            sizeXs="12" sizeSm="12" sizeMd="10" sizeLg="8" sizeXl="8">
              {/* <Box className="lesson"> */}
              <LessonPlayer
                youtubeId={lesson.youtubeId}
                onClickReportIssue={handleReportIssue}
              />

              {ytPlayer && (
                <>
                  {step === 1 ? (
                    <LessonStepListen Footer={Footer} />
                  ) : step === 2 ? (
                    <LessonStepDictation Footer={Footer} />
                  ) : step === 3 ? (
                    <LessonStepReview Footer={Footer} />
                  ) : step === 4 ? (
                    <LessonStepPractice Footer={Footer} />
                  ) : step === 5 ? (
                    <LessonStepReListen Footer={Footer} />
                  ) : null}
                </>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
        {showReportModal && (
          <ReportIssueModal
            isOpen={showReportModal}
            onDismiss={() => setShowReportModal(false)}
          />
        )}
      </IonContent>
      <IonFooter mode="ios">
        <IonGrid className="ion-no-padding">
          <IonRow className="lesson ion-align-items-center ion-justify-content-center">
            <IonCol sizeXs="12" sizeSm="12" sizeMd="10" sizeLg="8" sizeXl="8">
              <div ref={footerRef}></div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  )
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function LessonStepsPage() {
  const params = useParams<any>()
  const {subLessonId, isDraft} = lessonParamsSchema.cast(params)
  const loading = useLessonStore((state) => state.loading)
  const init = useLessonStore((state) => state.init)
  const setLesson = useLessonStore((state) => state.setLesson)

  React.useEffect(() => {
    return () => {
      init()
    }
  }, [])

  const lessonRes = useGetLessonDeatilQuery({
    // fetchPolicy: 'cache-and-network',
    variables: {
      id: subLessonId,
    },
    onCompleted: (data) => {
      currentLessonIdVar(data.lesson._id)
      setLesson(data.lesson as Lesson)
      // console.log(data.lesson)
      // setLessonDetails(data.lesson as Lesson)
    },
    skip: !subLessonId,
  })

  if (loading || !lessonRes.data) {
    return <IonProgressBar />
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      <LessonStepPage />
    </ErrorBoundary>
  )
}

async function blobUrlToBase64(url): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((data) => {
        const blob = data.blob()
        return blob
      })
      .then((blob) => {
        let reader = new window.FileReader()

        reader.onloadend = function () {
          const data = reader.result.toString()
          resolve(data)
          // console.log(data)
        }

        reader.readAsDataURL(blob)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// const sampleRate = getAudioContext().sampleRate || 44100

function useLessonNav(subLessonId) {
  const [step, setStep] = React.useState(0)
  const [scene, setScene] = React.useState(0)

  async function restoreLeftData() {
    const leftOf = await storageHelper.getNativeStorage('leftOfData')
    // console.log(leftOf)
  }

  React.useEffect(() => {
    restoreLeftData()
  }, [subLessonId])

  return {
    step,
    scene,
  }
}

export default LessonStepsPage
