import {IonButton, IonCol, IonIcon, IonRow} from '@ionic/react'
import * as React from 'react'
import {useLessonStore} from './useLessonStore'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'
import {StepNavMenu} from './StepNavMenu'
import {SceneNavMenu} from './SceneNavMenu'

export function ActionBar({onPlayClick = null}) {
  const playerState = useLessonStore((state) => state.playerState)
  const play = useLessonStore((state) => state.play)
  const rewind = useLessonStore((state) => state.rewind)
  const stop = useLessonStore((state) => state.stop)
  const playedRate = 10
  const isPlay = playerState === PlayerStates.PLAYING

  return (
    <IonRow
      // *ngIf="isLoaded"
      className="ion-align-items-center ion-justify-content-center"
    >
      <IonCol sizeXs="12" className="ion-align-self-center ion-no-padding">
        <div className="playing-progress-bar" style={{width: '100%'}}>
          <div className={`scene-bar active`} style={{flex: 1}}>
            <div
              className="scene-progress"
              style={{
                width: `${playedRate * 100}%`,
              }}
            />
          </div>
        </div>
        <IonRow className="youtube-handler ">
          <IonCol
            id="lesson-steps"
            size="4"
            className="ion-align-self-center ion-no-padding"
          >
            <StepNavMenu />
          </IonCol>
          <IonCol
            sizeXs="4"
            sizeSm="4"
            sizeMd="4"
            sizeLg="4"
            sizeXl="4"
            className="ion-text-center ion-align-self-center ion-no-padding"
          >
            <div style={{display: 'flex'}}>
              <div style={{flex: 1}}>
                {isPlay && (
                  <IonButton
                    className=" ion-no-padding"
                    fill="clear"
                    onClick={() => {
                      rewind(3)
                    }}
                  >
                    <IonIcon src="/assets/images/lessons/3seconds-back.svg"></IonIcon>
                  </IonButton>
                )}
              </div>
              <div style={{flex: 1}}>
                {isPlay ? (
                  <IonButton
                    className=" ion-no-padding"
                    fill="clear"
                    onClick={() => stop()}
                  >
                    <IonIcon src="/assets/images/lessons/pause-lesson.svg"></IonIcon>
                  </IonButton>
                ) : (
                  <IonButton
                    className=" ion-no-padding"
                    fill="clear"
                    onClick={() => (onPlayClick ? onPlayClick() : play())}
                  >
                    <IonIcon src="/assets/images/lessons/play-lesson.svg"></IonIcon>
                  </IonButton>
                )}
              </div>
              <div style={{flex: 1}}></div>
            </div>
          </IonCol>
          <IonCol
            size="4"
            className="ion-align-self-center ion-no-padding"
          >
            <SceneNavMenu />
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  )
}
