import {IonButton, IonCol, IonRow} from '@ionic/react'
import React from 'react'
import {useLessonStore} from '../useLessonStore'

export function ScriptView() {
  const lesson = useLessonStore((state) => state.lesson)
  const sceneIdx = useLessonStore((state) => state.sceneIdx)

  const [showScript, setShowScript] = React.useState(true)

  const scene = lesson.scenes[sceneIdx]
  const script = scene.langs.En.txt

  console.log("script", script)
  console.log("scene", scene)
  

  return (
    <>
      <IonRow className="ion-align-items-center ion-justify-content-center">
        <IonCol size="6" className="ion-align-self-center">
          <p className="c-dark-grey ion-no-margin">Script:</p>
        </IonCol>
        <IonCol size="6" className="ion-align-self-center">
          {showScript ? (
            <IonButton
              onClick={() => setShowScript(false)}
              className="ion-float-right translation-btn"
              color="dark"
              mode="ios"
              shape="round"
              size="small"
              fill="outline"
              id="script-label"
            >
              Hide
            </IonButton>
          ) : (
            <IonButton
              onClick={() => setShowScript(true)}
              className="ion-float-right translation-btn"
              color="dark"
              mode="ios"
              fill="solid"
              shape="round"
              size="small"
            >
              Show
            </IonButton>
          )}
        </IonCol>
      </IonRow>
      {showScript && (
        <IonRow className="ion-margin-bottom ion-align-items-center ion-justify-content-center">
          <IonCol size="12" className="ion-align-self-center">
            <p className="ion-no-margin" id="subTitle">
              {script}
            </p>
          </IonCol>
        </IonRow>
      )}
    </>
  )
}
