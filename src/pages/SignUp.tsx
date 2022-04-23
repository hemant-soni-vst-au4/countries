import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

const SignUp: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>Sign Up</div>
        <IonButton routerLink="/dashboard">Sign Up</IonButton>
        <div>
          <IonButton routerLink="/find-idpw">Find ID/PW</IonButton>
          <IonButton routerLink="/login">to Login</IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SignUp
