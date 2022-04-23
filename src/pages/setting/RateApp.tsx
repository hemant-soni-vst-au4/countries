import {
    IonButton,
    IonIcon,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonToolbar,
    IonInput,
    IonTitle
  } from '@ionic/react'
  // import {useGetProfileQuery} from '../../schema/types-and-hooks'
  
  const RateApp: React.FC = () => {
    // const {data : {profile}} = useGetProfileQuery()
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
          <b>Rate App</b>
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
  
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
                <h1 className="ion-no-margin">
                  <strong>Edit Name</strong>
                </h1>
              </IonCol>
            </IonRow>
            <form>
              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
                  <IonItem mode="ios" className="ion-no-padding auth-inputs">
                    <IonLabel position="floating">User name</IonLabel>
                    <IonInput type="text" placeholder="fullName" required>
                      {' '}
                    </IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
                <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
                  <IonButton
                    mode="ios"
                    color="danger"
                    fill="outline"
                    shape="round"
                    expand="block"
                    type="submit"
                  >
                    Save
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
                <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeXl="4" sizeLg="6">
                  <IonButton
                    mode="ios"
                    color="medium"
                    fill="outline"
                    shape="round"
                    expand="block"
                    routerLink="/setting/account"
                  >
                    Cancel
                  </IonButton>
                </IonCol>
              </IonRow>
            </form>
          </IonGrid>
        </IonContent>
      </IonPage>
    )
  }
  
  export default RateApp
  