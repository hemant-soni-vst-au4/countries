import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>Login</div>
        <IonButton routerLink="/dashboard">Login</IonButton>
        <div>
          <IonButton routerLink="/find-idpw">Find ID/PW</IonButton>
          <IonButton routerLink="/signup">Sign Up</IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Login
