import React from 'react'
import ReactPlayer from 'react-player'
import {Lesson} from '../../../schema/types-and-hooks'
import {YouTubePlayer} from 'youtube-player/dist/types'
import create from 'zustand'
import {storageHelper} from '../../../utils/storageHelper'

export interface LangScript {
  txt: string
  tip?: string
}

export interface Scene {
  start: number
  end: number
  langs: {
    En: LangScript
    Ko?: LangScript
    Po?: LangScript
    Sp?: LangScript
    Vi?: LangScript
  }
}
// export interface Lesson {
//   lessonName: string
//   youtubeId: string
//   lessonId: string
//   subLessonId: string
//   scenes: Scene[]
// }
type StudyRecord = {
  dictationText
}

export type LessonState = {
  lesson: Lesson | null
  loading: boolean
  setLoading: (loading) => void
  init: () => void
  setLesson: (lesson: Lesson) => void
  sceneIdx: number
  step: number
  moveNext: () => void
  moveStep: (step: number) => void
  moveScene: (sceneIdx: number) => void
  dictationText: string
  studyRecords: StudyRecord[]
  setDictationText: (sceneIdx: number, text: string) => void
  overlay: JSX.Element | string
  setOverlay: (overlay: JSX.Element | string) => void
  //
  start: number
  end: number | null
  player: ReactPlayer | null
  ytPlayer: YouTubePlayer
  playerState: number
  isPlaying: boolean
  setPlayer: (player: YouTubePlayer) => void
  setPlayerState: (state: number) => void
  play: (start?: number, end?: number) => void
  stop: (seek?: number) => void
  rewind: (sec: number) => void
  scrollTop: number
  setScrollTop: (scrollTop: number) => void
}

const SceneChangeOverlay = ({scnenNo, scenesLength}) => {
  return (
    <div style={{textAlign: 'center', fontWeight: 400, textShadow: '0px 0px 4px black'}}>
      <h1 style={{fontSize: '3rem', opacity: 0.8}}>
        {scnenNo} of {scenesLength}
        <small>scenes</small>
      </h1>
    </div>
  )
}

const StepMap = {
  Listen: 1,
  Dictation: 2,
  Review: 3,
  Practice: 4,
}

async function getLeftData(lesson: Lesson) {
  const data = await storageHelper.getNativeStorage('leftOfData')
  const leftOf = data?.data
  if (!leftOf || lesson._id !== leftOf.lessonID) return null

  if (leftOf.version === 2) {
    return {
      sceneIdx: leftOf.sceneIdx,
      step: leftOf.step,
    }
  } else {
    const sceneIdx = lesson.scenes.findIndex(
      (scene) => scene.start === leftOf.selectedLessonScene.start,
    )
    if (sceneIdx < 0) return null
    const step = StepMap[leftOf.selectedLessonStep._id]
    if (!step) return null
    return {
      sceneIdx,
      step,
    }
  }
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lesson: null,
  loading: true,
  start: 0,
  end: null,
  setLoading: (loading) => set({loading}),
  init: () =>
    set({
      lesson: null,
      loading: true,
      studyRecords: null,
      step: 1,
      sceneIdx: 0,
      ytPlayer: null,
    }),
  setLesson: async (lesson: Lesson) => {
    const left = await getLeftData(lesson)

    set({
      lesson,
      loading: false,
      studyRecords: lesson.scenes.map((v) => ({dictationText: ''})),
      // step: 5,
      step: left ? left.step : 1,
      sceneIdx: left ? left.sceneIdx : 0,
      ytPlayer: null,
    })
  },
  sceneIdx: 0,
  step: 5,
  moveNext: () => {
    const {step, ytPlayer, sceneIdx, lesson, setOverlay} = get()
    ytPlayer.pauseVideo()
    const scene = lesson.scenes[sceneIdx]
    ytPlayer.seekTo(scene.start, true)

    // set({isPlaying: false})
    setTimeout(() => {
      if (step === 4) {
        const nextSceneIdx = sceneIdx + 1
        // console.log(nextSceneIdx, lesson.scenes.length)
        if (nextSceneIdx > lesson.scenes.length - 1) {
          set({step: 5, sceneIdx: 0})
        } else {
          setOverlay(
            <SceneChangeOverlay
              scnenNo={nextSceneIdx + 1}
              scenesLength={lesson.scenes.length}
            />,
          )
          setTimeout(() => {
            setOverlay(null)
            set({step: 2, sceneIdx: nextSceneIdx})
          }, 2000)
        }
      } else if (step === 1) {
        set({step: step + 1, sceneIdx: 0})
      } else if (step <= 3) {
        set({step: step + 1})
      } else {
        set({step: 1})
      }
    }, 1)
  },
  moveStep: (step) => {
    set({step: step, isPlaying: false})
  },
  moveScene: (sceneIdx) => {
    const {lesson, ytPlayer, setOverlay} = get()
    ytPlayer.pauseVideo()
    const scene = lesson.scenes[sceneIdx]
    ytPlayer.seekTo(scene.start, true)
    setOverlay(
      <SceneChangeOverlay scnenNo={sceneIdx + 1} scenesLength={lesson.scenes.length} />,
    )
    setTimeout(() => {
      setOverlay(null)
      set({step: 2, sceneIdx: sceneIdx})
    }, 2000)
  },
  studyRecords: null,
  dictationText: '',
  setDictationText: (sceneIdx, text) => {
    set((state) => ({
      studyRecords: {
        ...state.studyRecords,
        [sceneIdx]: {dictationText: text},
      },
    }))
  },
  overlay: null,
  setOverlay: (overlay) => set({overlay}),
  player: null,
  ytPlayer: null,
  playerState: null,
  isPlaying: false,
  setPlayer: (player) => set({ytPlayer: player}),
  setPlayerState: (state: number) => set({playerState: state}),
  play: (start, end) => {
    // console.log('play', {start, end})
    const {player, isPlaying, ytPlayer} = get()
    // console.log({isPlaying})
    if ((start === 0 || start) && end) {
      player.seekTo(start, 'seconds')
      ytPlayer.seekTo(start, true)
      set({start, end})
      ytPlayer.playVideo()
    } else {
      const prevStart = get().start
      const prevEnd = get().end
      if (prevEnd && player.getCurrentTime() > prevEnd) {
        // player.seekTo(prevStart || 0, 'seconds')
        ytPlayer.seekTo(prevStart, true)
      }
      ytPlayer.playVideo()
      // set({isPlaying: true})
    }
  },
  stop: (seek) => {
    const {ytPlayer} = get()
    ytPlayer.pauseVideo()
    if (seek) {
      ytPlayer.seekTo(Math.floor(seek), true)
    }
  },
  rewind: (sec) => {
    const {ytPlayer} = get()
    const cur = ytPlayer.getCurrentTime()
    ytPlayer.seekTo(cur - sec, true)
  },
  scrollTop: 0,
  setScrollTop: (scrollTop) => set({scrollTop}),
}))

useLessonStore.subscribe<LessonState>(
  (state) => {
    if (state.lesson) {
      if (state.step === 5) {
        storageHelper.removeNativeStorage('leftOfData')
      } else {
        storageHelper.setNativeStorage('leftOfData', {
          lessonID: state.lesson._id,
          version: 2,
          sceneIdx: state.sceneIdx,
          step: state.step,
        })
      }
    }
  },
  (state) => state,
  (state, newState) => {
    return state.sceneIdx === newState.sceneIdx && state.step === newState.step
  },
)
