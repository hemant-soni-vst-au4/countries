import React from 'react'
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
} from '@ionic/react'

interface AppHeaderProps {
  title?: string
}

const AppHeader: React.FC<AppHeaderProps> = ({title}) => {
  return (
    <IonHeader mode="ios">
      <IonToolbar mode="ios">
        <IonButtons slot="start">
          <IonBackButton color="dark" defaultHref="/dashboard/lessons" text=" " />
        </IonButtons>

        <IonTitle>{title}</IonTitle>
        <div style={{textAlign: 'center'}}></div>
        <IonButtons slot="end">
          <IonButton mode="md" routerDirection="root" routerLink="/dashboard/lessons">
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
export default AppHeader
