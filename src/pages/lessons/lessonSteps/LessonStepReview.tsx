import React, {useEffect, useState} from 'react'
import {IonText} from '@ionic/react'
import clsx from 'clsx'
import {range} from 'lodash'
import {useGetDictationQuery} from '../../../schema/types-and-hooks'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'
import {diffText} from './diffScript'
import {ActionBar} from './ActionBar'
import {useCurrentLesson} from './lessonHooks'
import {NextButton} from './NextButton'
import ReviewScript from './ReviewScript'
import {useLessonStore} from './useLessonStore'
import {useHelpGuide} from '../../../hooks/useHelpGuide'


function useHelpReviewGuide() {
  return useHelpGuide('isHelpScreenForReviewStepDone', [
    {
      element: '#translation',
      popover: {
        title: 'See translation and tips',
        description: 'Check your translation in your native language.',
        position: 'top-right',
      },
    },
  ])
}

export function LessonStepReview({Footer}) {
  const repeat = 3 // 10
  const [count, setCount] = useState(0)
  const lesson = useCurrentLesson()
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  const moveNext = useLessonStore((state) => state.moveNext)
  const playerState = useLessonStore((state) => state.playerState)
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const {showHelpGuide} = useHelpReviewGuide()

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
          console.log('end')
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
    if (count > 0) {
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
      <ActionBar />
      <div className="reviewing ion-padding">
        <div className="ion-text-center  ion-align-self-center">
          {counts.map((c) => (
            <IonText key={c.num} className={clsx('lesson-loop', c.done && 'complete')}>
              <span className={clsx(c.done && 'c-red')}>{c.num}</span>
            </IonText>
          ))}
        </div>
        <h5>Analyze what you missed</h5>
        <ReviewScript />
        <DiffView />
      </div>

      <Footer>
        <NextButton onClick={() => moveNext()} />
      </Footer>
    </>
  )
}

function DiffView() {
  const lesson = useCurrentLesson()
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  const {data} = useGetDictationQuery({
    variables: {
      sceneIdx,
    },
  })

  const scene = lesson.scenes[sceneIdx]
  const script = scene.langs.En.txt
  const rs = diffText(script, data.dictation)

  return (
    <>
      <div className="ion-margin-top">
        <div style={{color: '#747474'}}>What you typed:</div>
        <div
          // border="1px solid #ddd" borderRadius={3} minH={6} p={1}
          className="review-diffs"
        >
          {rs.map(({value, added, removed}, i) => (
            <div
              key={i}
              style={{
                display: 'inline',
                color: removed ? '#f22' : '#333',
                textDecoration: added ? 'line-through' : 'none',
              }}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
