import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from '@ionic/react'
import * as React from 'react'
import {useLessonStore} from './useLessonStore'
// import {useStore} from 'src/reactapp/useStore'
import {chevronBack} from 'ionicons/icons'
import './LessonStepHeader.scss'

const stepTitles = {
  1: 'Step 1 : Listen',
  2: 'Step 2 : Dictation',
  3: 'Step 3 : Review',
  4: 'Step 4 : Practice',
  5: 'Step 5 : Re-listen',
}
export function LessonStepHeader() {
  const router = useIonRouter()
  const [present] = useIonAlert()
  const lesson = useLessonStore((state) => state.lesson)
  // console.log("lesson",lesson)
  const step = useLessonStore((state) => state.step)

  return (
    <IonHeader mode="ios">
      <IonToolbar mode="ios">
        <IonButtons slot="start">
          <IonButton
            mode="md"
            onClick={() => {
              present({
                message: 'Are you sure you want to exit lesson?',
                buttons: [
                  {
                    text: 'No',
                    role: 'cancel',
                    handler: (blah) => {
                      console.log('Confirm Cancel: blah')
                    },
                  },
                  {
                    text: 'Yes',
                    handler: () => {
                      if (router.canGoBack()) {
                        router.goBack()
                      } else {
                        router.push(`/dashboard/lessons`, 'back')
                      }
                    },
                  },
                ],
              })
            }}
          >
            <IonIcon color="dark" slot="icon-only" icon={chevronBack}></IonIcon>
          </IonButton>
        </IonButtons>
        <IonTitle>{stepTitles[step] || lesson.lessonName}</IonTitle>
        <div style={{textAlign: 'center'}}></div>
        <IonButtons slot="end">
          <IonButton
            mode="md"
            // routerDirection="root"
            // routerLink="/dashboard/lessons"
            onClick={() => {
              present({
                message: 'Are you sure you want to exit lesson?',
                buttons: [
                  {
                    text: 'No',
                    role: 'cancel',
                    handler: (blah) => {
                      console.log('Confirm Cancel: blah')
                    },
                  },
                  {
                    text: 'Yes',
                    handler: () => {
                      router.push(`/dashboard/lessons`, 'root')
                    },
                  },
                ],
              })

              // navController.navigateRoot()
            }}
          >
            <IonIcon
              color="dark"
              mode="md"
              slot="icon-only"
              src="/assets/images/home.svg"
            ></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}
