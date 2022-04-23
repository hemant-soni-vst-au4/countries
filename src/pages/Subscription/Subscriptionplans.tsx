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
  useIonAlert,
  useIonLoading,
  useIonToast,
  useIonViewWillEnter,
  useIonViewWillLeave,
  useIonViewDidEnter,
} from '@ionic/react'
import Cookies from 'js-cookie'
import {isPlatform} from '@ionic/react'
import {environment} from '../../enviornment'
import React, {useEffect, useState} from 'react'
import {InAppPurchase2 as Store} from '@ionic-native/in-app-purchase-2'
import {IAPProduct} from '@ionic-native/in-app-purchase-2'
import {useGetProfileQuery} from '../../schema/types-and-hooks'
import {fetchApi} from '../../fetchApis'

import './SubscriptionPlans.scss'
import { download } from 'ionicons/icons'

interface androidTransaction {
  id: string
  purchaseState: number
  purchaseToken: string
  receipt: string
  signature: string
  type: string
}

interface androidReceipt {
  orderId: string
  packageName: string
  productId: string
  purchaseTime: number
  purchaseState: number
  purchaseToken: string
  obfuscatedAccountId: string
  autoRenewing: boolean
  acknowledged: boolean
}

const SubscriptionPlans: React.FC = () => {
  
  const router = useIonRouter()
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState(false)
  const {data} = useGetProfileQuery()
  const [pres, dismi] = useIonLoading()
  const [presen, dismiss] = useIonToast()
  const [purchsed, setPurchsed] = useState(false)
  const [present] = useIonAlert()
  const [err, setErr] = useState({})
  console.log('profile', data?.profile)
  const [isProductLoaded, setIsProductLoaded] = useState(false)
  const validatorUrl = environment.validatorURL
  let orderProduct = null
  const [products, setProducts] = useState([])


  useEffect(() => {
  
  },[data?.profile])

  const googlePlay = () => {
    window.open(
      'https://play.google.com/store/apps/details?id=com.summer.startenglishnow',
      '_blank',
    )
  }
  const appleplay = () => {
    window.open('https://apps.apple.com/us/app/speaky-peaky/id1486127431', '_blank')
  }
  const productTypes = {
    'com.startenglishnow.yearly': 'yearly',
    'com.startenglishnow.6months': '6_months',
    'com.startenglishnow.monthly': 'monthly',
  }

  const productIds = [
    'com.startenglishnow.yearly',
    'com.startenglishnow.6months',
    'com.startenglishnow.monthly',
  ]

  const verifyEmail = async (profile) => {
    try {
      pres('Please wait...')

      const res = await fetchApi('/user/resend-email', {
        method: 'POST',
        body: JSON.stringify({
          email: profile.email,
        }),
      })
      if (res.error) {
        dismi()
        presen(`${res.error}`, 3000)

        console.log('res.error', res.error)
      } else {
        dismi()
        presen(`${res.message}`, 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  function enter() {
    if (!isPlatform('cordova' || 'capacitor')) {
      setModal(true);
    }
    if (isPlatform('cordova' || 'capacitor')) {
      Store.verbosity = Store.DEBUG

      Store.register([{
        id: 'com.startenglishnow.yearly',
        alias: 'com.startenglishnow.yearly',
        type: Store.PAID_SUBSCRIPTION,
      },
      {
        id: 'com.startenglishnow.6months',
        alias: 'com.startenglishnow.6months',
        type: Store.PAID_SUBSCRIPTION,
      },
      {
        id: 'com.startenglishnow.monthly',
        alias: 'com.startenglishnow.monthly',
        type: Store.PAID_SUBSCRIPTION,
      }])
 
      Store.validator = validatorUrl
      Store.applicationUsername = data?.profile._id

        Store.when('subscription').updated( (product: IAPProduct) => {
          const producties = productIds.map((p) => Store.get(p))
          if (producties.every((v) => v && v.valid)) {
            if (producties?.length >= 3) {
              producties.forEach((p, i) => {
                setProducts[i] = p
              })
            } else {
              setProducts(producties)
            }
            //@ts-ignore
            if (Store.ready()) {
              setIsProductLoaded(true)
            }
          }
        });

        // Run some code only when the store is ready to be used
        Store.ready(() =>  {
          console.log('Store is ready');
          console.log('Products: ' + Store.products);
          console.log(JSON.stringify(Store.get('com.startenglishnow.monthly')));
        });
      Store.refresh()
    }
  }

  async function finishCheckout(product: IAPProduct) {
    // console.log('Checkout', product.owned)
    // console.log("checkout susbscription", data?.profile.currentPackage)
    if (product.owned) {
      // console.log(data?.profile.currentPackage)
      presen('Subscribed successfully. Enjoy learning English!',2000)
      router.push('/subscription')
    } else {
      presen('Something went wrong', 2000)
    }
  }

  const checkoutIAP = async (productId) => {
    if (!isPlatform('cordova' || 'capacitor')) {
      setShowModal(true)
    } else {
      try {
        if (data?.profile.status === 'NotVerified') {
          present({
            header: 'Speaky Peaky',
            message:
              "It seems like you haven't verified your account. <br> Please check your email for verification.",
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'danger',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah')
                },
              },
              {
                text: 'Resend',
                handler: () => {
                  verifyEmail(data?.profile)
                },
              },
            ],
          })
          return
        }
        orderProduct = Store.get(productId)

        Store.order(productId, {
          applicationUsername: data?.profile._id,
        })
        .error((err) => {
          console.log({err})
          orderProduct = null
        })
        .then((product: IAPProduct) => {
            orderProduct = product
            console.log('then', product.id)
            
        })
         console.log('ordered')
         console.log('ordered', orderProduct)
         Store.when(productId).registered( (product: IAPProduct) => {
          console.log('registered' + product.alias)
        });

        // Updated
        

        Store.when(productId).expired( (product: IAPProduct) => {
          console.log('expired', product.id)
          dismi()
          product.finish()  
        })

        Store.when(productId).approved( (product: IAPProduct) => {
          console.log('approved', orderProduct?.id, product.id, product.owned)
            if (orderProduct?.id === product.id) {
              product.verify()
            } else {
              product.finish()
            }
        })

        Store.when(productId).verified( (product: IAPProduct) => {
          console.log('verified', product.description, JSON.stringify(product))
            setSubscription(product)
              .then((success) => {
                console.log({success})
                if (success) {
                  product.finish()
                }
              })
              .catch((err) => {
                dismi()
                console.log({err})
              })
        })
        Store.when(productId).finished( (product: IAPProduct) => {
          console.log('finished', product.id, product.owned)
        })

        Store.when(productId).owned( (product: IAPProduct) => {
          console.log("owned", orderProduct?.id , "&&", product.id , "&&", product.owned)
          if (orderProduct?.id === product.id && product.owned) {
            finishCheckout(product)
            dismi()
          } else {
            dismi()
            console.log(product)
          }
        })
        // Track all store errors
        Store.error(function(error) {
          setErr({ error: `ERROR ${error.code}: ${error.message}` });
          setTimeout(function() {
              setErr({ error: `` });
          }, 10000);
        });
      } 
      catch (err) {
        console.log('Error Ordering ' + err)
        //  present(err)
      } 
    }
  }
  
 const downloading = () => {
   if (isPlatform('ios')) {
    window.open('https://apps.apple.com/us/app/speaky-peaky/id1486127431', '_blank')
   } else if (isPlatform('android')) {
    window.open(
      'https://play.google.com/store/apps/details?id=com.summer.startenglishnow',
      '_blank',
    )
   }

 }
 async function setSubscriptionAndroid(product: IAPProduct) {

  const response = JSON.stringify(product)
  const parseResponse = JSON.parse(response)
  console.log("response", parseResponse)
  const transaction: androidTransaction = parseResponse.transaction
  console.log("transaction", transaction)
 
  const receipt: androidReceipt = JSON.parse(transaction.receipt)
  
    console.log("receipt",receipt)

  if (!receipt.autoRenewing) {
    throw new Error('no autoRenewing')
  }

  const productType = productTypes[product.id]
  const data = {
    orderId: receipt.orderId,
    packageName: receipt.packageName,
    productId: receipt.productId,
    purchaseToken: receipt.purchaseToken,
    type: 'Android',
    productType: productType,
  }

  console.log("data", JSON.stringify(data))

  const res = await fetchApi('/userSubscription/setUserSubscription', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  console.log("res", res)
  if (res.message.startsWith('Subscribed successfully.')) {
    return true
  } else {
    throw new Error('server error')
  }
}

async function setSubscriptionIOS(product: IAPProduct) {
  const response = JSON.stringify(product)
  const parseResponse = JSON.parse(response)
  if (!parseResponse.transaction) {
    return
  }
  const receipt = parseResponse.transaction
  const productType = productTypes[product.id]
  const data = {
    orderId: receipt.transaction_id,
    packageName: 'com.summer.startenglishnow',
    productId: receipt.product_id,
    purchaseToken: receipt.appStoreReceipt,
    type: 'iOS',
    productType: productType,
  }
  const res = await fetchApi('/userSubscription/setUserSubscription', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (res.message.startsWith('Subscribed successfully.')) {
    return true
  } else {
    throw new Error('server error')
  }
}

 async function setSubscription(product: IAPProduct) {
  if (isPlatform('android')) {
    return setSubscriptionAndroid(product)
  } else if (isPlatform('ios')) {
    return setSubscriptionIOS(product)
  }
}

  useIonViewWillEnter(() => {
    console.log('entering')
    enter()
  })
  useIonViewDidEnter(() => {
    // console.log('enter')
  })
  useEffect(() => {
    // console.log('enter', products)
  }, [products])

  useIonViewWillLeave(() => {
    // console.log('leave')
  })

  return (
    <IonPage>
       <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton mode="md" routerLink="/setting/account">
              <IonIcon
                color="dark"
                // mode="md"
                slot="icon-only"
                name="chevron-back"
              ></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>
          <div style={{textAlign: 'center'}}>
          <b>Subscription Plans</b>
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
      <IonContent>
        <IonModal  isOpen={showModal}  cssClass="myModal">
          <IonHeader mode="ios" class="ion-no-border">
            <IonToolbar mode="ios" no-border>
              <IonButtons slot="end">
                <IonButton mode="md" onClick={() => setShowModal(false)}>
                  <IonIcon mode="md" slot="icon-only" name="close"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="modal">
            <IonGrid>
              <IonRow>
                <div className="heading">
                  <h1>
                    여러분의 핸드폰을 이용하여 <span>모바일 어플</span>에서 수강권을
                    구매해 주세요{' '}
                  </h1>
                  <h6 className="subtite">스피키피키 어플 다운로드받기 </h6>
                </div>
              </IonRow>
              <IonRow className="ion-justify-content-center ion-align-content-center">
                <IonCol className="ion-justify-content-center ion-align-content-center">

                  <div className="android-content">
                    <img src="./assets/images/single.png" alt="placeholder" />
                    <img src="./assets/images/scan.png" alt="placeholder" />
                   
                    
                  </div>
                  <IonButton
                     id="modal-button"
                     shape="round"
                  expand="block"
                     className="button-c"
                     onClick={downloading}
                     >
                       LET'S START
                    </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>

        {/* Modal on loading page in desktop */}
        <IonModal isOpen={modal} cssClass="myModal">
          <IonHeader class="ion-no-border">
            <IonToolbar no-border>
              <IonButtons slot="end">
                <IonButton mode="md" onClick={() => setModal(false)}>
                  <IonIcon slot="icon-only" name="close"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="modal">
            <IonGrid>
              <IonRow>
                <div className="heading">
                  <h1>
                    여러분의 핸드폰을 이용하여 <span>모바일 어플</span>에서 수강권을
                    구매해 주세요{' '}
                  </h1>
                  <h6 className="subtite">스피키피키 어플 다운로드받기 </h6>
                </div>
              </IonRow>
              <IonRow className="ion-justify-content-center ion-align-content-center">
                <IonCol className="ion-justify-content-center ion-align-content-center">
                  <div className="android-content">
                    <img src="./assets/images/single.png" alt="placeholder" />
                    <img src="./assets/images/scan.png" alt="placeholder" />
                  </div>
                  <IonButton
                  id="modal-button"
                  shape="round"
                  expand="block"
                     className="button-c"
                     onClick={downloading}
                     >
                       LET'S START
                    </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>

        <IonGrid className="ion-padding main">
          <IonRow className="ion-align-items-center">
            <IonCol size="12" className="ion-align-self-center">
              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="10"
                  className="ion-align-self-center"
                >
                  {/* <h1 className="ion-no-margin heading">Subscription Status</h1> */}
                  <p className="subheading">
                    Unlock the journey to speak English fluently
                  </p>
                </IonCol>
              </IonRow>
              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="10"
                  className="ion-align-self-center"
                >
    
                  <IonRow className="ion-align-items-center ion-justify-content-center">
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeLg="4"
                      className="ion-align-self-center"
                    >
                      <IonCard
                        onClick={() => checkoutIAP(productIds[2])}
                        className="ion-margin-top subscription-card monthly ion-no-margin"
                      >
                        <IonCardContent>
                          <h1 className="subscription-title ion-text-center">MONTHLY</h1>
                          <h1 className="subscription-amount ion-text-center">
                            US $9.99 / <span>month</span>
                          </h1>
                          <ul className="monthly-list">
                            <li>40 lessons per month</li>
                            <li>Dictionary</li>
                            <li>Saving words</li>
                            <li>Instant feedback on listening and pronunciation</li>
                          </ul>
                          <p className="ion-text-center card-bottom">
                            Recurring monthly payment. Cancel anytime.
                          </p>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>

                    {/* <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeLg="4"
                      className="ion-align-self-center"
                    >
                      <IonCard
                        onClick={() => checkoutIAP(productIds[0])}
                        className="ion-margin-top subscription-card year ion-no-margin"
                      >
                        <IonCardContent>
                          <h1 className="subscription-title ion-text-center">1 YEAR</h1>
                          <h1 className="subscription-amount ion-text-center">
                            US $5.98 / month
                          </h1>
                          <h3 className="subscription-amount2 ion-text-center">
                            (US $71.8 / year)
                          </h3>
                          <ul className="yearly-list">
                            <li>Unlimited lessons</li>
                            <li>Dictionary</li>
                            <li>Saving words</li>
                            <li>Instant feedback on listening and pronunciation</li>
                          </ul>
                          <p className="ion-text-center">
                            Billed as one payment. Recurring monthly payment. Cancel
                            anytime.
                          </p>
                        </IonCardContent>
                      </IonCard>
                    </IonCol> */}

                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeLg="4"
                      className="ion-align-self-center"
                    >
                      <IonCard
                        onClick={() => checkoutIAP(productIds[1])}
                        className="ion-margin-top subscription-card half-year ion-no-margin"
                      >
                        <IonCardContent>
                          <h1 className="subscription-title ion-text-center">6 MONTHS</h1>
                          <h1 className="subscription-amount ion-text-center">
                            US $7.99 / month{' '}
                          </h1>
                          <h3 className="subscription-amount2 ion-text-center">
                            (US $47.9 / 6 months)
                          </h3>
                          <ul className="yearly-list">
                            <li>Unlimited lessons</li>
                            <li>Dictionary</li>
                            <li>Saving words</li>
                            <li>Instant feedback on listening and pronunciation</li>
                          </ul>
                          <p className="ion-text-center">
                            Billed as one payment. Recurring monthly payment. Cancel
                            anytime.
                          </p>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                </IonCol>
              </IonRow>

              <IonRow className="ion-align-items-center ion-justify-content-center subscribed">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="10"
                  className="ion-align-self-center subs-image"
                  style={{backgroundImage: "url('./assets/images/Capture1.PNG')"}}
                >
                  <div className="subs-me">
                    <IonRow className="ion-fle">
                      <IonCol className="ion-justify-content-center ion-align-content-center">
                        <div className="android-content">
                          <img
                            src="./assets/images/googleplay.png"
                            className="googlePlay"
                            alt="placeholder"
                            onClick={googlePlay}
                          />
                          <img
                            src="./assets/images/Android_qr-code 2.png"
                            alt="placeholder"
                          />
                          <img src="./assets/images/scan.png" alt="placeholder" />
                        </div>
                      </IonCol>
                      <IonCol
                        sizeMd="6"
                        className="ion-justify-content-center ion-align-content-center"
                      >
                        <div className="apple-content">
                          <img
                            src="./assets/images/appleplay.png"
                            className="googlePlay"
                            alt="placeholder"
                            onClick={appleplay}
                          />
                          <img src="./assets/images/appleqr.png" alt="placeholder" />
                          <img src="./assets/images/scan.png" alt="placeholder" />
                        </div>
                      </IonCol>
                    </IonRow>
                  </div>
                  {/* <img src="../../../../../../assets/images/Capture1.PNG" />
                      <button className="google" (click)="googlePlay()"></button>
                      <button class="apple" (click)="applePlay()"></button> */}
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default SubscriptionPlans
