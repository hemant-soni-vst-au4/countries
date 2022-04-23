import * as React from 'react'
import {IonCol, IonRow} from '@ionic/react'
import {useLessonStore} from './useLessonStore'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'
import {NextButton} from './NextButton'
import {ActionBar} from './ActionBar'
import {useCurrentLesson} from './lessonHooks'

export function LessonStepListen({Footer}) {
  const lesson = useCurrentLesson()
  const [sceneIdx, setSceneIdx] = React.useState(0)
  const [isEnd, setIsEnd] = React.useState(false)
  const moveNext = useLessonStore((state) => state.moveNext)
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const play = useLessonStore((state) => state.play)
  const playerState = useLessonStore((state) => state.playerState)
  const setOverlay = useLessonStore((state) => state.setOverlay)

  const scene = lesson.scenes[sceneIdx]

  React.useEffect(() => {
    ytPlayer.seekTo(scene.start, true)
    ytPlayer.playVideo()
    // setOverlay(<p>Scene {sceneIdx + 1}</p>)
    setTimeout(() => {
      setOverlay(null)
    }, 500)
  }, [scene])

  React.useEffect(() => {
    if (playerState === PlayerStates.PLAYING) {
      const itv = setInterval(() => {
        const cur = ytPlayer.getCurrentTime()
        if (cur > scene.end) {
          clearInterval(itv)
          const lastIdx = lesson.scenes.length - 1
          if (sceneIdx < lastIdx) {
            ytPlayer.seekTo(scene.start, true)
            setSceneIdx(sceneIdx + 1)
          } else {
            ytPlayer.pauseVideo()
            setIsEnd(true)
          }
        }
      }, 100)
      return () => clearInterval(itv)
    }
  }, [playerState, scene, sceneIdx])

  return (
    <>
      <ActionBar
        onPlayClick={() => {
          if (isEnd) {
            ytPlayer.seekTo(lesson.scenes[0].start, true)
            setSceneIdx(0)
            setIsEnd(false)
          } else {
            play()
          }
        }}
      />

      <IonRow className="listen ion-align-items-center ion-justify-content-center">
        <IonCol
          sizeXs="12"
          sizeSm="12"
          sizeMd="10"
          sizeLg="8"
          sizeXl="8"
          className="mt-100 ion-align-self-center"
        >
          <h5 className="ion-text-center">
            First, listen carefully to the whole dialogue to see how much you can
            understand.
          </h5>
        </IonCol>
      </IonRow>
      <Footer>
        <NextButton onClick={moveNext} />
      </Footer>
    </>
  )
}
