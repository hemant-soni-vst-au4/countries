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
  IonTitle,
  useIonRouter,
useIonViewDidLeave,
useIonViewWillEnter,
useIonViewWillLeave
} from '@ionic/react';
import './Account.scss';
import { fetchApi } from '../../../fetchApis';

import React, {useState} from 'react'
// import {useGetProfileQuery} from '../../../schema/types-and-hooks'

const Account: React.FC = () => {
const router = useIonRouter()
const [user, setUser] = useState({
    fullName: '',
    email: '',
    currentPackage: '',
    subscriptionLabel: '',
    subscriptionType: '',
    promotionalLesson: '',
    endDate: '',
    startDate: '',
})




const checkIsExpired = async (subscriptionType) => {
  try {
    const res = await fetchApi('/userSubscription/getUserSubscription', {
      method: 'POST',
      body: JSON.stringify({
        subscriptionType
      }),
    })
    // console.log("checkIsEx", res.message)

    return res.message === 'Your subscription has been canceled.'
  } catch (error) {
    console.log(error)
  }
  return false
}



const userProfile = async () => {
  const SUBSCRIPTION_LABELS = {
    Subscription: 'Subscription',
    SubscriptionExpired: 'Subscription Expired',
    Trial: 'Free Trial',
  }
  try {
  const {data: profile} = await fetchApi('/user/get-profile')
  console.log("function account", profile)
  if (
    profile.currentPackage === 'Subscription' &&
    profile.subscriptionType &&
    (await checkIsExpired(profile.subscriptionType))
  ) {
    profile.currentPackage = 'SubscriptionExpired'
  }

    setUser({
    fullName: profile.fullName,
    email: profile.email,
    currentPackage: profile.currentPackage,
    subscriptionLabel: SUBSCRIPTION_LABELS[profile.currentPackage],
    subscriptionType: profile.subscriptionType,
    promotionalLesson: profile.subscriptionLesson,
    endDate: new Date(`${profile.userSubscriptionEndDate}`).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
    startDate: new Date(`${profile.userSubscriptionStartDate}`).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
  })
  


} catch (error) {
  console.log(error)
}
}
const subscription = () => {
  if(user.currentPackage === 'Subscription') {
    router.push('/subscription')
  } else {
    router.push('/subscriptionplans')

  }
}

useIonViewDidLeave(() => {
  // console.log('ionViewDidLeave event fired');
});

useIonViewWillLeave(() => {
  // console.log('ionViewWillLeave event fired');
});

useIonViewWillEnter(() => {
  userProfile();
});


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
          <b>Account</b>
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
      <IonContent className="ion-padding account">
        <IonGrid>
          {/* <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              className="ion-align-self-center"
            >
              <h1 className="ion-no-margin">
                <strong>Account</strong>
              </h1>
            </IonCol>
          </IonRow> */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              className="ion-align-self-center"
            >
              <IonItem mode="ios">
                <IonLabel>
                  User name
                  <h2 className="ion-padding-top">{ user.fullName }</h2>
                </IonLabel>
                <IonButton routerLink="/setting/edit-name" routerDirection="forward" slot="end" color="danger" mode="ios" fill="clear">
                  Edit
                </IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              className="ion-align-self-center"
            >
              <IonItem mode="ios">
                <IonLabel>
                  Email
                  <h2 className="ion-padding-top">{ user.email  }</h2>
                </IonLabel>
                <IonButton routerLink="/setting/edit-email" slot="end" color="danger" mode="ios" fill="clear">
                  Edit
                </IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              className="ion-align-self-center"
            >
              <IonItem mode="ios">
                <IonLabel>
                  Update password
                </IonLabel>
                <IonButton routerLink="/setting/edit-password" slot="end" color="danger" mode="ios" fill="clear">
                  Manage
                </IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="7"
              sizeLg="6"
              sizeXl="4"
              className="ion-align-self-center"
            >
              <IonItem mode="ios" >
                <IonLabel>
                  Subscription Status
                  <h2 className="ion-padding-top">{ user.subscriptionLabel  }</h2>
                </IonLabel>
                <IonButton
                onClick={subscription}
                 slot="end" color="danger" mode="ios" fill="clear">
                  Manage
                </IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
          {user?.subscriptionType === "Promtion" ?
          <IonRow  class="ion-align-items-center ion-justify-content-center">
      <IonCol sizeXs="12" sizeSm="12" sizeMd="7" sizeLg="6" sizeXl="4" class="ion-align-self-center">
        <IonItem mode="ios">
          <IonLabel
            >Promotional Lessons
            <h2 className="ion-padding-top">{ user.promotionalLesson } ( {user.startDate} - { user.endDate } )</h2>
            
          </IonLabel>
        </IonItem>
      </IonCol>
    </IonRow> : " " }

        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default Account;