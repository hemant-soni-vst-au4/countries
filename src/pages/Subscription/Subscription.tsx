import {
  IonBackButton,
  IonButton,
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  useIonRouter,
  IonSkeletonText,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
  IonText,
  useIonAlert,
  useIonToast,
  IonProgressBar,
  useIonLoading,
} from '@ionic/react'
import './Subscription.scss'
import {userProfile, fetchApi} from '../../fetchApis'

import React, {useState, useEffect} from 'react'
import {useGetProfileQuery} from '../../schema/types-and-hooks'

const Subscription: React.FC = () => {
  const router = useIonRouter()
  const [present] = useIonToast()
  const [presen] = useIonAlert()
  const [pres, dismiss] = useIonLoading();
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

  // const [user.subscriptionType != "Promotion", setIsProduct] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    productType: '',
    userSubscriptionStartDate: '',
    autoRenewal: '',
    userSubscriptionEndDate: '',
    subscriptionType: '',
    productId: '',
    subscriptionId: '',
  })

  const checkIsExpired = async (subscriptionType) => {
    try {
      const res = await fetchApi('/userSubscription/getUserSubscription', {
        method: 'POST',
        body: JSON.stringify({
          subscriptionType,
        }),
      })

      return res.message === 'Your subscription has been canceled.'
    } catch (error) {
      console.log(error)
    }
    return false
  }

  const getSubscriptionDetails = async (subscriptionType) => {
    try {
      const res = await fetchApi('/userSubscription/getUserSubscription', {
        method: 'POST',
        body: JSON.stringify({
          subscriptionType,
        }),
      }).then((res) => {
        if (res.message === 'Please verify your email to subscribe the package.') {
          present(`${res.message}`, 3000)
          router.push('/setting')
        } else if (res.message === 'Your subscription has been canceled.') {
          router.push('/subscriptionplans')
        } else {
          setSubscriptionDetails(res.data)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const userProfile = async () => {
    const SUBSCRIPTION_LABELS = {
      Subscription: 'Subscription',
      SubscriptionExpired: 'Subscription Expired',
      Trial: 'Free Trial',
    }
    try {
      const {data: profile} = await fetchApi('/user/get-profile')
      if (profile.currentPackage !== 'Subscription') {
        router.push('/subscriptionplans', 'forward')
        return
      }
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
        endDate: new Date(`${profile.userSubscriptionEndDate}`).toLocaleDateString(
          'en-US',
          {year: 'numeric', month: 'long', day: 'numeric'},
        ),
        startDate: new Date(`${profile.userSubscriptionStartDate}`).toLocaleDateString(
          'en-US',
          {year: 'numeric', month: 'long', day: 'numeric'},
        ),
      })
      getSubscriptionDetails(profile.subscriptionType || 'Android')
    } catch (error) {
      console.log(error)
    }
  }
  const turnOffStripeAutoRenewal= async() => {
    try {
    pres('Please wait...')
    const res = await fetchApi('/payments/updateSubscription/', {
      method: 'POST',
      body: JSON.stringify({
        subscriptionId : subscriptionDetails.subscriptionId
      }),
    })

    await getSubscriptionDetails('Stripe')
    } catch (error) {
      console.log(error)
    } finally {
      dismiss()
    }
  }
  const turnOffAutoRenewal = () => {
    presen({
      message: 'Are you sure you want to exit lesson?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah')
          },
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay')

            if (user.subscriptionType === 'Stripe') {
              turnOffStripeAutoRenewal()
            } else if (user.subscriptionType === 'iOS') {
              window.open('itms-apps://apps.apple.com/account/subscriptions', '_blank')
              // this.store.manageSubscriptions()
            } else if (user.subscriptionType === 'Android') {
              window.open(
                'https://play.google.com/store/account/subscriptions?sku=' +
                  subscriptionDetails.productId +
                  '&package=' +
                  'com.startenglishnow.speakypeaky',
              )
            }
          },
        },
      ],
    })
  }
  useIonViewDidLeave(() => {
    // console.log('ionViewDidLeave event fired');
  })

  useIonViewWillLeave(() => {
    // console.log('ionViewWillLeave event fired');
  })

  useIonViewWillEnter(() => {
    userProfile()
  })

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
          <b>Subscription</b>
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
      <IonContent className="ion-padding subscribe">
        {/* <IonProgressBar type="indeterminate"></IonProgressBar> */}

        {user.subscriptionType === 'Promotion' ? (
          <IonGrid className="ion-padding">
            <IonRow className="ion-align-items-center">
              <IonCol size="12" className="ion-align-self-center">
                <IonRow className="ion-margin-bottom ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    sizeLg="6"
                    sizeXl="4"
                    className="ion-align-self-center"
                  >
                    <h1 className="ion-no-margin">Subscription Status</h1>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-margin-bottom ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    className="ion-align-self-center"
                  >
                    <IonText color="medium">Type</IonText>
                    <h3 className="mt-5">p{user?.subscriptionType}</h3>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-margin-bottom ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    className="ion-align-self-center"
                  >
                    <IonText color="medium">Start Date</IonText>
                    <h3 className="mt-5">{user?.startDate}</h3>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-margin-bottom ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    className="ion-align-self-center"
                  >
                    <IonText color="medium">Start Date</IonText>
                    <h3 className="mt-5">{user?.endDate}</h3>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : subscriptionDetails.productType ? (
          <IonGrid className="ion-padding">
            <IonRow className="ion-align-items-center">
              <IonCol size="12" className="ion-align-self-center">
                <IonRow className="ion-margin-bottom ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    sizeLg="6"
                    sizeXl="4"
                    className="ion-align-self-center"
                  >
                    <h1 className="ion-no-margin">Subscription Status</h1>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-margin-bottom ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    className="ion-align-self-center"
                  >
                    <IonText color="medium">Type</IonText>
                    {subscriptionDetails.productType === 'yearly' ? (
                      <h3 className="mt-5">Annual</h3>
                    ) : subscriptionDetails.productType === '6_months' ? (
                      <h3 className="mt-5">6 Months</h3>
                    ) : subscriptionDetails.productType === 'monthly' ? (
                      <h3 className="mt-5">Monthly</h3>
                    ) : (
                      ''
                    )}
                  </IonCol>
                </IonRow>
                <IonRow className="ion-margin-bottom ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    className="ion-align-self-center"
                  >
                    <IonText color="medium">Start Date</IonText>
                    <h3 className="mt-5">
                      {new Date(
                        `${subscriptionDetails?.userSubscriptionStartDate}`,
                      ).toDateString()}
                      
                    </h3>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-margin-bottom ion-align-items-center ion-justify-content-center">
                  <IonCol
                    sizeXs="12"
                    sizeSm="12"
                    sizeMd="7"
                    className="ion-align-self-center"
                  >
                    {subscriptionDetails.autoRenewal ? (
                      <IonText color="medium">Subscription Renews On</IonText>
                    ) : (
                      <IonText color="medium">Subscription Expires On</IonText>
                    )}
                    <h3 className="mt-5">
                      {new Date(
                        `${subscriptionDetails.userSubscriptionEndDate}`,
                      ).toDateString()}
                    </h3>
                  </IonCol>
                </IonRow>
                {subscriptionDetails.autoRenewal ? (
                  <IonRow className="ion-align-items-center ion-justify-content-center">
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="7"
                      className="ion-align-self-center"
                      onClick={turnOffAutoRenewal}
                    >
                      <IonText id="auto-renewal" color="medium">
                        Turn off auto-renewal
                      </IonText>
                    </IonCol>
                  </IonRow>
                ) : (
                  ''
                )}
                {subscriptionDetails.subscriptionType === 'Stripe' ? (
                  <IonRow className="ion-align-items-center ion-justify-content-center">
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeMd="7"
                      className="ion-align-self-center"
                    >
                      <IonText id="auto-renewal" color="medium">
                        Manage Stripe Cards
                      </IonText>
                    </IonCol>
                  </IonRow>
                ) : (
                  ''
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          
          [0, 1, 2, 3, 4].map((i) => (
            <IonRow key={i}
            class="ion-align-items-center ion-justify-content-center">
              <IonCol
                sizeXs="12"
                sizeSm="12"
                sizeMd="7"
                sizeLg="6"
                sizeXl="4"
                class="ion-align-self-center"
              >
                <IonItem mode="ios">
                  <IonLabel>
                    <IonSkeletonText animated style={{width: '40%'}}></IonSkeletonText>
                    <h3>
                      <IonSkeletonText animated style={{width: '70%'}}></IonSkeletonText>
                    </h3>
                  </IonLabel>
                  <IonButton slot="end" color="danger" mode="ios" fill="clear">
                    <IonSkeletonText animated style={{width: '20%'}}></IonSkeletonText>
                  </IonButton>
                </IonItem>
              </IonCol>
            </IonRow>
          ))
        )}
      </IonContent>
    </IonPage>
  )
}

export default Subscription
