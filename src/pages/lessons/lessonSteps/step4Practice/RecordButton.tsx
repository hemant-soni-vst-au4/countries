import React from 'react'
import {IonCol, IonImg, IonRow, IonText} from '@ionic/react'

export function RecordButton({status, onRecordStart, onRecordStop}) {
  return (
    <IonRow className="ion-margin-top ion-align-items-center ion-justify-content-center">
      <IonCol
        id="record-voice"
        style={{height: '70px'}}
        size="6"
        className="ion-align-self-center ion-text-center"
      >
        {status === 'idle' ? (
          <>
            <IonText>Tap to record</IonText>
            <IonImg
              onClick={onRecordStart}
              style={{height: '100%'}}
              src="../../../../../assets/images/mic.png"
            />
          </>
        ) : status === 'recording' ? (
          <>
            <IonText className="c-red">Tap to stop</IonText>
            <IonImg
              onClick={onRecordStop}
              style={{height: '100%'}}
              src="../../../../../assets/images/recordingStarted.gif"
            />
          </>
        ) : status === 'stopped' ? (
          <>
            <IonText>Try Again</IonText>
            <IonImg
              onClick={onRecordStart}
              style={{height: '100%'}}
              src="../../../../../assets/images/mic.png"
            />
          </>
        ) : status === 'prepare' ? (
          <>
            <IonText>Wait</IonText>
            <IonImg
              style={{height: '100%'}}
              src="../../../../../assets/images/record-prepare.png"
            />
          </>
        ) : (
          <>
            <IonText>Try Again</IonText>
            <IonImg
              style={{height: '100%'}}
              src="../../../../../assets/images/record-prepare.png"
            />
          </>
        )}
      </IonCol>
    </IonRow>
  )
}
