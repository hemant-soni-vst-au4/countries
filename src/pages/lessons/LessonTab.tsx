import {IonContent, IonPage} from '@ionic/react'
import LessonsHome from './LessonsHome';
// import {storageHelper} from '../../utils/storageHelper'



const LessonsTab: React.FC = () => {

  return (
    <IonPage>
      <IonContent fullscreen>

        <LessonsHome />
      </IonContent>
    </IonPage>
  )
}

export default LessonsTab
