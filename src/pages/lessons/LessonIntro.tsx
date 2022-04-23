import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

const LessonIntro: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lesson Intro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          LessonIntro
          <IonButton routerLink="/dashboard/lessons" routerDirection="back">
            Back
          </IonButton>
          {/* <IonButton routerLink="/login">Back</IonButton> */}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default LessonIntro
