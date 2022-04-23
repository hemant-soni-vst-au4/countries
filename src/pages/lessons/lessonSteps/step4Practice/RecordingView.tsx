import React from 'react'
import {useGetRecordsQuery} from '../../../../schema/types-and-hooks'
import {useLessonStore} from '../useLessonStore'
import {usePracticeContext} from './PracticeContext'
import {RecordButton} from './RecordButton'
import {RecordResultItem, RecordView} from './RecordView'
import {setRecord, setRecordSTT, useRecordRtc} from './useRecordRtc'

export default function RecordingView() {
  const audioRef = React.useRef<HTMLAudioElement>()
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const [audioPlaying, setAudioPaying] = React.useState(false)
  const {data} = useGetRecordsQuery({variables: {sceneIdx}})
  const practiceState = usePracticeContext()

  const {status, startRecording, stopRecording, mediaBlobUrl} = useRecordRtc({
    onStop: (result) => {
      console.log('onStop')
      setRecord(sceneIdx, {...result, stt: null})
    },
  })

  async function handleAudioPlay(url) {
    const audioEl = audioRef.current
    if (audioEl) {
      ytPlayer.pauseVideo()
      audioEl.src = url
      audioEl.play()

      practiceState.setIsPlaying(true)
      setAudioPaying(true)
    }
  }

  async function handleAudioStop() {
    const audioEl = audioRef.current
    if (audioEl) {
      audioEl.pause()
      audioEl.currentTime = 0
      practiceState.setIsPlaying(false)
    }
  }

  async function handleRecordStart() {
    ytPlayer.pauseVideo()
    handleAudioStop()
    practiceState.setIsRecording(true)
    startRecording()
  }
  async function handleRecordStop() {
    stopRecording()
    practiceState.setIsRecording(false)
  }

  return (
    <>
      <audio
        ref={audioRef}
        hidden
        onPlaying={() => {
          setAudioPaying(true)
        }}
        onPause={() => {
          setAudioPaying(false)
        }}
        onEnded={() => {
          setAudioPaying(false)
        }}
      />

      {audioRef.current && (
        <>
          {data.records.map((r, i) =>
            r.stt ? (
              <RecordResultItem
                key={r.audioUrl}
                data={r.stt}
                loading={false}
                error={r.stt.error}
                index={i}
                isPlaying={
                  !audioRef.current.paused &&
                  audioRef.current.src === r.audioUrl &&
                  audioPlaying
                }
                onPlay={() => {
                  handleAudioPlay(r.audioUrl)
                }}
                onStop={handleAudioStop}
              />
            ) : (
              <RecordView
                key={r.audioUrl}
                audioAsBase64={r.audioAsBase64}
                sampleRate={r.sampleRate}
                index={i}
                isPlaying={
                  !audioRef.current.paused &&
                  audioRef.current.src === r.audioUrl &&
                  audioPlaying
                }
                onPlay={() => {
                  handleAudioPlay(r.audioUrl)
                }}
                onStop={handleAudioStop}
                onCompleted={(data) => {
                  console.log('oncomplt', {data})
                  setRecordSTT(sceneIdx, i, data)
                }}
              />
            ),
          )}
        </>
      )}

      <RecordButton
        status={status}
        onRecordStart={handleRecordStart}
        onRecordStop={handleRecordStop}
      />
    </>
  )
}
