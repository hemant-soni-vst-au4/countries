import {IonCol, IonItem, IonRow, IonText, IonTextarea, isPlatform} from '@ionic/react'
import React, {useEffect, useState} from 'react'
import {useLessonStore} from './useLessonStore'
import {range} from 'lodash'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'
import {NextButton} from './NextButton'
import {ActionBar} from './ActionBar'
import clsx from 'clsx'
import {Plugins} from '@capacitor/core'
import {currentLessonIdVar, dictationsVar} from '../../../apollo/apollo-client'
import {
  useGetDictationQuery,
  useGetLessonDeatilQuery,
  useSetLessonCompletedMutation,
} from '../../../schema/types-and-hooks'
import {useCurrentLesson} from './lessonHooks'
import {useHelpGuide} from '../../../hooks/useHelpGuide'
import {storageHelper} from '../../../utils/storageHelper'
const {Keyboard} = Plugins

function useHelpDictationGuide() {
  return useHelpGuide('isHelpScreenForDictationStepDone', [
    {
      element: '#lesson-steps',
      popover: {
        title: 'Step navigation',
        description: 'Move easily among steps',
        position: 'right-center',
      },
    },
    {
      element: '#lesson-scenes',
      popover: {
        title: 'Scene navigation',
        description: 'Move easily among scenes',
        position: 'top-right',
      },
    },
    {
      element: '#scene-iteration',
      popover: {
        title: 'Automatic replay',
        description:
          "Clip repeats 10 times automatically while you're typing. You can replay as many times as you need",
        position: 'top-center',
      },
    },
    {
      element: '#dictation-textarea-headline',
      popover: {
        title: 'Dictation',
        description:
          '1-2 sentences will be played at a time. Type as much as you can. In the next step, your answer will be reviewed.',
        position: 'top-center',
      },
    },
  ])
}

function PlayCounts() {
  const repeat = 10
  const [count, setCount] = useState(0)
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  const lesson = useCurrentLesson()

  const setOverlay = useLessonStore((state) => state.setOverlay)
  const playerState = useLessonStore((state) => state.playerState)
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const {showHelpGuide} = useHelpDictationGuide()

  const scene = lesson.scenes[sceneIdx]

  useEffect(() => {
    showHelpGuide().then(() => {
      ytPlayer.seekTo(scene.start, true)
      ytPlayer.playVideo()
    })
  }, [sceneIdx])

  useEffect(() => {
    if (playerState === PlayerStates.PLAYING) {
      const itv = setInterval(() => {
        const cur = ytPlayer.getCurrentTime()
        if (cur > scene.end) {
          // console.log('end')
          clearInterval(itv)
          ytPlayer.pauseVideo()
          ytPlayer.seekTo(scene.start, true)
          setCount((c) => Math.min(c + 1, repeat))
        }
      }, 100)
      return () => clearInterval(itv)
    }
  }, [playerState])

  useEffect(() => {
    if (count === 1) {
      setOverlay(<h2>Write down what you heard.</h2>)
      const it = setTimeout(() => {
        setOverlay(null)
        ytPlayer.seekTo(scene.start, true)
        ytPlayer.playVideo()
      }, 2000)
      return () => {
        clearTimeout(it)
        setOverlay(null)
      }
    } else if (count > 1) {
      ytPlayer.seekTo(scene.start, true)
      ytPlayer.playVideo()
    }
  }, [count])

  const counts = range(repeat).map((i) => ({
    num: i + 1,
    done: i < count,
  }))

  return (
    <>
      {counts.map((c) => (
        <IonText key={c.num} className={clsx('lesson-loop', c.done && 'complete')}>
          <span className={clsx(c.done && 'c-red')}
          style={{color: clsx(c.done && "#e22d2d")}}
          >{c.num}</span>
        </IonText>
      ))}
    </>
  )
}

const replaceApostrophe = (str: string) =>
  str
    .replace('”', '"')
    .replace('“', '"')
    .replace('’', "'")
    .replace('‘', "'")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
// .replace(/[\u2013\u2014]/g, '-')
// .replace(/[\u2026]/g, '...')

function DictationTextarea() {
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  const [value, setValue] = useState('')
  const {loading} = useGetDictationQuery({
    variables: {
      sceneIdx: sceneIdx,
    },
    onCompleted: (data) => {
      setValue(data.dictation)
    },
  })

  function handleFocus() {
    if (isPlatform('capacitor')) {
      Keyboard.show()
    }
  }

  function setDictatonValue() {
    const old = dictationsVar()
    const lessonId = currentLessonIdVar()
    const key = `${lessonId}:${sceneIdx}`
    dictationsVar({
      ...old,
      [key]: replaceApostrophe(value),
    })
  }

  if (loading) {
    return null
  }

  return (
    <IonItem lines="none" className="dictation-textarea ion-margin-top">
      <IonTextarea
        className="ion-padding-start"
        color="danger"
        rows={5}
        placeholder="Write here..."
        onIonFocus={handleFocus}
        onIonBlur={() => {
          setDictatonValue()
        }}
        value={value}
        onIonChange={(e) => setValue(e.detail.value)}
      ></IonTextarea>
    </IonItem>
  )
}

export function LessonStepDictation({Footer}) {
  const [isSaving, setIsSaving] = React.useState(false)
  const moveNext = useLessonStore((state) => state.moveNext)
  const focusRef = React.useRef<HTMLDivElement>()
  const lesson = useCurrentLesson()
  const [setLessonCompleted] = useSetLessonCompletedMutation({
    onCompleted: (data) => {
      storageHelper.removeNativeStorage('leftOfData')
    },
  })
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  // console.log("lesson: ", lesson.scenes.length, sceneIdx)

  React.useEffect(() => {
    if(sceneIdx+1 === lesson.scenes.length){
    if (!lesson.isCompleted) {
      setLessonCompleted({variables: {lessonId: lesson._id}})
    }
  }
  }, [lesson])

  return (
    <>
      <ActionBar />
      <div className="dictation">
        <div
          className="ion-text-center ion-padding ion-align-self-center"
          id="scene-iteration"
        >
          <PlayCounts />
        </div>

        <h5 id="dictation-textarea-headline" className="ion-no-margin">
          A couple of sentences will be played at a time. Type everything you hear.
        </h5>

        <DictationTextarea />
        <div ref={focusRef}></div>
      </div>
      <Footer>
        <NextButton
          disabled={isSaving}
          onClick={() => {
            setIsSaving(true)
            focusRef.current.focus()
            setTimeout(() => {
              moveNext()
            }, 200)
          }}
        />
      </Footer>
    </>
  )
}
