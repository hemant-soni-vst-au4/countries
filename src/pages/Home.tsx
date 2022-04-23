import {
  IonButtons,
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonToolbar,
  IonModal,
  IonButton,
  IonIcon,
  useIonRouter,
  IonRouterLink,
} from '@ionic/react'

import React, {useState} from 'react'
import './Home.scss'

const Home: React.FC = () => {
  // const [showModal, setShowModal] = useState(true);
  const router = useIonRouter()
  const [showModal, setShowModal] = useState(true)

  const dashboard = () => {
    setShowModal(false)
    router.push('/dashboard/lessons')
  }
  return (
    <IonPage onClick={dashboard}>
      <IonContent fullscreen >
        <IonModal isOpen={showModal} cssClass="my-custom-class">
          <IonContent className="modal">
            <IonGrid>
            <IonRow className="ion-align-items-center ion-justify-content-end">
              <span>
                <IonIcon
                  style={{
                    cursor: 'pointer',
                    float: 'right',
                    padding: '10px',
                    color: 'white',
                  }}
                  size="large"
                  slot="icon-only"
                  name="close"
                  onClick={dashboard}
                ></IonIcon>
              </span>
            </IonRow>

            <IonRow className="content">
              {' '}
              <IonCol sizeMd="6" sizeXs="12"
                className="ion-justify-content-center ion-align-content-center">
                <div className="image-content">
                <img src="./assets/images/Character.svg" alt="charachter" />
                </div>
              </IonCol>
              <IonCol  sizeMd="6" sizeXs="12"
              className="ion-justify-content-center ion-align-content-center">
              
              <h2>You’ve just received 5 free lessons! </h2>
              <p>
                We sent you a verification email. Please check your email so we know
                you’re a human.{' '}
              </p>
              </IonCol>
            </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>

        {/* <IonCard>
          <IonCardHeader>
          <span item-right> 
              <IonIcon style={{ cursor: 'pointer', float: "right", color: "white" }} size="large" slot="icon-only" name="close" onClick={dashboard}/>
          </span>
          </IonCardHeader>
          
          <IonCardContent>
          <img src="./assets/images/Character.svg" alt="charachter" />
          <div className="mobile">
            <h2>You’ve just received 5 free lessons! </h2>
            <p>
              We sent you a verification email. Please check your email so we know you’re
              a human.{' '}

            </p>
            </div>
          </IonCardContent>
        </IonCard> */}
      </IonContent>
    </IonPage>
  )
}

export default Home
