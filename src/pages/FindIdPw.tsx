import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

const FindIdPw: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>Find Id / Pw</div>
        <div>
          <IonButton routerLink="/signup">to Sign Up</IonButton>
          <IonButton routerLink="/login">to Login</IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default FindIdPw
