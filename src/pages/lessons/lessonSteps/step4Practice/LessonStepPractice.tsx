import {IonCol, IonRow, IonText} from '@ionic/react'
import clsx from 'clsx'
import {range} from 'lodash'
import React, {useEffect, useMemo, useState} from 'react'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'
import {ActionBar} from '../ActionBar'
import {NextButton} from '../NextButton'
import WebRecordingView from './RecordingView'
import {useLessonStore} from '../useLessonStore'
import {Capacitor, Plugins} from '@capacitor/core'
// import {useStore} from 'src/reactapp/useStore'
import IosRecordingView from './IosRecordingView'
import {ScriptView} from './ScriptView'
import {PracticeContext} from './PracticeContext'
import create from 'zustand'
import AndroidRecordingView from './AndroidRecordingView'
const {Device} = Plugins


function RecordingView() {
  const platform = Capacitor.getPlatform()
  if (platform === 'web') {
    return <WebRecordingView />
  } else if (platform === 'ios') {
    return <IosRecordingView />
  } else if (platform === 'android') {
    return <AndroidRecordingView />
  }
}

function usePracticeState() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  return {
    isRecording,
    isPlaying,
    setIsRecording,
    setIsPlaying,
  }
}

export function LessonStepPractice({Footer}) {
  const repeat = 3 // 10
  const [count, setCount] = useState(0)
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  const moveNext = useLessonStore((state) => state.moveNext)
  const setOverlay = useLessonStore((state) => state.setOverlay)
  const playerState = useLessonStore((state) => state.playerState)
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const lesson = useLessonStore((state) => state.lesson)
  const practiceState = usePracticeState()

  const scene = lesson.scenes[sceneIdx]

  useEffect(() => {
    ytPlayer.seekTo(scene.start, true)
    ytPlayer.playVideo()
  }, [sceneIdx])

  useEffect(() => {
    if (playerState === PlayerStates.PLAYING) {
      setOverlay(null)
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
      setOverlay(<h2>Repeat what you just heard.</h2>)
      let to = setTimeout(() => {
        setOverlay(null)
        if (practiceState.isPlaying || practiceState.isRecording) {
          return
        }
        if (count < 3) {
          ytPlayer.seekTo(scene.start, true)
          ytPlayer.playVideo()
        }
      }, 8000)
      return () => clearTimeout(to)
    }
    // } else {
    //   ytPlayer.seekTo(scene.start, true)
    //   ytPlayer.playVideo()
    // }
  }, [count, practiceState.isRecording, practiceState.isPlaying])

  const counts = range(repeat).map((i) => ({
    num: i + 1,
    done: i < count,
  }))

  return (
    <PracticeContext.Provider value={practiceState}>
      <ActionBar />
      <div className="practice ">
        <div
          className="ion-text-center ion-align-self-center shadowing"
          id="scene-iteration"
        >
          {counts.map((c) => (
            <IonText key={c.num} className={clsx('lesson-loop', c.done && 'complete')}>
              <span className={clsx(c.done && 'c-red')}>{c.num}</span>
            </IonText>
          ))}
        </div>

        <h5>1 ) Shadow (repeat what you hear)</h5>

        <ScriptView />
        <IonRow className="ion-margin-top ion-align-items-center ion-justify-content-center">
          <IonCol size="12" className="ion-align-self-center">
            <h5>2 ) Record your speech and get it evaluated</h5>
          </IonCol>
        </IonRow>
        <RecordingView />
      </div>

      <Footer>
        <NextButton onClick={() => moveNext()} />
      </Footer>
    </PracticeContext.Provider>
  )
}
