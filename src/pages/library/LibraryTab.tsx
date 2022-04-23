import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import SearchLessons from './LibraryPage'

const LibraryTab: React.FC = () => {
  return <SearchLessons />
  // return (
  //   <IonPage>
  //     <IonHeader>
  //       <IonToolbar>
  //         <IonTitle>Lesson Intro</IonTitle>
  //       </IonToolbar>
  //     </IonHeader>
  //     <IonContent fullscreen>
  //       <div>
  //         LibraryTab
  //         <IonButton routerLink="/dashboard/lessons" routerDirection="back">
  //           Back
  //         </IonButton>
  //         {/* <IonButton routerLink="/login">Back</IonButton> */}
  //       </div>
  //     </IonContent>
  //   </IonPage>
  // )
}

export default LibraryTab
