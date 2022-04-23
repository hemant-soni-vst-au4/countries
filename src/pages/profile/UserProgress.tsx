import React, { useEffect } from 'react'
import clsx from 'clsx'
import {
  IonButton,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonRow,
  IonSpinner,
  useIonRouter,
} from '@ionic/react'
import {indexBy} from 'lodash/fp';
// import {useEffect} from 'react'

import {addMonths, getMonth, setMonth, startOfMonth} from 'date-fns'
// import {format} from 'date-fns/fp'
import {caretDown} from 'ionicons/icons'
// import './UserProgress.scss'
// import {gql, useQuery} from '@apollo/client';
import { userProfile} from '../../fetchApis';

import {useGetProfileQuery, useGetUserProgressQuery} from '../../schema/types-and-hooks'
import {inRange} from 'lodash'

import './UserProgress.scss';

const months = [
  {value: 1, label: 'January', shortForm: 'JAN'},
  {value: 2, label: 'February', shortForm: 'FEB'},
  {value: 3, label: 'March', shortForm: 'MAR'},
  {value: 4, label: 'April', shortForm: 'APR'},
  {value: 5, label: 'May', shortForm: 'MAY'},
  {value: 6, label: 'June', shortForm: 'JUN'},
  {value: 7, label: 'July', shortForm: 'JUL'},
  {value: 8, label: 'August', shortForm: 'AUG'},
  {value: 9, label: 'September', shortForm: 'SEP'},
  {value: 10, label: 'October', shortForm: 'OCT'},
  {value: 11, label: 'November', shortForm: 'NOV'},
  {value: 12, label: 'December', shortForm: 'DEC'},
]

export default function UserProgress() {
  const {
    data: {profile},
  } = useGetProfileQuery({fetchPolicy: 'cache-only'})
  // console.log("profile", profile)
  // const navCtrl = useStore((state) => state.navController)
  const router = useIonRouter()

  useEffect(() => {
    userProfile();
    // console.log("info", info)
  },[]);
  const now = new Date()
  const [selectedMonth, setSelectedMonth] = React.useState(getMonth(new Date()))
  const [showPopover, setShowPopover] = React.useState(null)
  const start = startOfMonth(setMonth(now, selectedMonth))
  const end = addMonths(start, 1)
  const {loading, error, data} = useGetUserProgressQuery({
    fetchPolicy: 'cache-and-network',
  })

  if (loading) {
    return (
      <div className="ion-text-center ion-padding-top">
        <IonSpinner name="dots" />
      </div>
    )
  }
  if (error) {
    return <div>Error</div>
  }

  

  const progress = data.progressState
  const byLevel = indexBy('type', progress.counts)
  const inMonthCount = progress.datetimes.filter((date) => {
    return inRange(+date, +start, +end)
  }).length

  return (
    <div className="profile-progress-tab">
      <IonRow className="ion-justify-content-center ion-margin-top profile-progress">
        <IonCol
          sizeXs="12"
          sizeSm="12"
          sizeLg="12"
          sizeXl="12"
          sizeMd="12"
          className="ion-align-self-center ion-no-padding"
        >
          <IonPopover
            isOpen={!!showPopover}
            event={showPopover}
            mode="md"
            cssClass="months-popover"
            onDidDismiss={() => setShowPopover(null)}
          >
            <IonList lines="none">
              {months.map((m, i) => (
                <IonItem
                  key={i}
                  onClick={() => {
                    setShowPopover(null)
                    setSelectedMonth(i)
                  }}
                >
                  <IonLabel className={clsx(i === selectedMonth && 'c-red')}>
                    {m.label}
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonPopover>
          <h5 className="current-month">
            <img src="/assets/images/user-progress/completed.svg" alt="COMPLETED" />
            COMPLETED IN{' '}
            <span>
              {months[selectedMonth].shortForm}

              <IonIcon
                className="drop-down"
                mode="md"
                icon={caretDown}
                onClick={(e) => {
                  e.persist()
                  setShowPopover(e)
                }}
              ></IonIcon>
            </span>
          </h5>
          <h1 className="lessons-count">
            <strong> {inMonthCount} </strong> <small>lessons</small>
          </h1>

          <h5 className="current-month ion-padding-top">
            <img
              src="/assets/images/user-progress/total-completed.svg"
              alt="TOTAL COMPLETED"
            />
            TOTAL COMPLETED
          </h5>
          <h1 className="lessons-count">
            <strong id="total"> {progress.totalCount}</strong> <small>lessons</small>
          </h1>

          <h5 className="current-month ion-padding-top">
            <img
              src="/assets/images/user-progress/upper-beginner.svg"
              alt="UPPER-BEGINNER STUDIED"
            />
            UPPER-BEGINNER STUDIED
          </h5>
          <h1 className="lessons-count">
            <strong> {byLevel['Upper-beginner'].count}</strong> <small>lessons</small>
          </h1>

          <h5 className="current-month ion-padding-top">
            <img
              src="/assets/images/user-progress/intermediate.svg"
              alt="INTERMEDIATE STUDIED"
            />
            INTERMEDIATE STUDIED
          </h5>
          <h1 className="lessons-count">
            <strong> {byLevel['Intermediate'].count}</strong> <small>lessons</small>
          </h1>

          <h5 className="current-month ion-padding-top">
            <img src="/assets/images/user-progress/advanced.svg" alt="ADVANCED" />
            ADVANCED STUDIED
          </h5>
          <h1 className="lessons-count">
            <strong id="advance"> {byLevel['Advanced'].count}</strong> <small>lessons</small>
          </h1>
          <p
            className="current-month pointer"
            style={{textDecoration: 'underline', cursor: 'pointer'}}
            onClick={() => {
              // navCtrl.navigateForward(`/subscription`)
              router.push('/subscription', 'forward')
            }}
          >
            Manage Subscription
          </p>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center profile-bg-yellow">
        {profile?.currentPackage === 'Subscription' ? (
          <IonCol
            sizeXs="10"
            sizeSm="10"
            sizeLg="7"
            sizeXl="6"
            sizeMd="8"
            className="ion-no-padding ion-align-self-center"
          >
            <h3 className="ion-no-margin ion-text-center">
              <strong>Help your friends and family speak English</strong>
            </h3>
            <IonButton
              mode="ios"
              color="danger"
              shape="round"
              expand="block"
              onClick={() => {
                // navCtrl.navigateForward(`/share-app`)
                router.push('/share-app', 'forward')
              }}
            >
              <strong>INVITE A FRIEND</strong>
            </IonButton>
          </IonCol>
        ) : (
          <IonCol
            sizeXs="10"
            sizeSm="10"
            sizeLg="7"
            sizeXl="6"
            sizeMd="8"
            className="ion-no-padding ion-align-self-center"
          >
            <h3 className="ion-no-margin ion-text-center">
              <strong>Unlock your journey</strong>
            </h3>
            <IonButton
              mode="ios"
              color="danger"
              shape="round"
              expand="block"
              onClick={() => {
                // navCtrl.navigateForward(`/subscriptionplans`)
                router.push('/subscriptionplans', 'forward')
              }}
            >
              <strong>SUBSCRIBE NOW</strong>
            </IonButton>
          </IonCol>
        )}
      </IonRow>
    </div>
  )
}
