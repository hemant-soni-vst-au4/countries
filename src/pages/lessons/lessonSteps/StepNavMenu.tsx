import * as React from 'react'
import {IonIcon, IonItem, IonLabel, useIonPopover} from '@ionic/react'
import {caretDown} from 'ionicons/icons'
import {useLessonStore} from './useLessonStore'
import clsx from 'clsx'

const stepOpts = [
  {step: 1, label: '1 Listen'},
  {step: 2, label: '2 Dictation'},
  {step: 3, label: '3 Review'},
  {step: 4, label: '4 Pracitce'},
]

function Menus({onDissmis, step}) {
  const moveStep = useLessonStore((state) => state.moveStep)
  function handleStepChange(newStep: number) {
    moveStep(newStep)
    onDissmis()
  }

  return (
    <>
      {stepOpts.map((opt) => (
        <IonItem
        style={{cursor: 'pointer'}}
        key={opt.step}  lines="none"  onClick={() => handleStepChange(opt.step)}>
          <IonLabel className={clsx(step === opt.step && 'c-red')}
          >{opt.label}</IonLabel>
        </IonItem>
      ))}
    </>
  )
}

export function StepNavMenu() {
  const step = useLessonStore((state) => state.step)
  const [presentMenu, dissmis] = useIonPopover(Menus, {
    step,
    onDissmis: () => dissmis(),
  })

  if (step < 2 || step > 4) {
    return null
  }

  return (
    <div
      onClick={(e) => {
        presentMenu({
          cssClass: 'lessonStepsPopover',
          mode: 'md',
          event: e.nativeEvent,
        })
      }}
    >
      <IonIcon className="steps-scenes-icon" icon={caretDown}></IonIcon> Steps
    </div>
  )
}
