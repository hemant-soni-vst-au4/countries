import {
  IonButton,
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  IonToggle,
  useIonViewWillEnter,
  IonSkeletonText,
  useIonAlert,
  IonTitle
} from '@ionic/react'
import moment from 'moment'
import React, {useState, useEffect} from 'react'
import {LocalNotifications} from '@capacitor/local-notifications'
import {DatePicker} from '@ionic-native/date-picker'
// import {useGetProfileQuery} from '../../schema/types-and-hooks'
import {storageHelper} from '../../utils/storageHelper'
import './Reminder.scss'

const Reminder: React.FC = () => {
  // const {data} = useGetProfileQuery()
  const [checked] = useState(false)
  const [load, setLoad] = useState(false)
  const [present] = useIonAlert()
  const [reminder, setreminder] = useState(false)
  const [reminderTime, setreminderTime] = useState('')

 

  const onChangeReminder = (event) => {
    if (event === false) {
      storageHelper.removeNativeStorage('reminder')
      setreminder(false)
      setreminderTime(undefined)
      LocalNotifications.cancel({notifications: [{id: 42}]})
    } else if (event) {
      setReminder()
    } else {
      storageHelper.removeNativeStorage('reminder')
      setreminderTime(undefined)
      LocalNotifications.cancel({notifications: [{id: 42}]})
    }
  }

  const setReminderTime = async (date) => {
    const time = new Date(date.getTime())
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          id: 42,
          title: 'SpeakyPeaky',
          body: '20 mins a day = big gains in 3 months',
          schedule: {
            repeats: true,
            every: 'day',
            on: {
              hour: time.getHours(),
              minute: time.getMinutes(),
            },
          },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null,
        },
      ],
    })
    console.log('notify', notifs)
  }
  const setReminder = async () => {
    try {
      const date = await DatePicker.show({
        date: new Date(),
        mode: 'time',
        androidTheme: DatePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
      })

      storageHelper.setNativeStorage('reminder', date.getTime())

      await setReminderTime(date)
      setreminderTime(date.getTime().toString())
      setreminder(true)

      present({
        header: 'Reminder is set!',
        message:
          'Perfect. We will send you a nudge at <strong>' +
          `${moment(date).format('LT')}` +
          '</strong> everyday',
        cssClass: 'user-level-alert',
        buttons: ['OK'],
      })
    } catch (err) {
      // console.log('Error occurred while getting date: ', err)
    }
  }

  useIonViewWillEnter(() => {
    LocalNotifications.requestPermissions()
    storageHelper.getNativeStorage('reminder').then((reminder) => {
      console.log('reminder', reminder?.data)

      if (reminder?.data) {
        setreminderTime(new Date(reminder.data).toString())
        setreminder(true)
        setReminderTime(new Date(reminder.data))
      }
      setLoad(true)
    })
  })

  useEffect(() => {
    storageHelper.getNativeStorage('reminder').then((reminder) => {
      console.log('reminder', reminder?.data)

      if (reminder?.data) {
        setreminderTime(new Date(reminder.data).toString())
        setreminder(true)
        setReminderTime(new Date(reminder.data))
      }
      setLoad(true)
    })
  }, [checked, reminder, reminderTime])

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
          <b>Reminder</b>
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
        {load ? (
          <IonGrid>
            {/* <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol
                sizeXs="12"
                sizeSm="12"
                sizeLg="6"
                sizeMd="7"
                sizeXl="4"
                className="ion-align-self-center"
              >
                <h1 className="ion-no-margin">
                  <strong>Reminder</strong>
                </h1>
              </IonCol>
            </IonRow> */}

            <IonRow className="reminder-block ion-align-items-center">
              <IonCol className="ion-align-self-center">
                {reminderTime === undefined || reminderTime === '' ? (
                  <IonRow className="ion-align-items-center ion-justify-content-center ion-text-center">
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeLg="6"
                      sizeMd="7"
                      sizeXl="4"
                      className="ion-align-self-center"
                    >
                      <IonIcon
                        className="alarm"
                        src="../../../../../assets/images/alarm.svg"
                      ></IonIcon>
                      <h3 className="ion-text-center ion-margin-bottom">
                        Would you like to receive a reminder?
                      </h3>
                    </IonCol>
                  </IonRow>
                ) : (
                  <IonRow className="ion-align-items-center ion-justify-content-center">
                    <IonCol
                      sizeXs="12"
                      sizeSm="12"
                      sizeLg="6"
                      sizeMd="7"
                      sizeXl="4"
                      className="ion-align-self-center ion-text-center ion-margin-top"
                    >
                      <IonIcon
                        className="alarm"
                        src="../../../../../assets/images/alarm.svg"
                      ></IonIcon>
                      <h3 className="ion-text-center ion-margin-bottom">
                        We will send you a nudge <br />
                        at{' '}
                        <span className="c-orange">
                          {' '}
                          {moment(reminderTime).format('LT')}{' '}
                        </span>{' '}
                        everyday
                      </h3>
                    </IonCol>
                  </IonRow>
                )}
                {reminderTime === undefined || reminderTime === '' ? (
                  <IonRow className="ion-align-items-center ion-justify-content-center">
                    <IonCol
                      sizeXs="10"
                      sizeSm="10"
                      sizeMd="7"
                      sizeLg="6"
                      sizeXl="4"
                      className="ion-align-self-center"
                    >
                      <IonItem lines="none">
                        <IonLabel color="danger">
                          Yes, set a reminder. <br />
                          <IonText color="medium">(Push notification)</IonText>
                        </IonLabel>
                        <IonToggle
                          mode="ios"
                          checked={reminder}
                          onIonChange={(e) => {
                            onChangeReminder(e.detail.checked)
                          }}
                        ></IonToggle>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                ) : (
                  <IonRow className="ion-align-items-center ion-justify-content-center">
                    <IonCol
                      sizeXs="10"
                      sizeSm="10"
                      sizeMd="7"
                      sizeLg="6"
                      sizeXl="4"
                      className="ion-align-self-center ion-text-center"
                    >
                      <IonItem lines="none">
                        <IonToggle
                          mode="ios"
                          checked={reminder}
                          onIonChange={(e) => {
                            onChangeReminder(e.detail.checked)
                          }}
                        ></IonToggle>
                      </IonItem>
                      <p
                        style={{cursor: 'pointer'}}
                        className="c-orange ion-margin-top ion-align-self-center"
                        onClick={setReminder}
                      >
                        Edit
                      </p>
                    </IonCol>
                  </IonRow>
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          [0, 1, 2, 3, 4].map((i) => (
            <IonRow class="ion-align-items-center ion-justify-content-center">
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

export default Reminder
