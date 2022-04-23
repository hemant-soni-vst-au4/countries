import * as React from 'react'
import {IonIcon, IonItem, IonLabel, useIonPopover} from '@ionic/react'
import {caretDown} from 'ionicons/icons'
import {useLessonStore} from './useLessonStore'
import clsx from 'clsx'

function Menus({onDissmis}) {
  const lesson = useLessonStore((state) => state.lesson)
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  const moveScene = useLessonStore((state) => state.moveScene)

  function handleSceneChange(newScene: number) {
    moveScene(newScene)
    onDissmis()
  }

  return (
    <>
      {lesson.scenes.map((_, i) => (
        <IonItem
        style={{cursor: 'pointer'}}
          key={i}
          lines="none"
          onClick={() => handleSceneChange(i)}
          
        >
          <IonLabel className={clsx(i === sceneIdx && 'c-red')}>{i + 1}</IonLabel>
        </IonItem>
      ))}
    </>
  )
}

export function SceneNavMenu() {
  const lesson = useLessonStore((state) => state.lesson)
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  const step = useLessonStore((state) => state.step)
  const [presentMenu, dissmis] = useIonPopover(Menus, {
    onDissmis: () => dissmis(),
  })

  if (step < 2 || step > 4) {
    return null
  }

  const scenesLength = lesson.scenes.length

  return (
    <div id="lesson-scenes">
      
      <div
      
        
      >
        <span
        onClick={(e) => {
          presentMenu({
            cssClass: 'lessonScenesPopover',
            mode: 'md',
            event: e.nativeEvent,
          })
        }}>{sceneIdx + 1} / {scenesLength} Scenes{' '}</span>
        
        <IonIcon className="steps-scenes-icon" icon={caretDown}></IonIcon>
      </div>
     </div>
  )
}
