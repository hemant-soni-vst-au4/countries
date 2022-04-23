import React from 'react'
import * as RecordRTC from 'recordrtc'
import {currentLessonIdVar, recordsVar} from '../../../../apollo/apollo-client'
import {useLessonStore} from '../useLessonStore'

function getAudioContext() {
  // @ts-ignore
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (AudioContext) {
    return new AudioContext()
  }
}
const sampleRate = getAudioContext().sampleRate || 44100

const RECORD_TIMEOUT_MS = 20 * 1000

export function useRecordRtc({onStop}) {
  const [status, setStatus] = React.useState('idle')
  const [mediaBlobUrl, setMediaBlobUrl] = React.useState<string | null>(null)
  const [recorder, setRecorder] = React.useState<any>()
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const stopRecording = React.useCallback(async () => {
    try {
      await recorder.stopRecording()
      const blob = await recorder.getBlob()
      const sampleRate = (await recorder.getInternalRecorder()).sampleRate
      const audioAsBase64 = (await recorder.getDataURL()).replace(/^.+base64,/, '')
      const audioUrl = URL.createObjectURL(blob)
      console.log({sampleRate, audioAsBase64, audioUrl})
      setStatus('stopped')
      setMediaBlobUrl(audioUrl)
      onStop &&
        onStop({
          audioAsBase64,
          audioUrl,
          sampleRate,
        })
    } catch (err) {
      console.log({err})
    }
  }, [recorder, setStatus, setMediaBlobUrl, onStop])

  // async function stopRecording() {
  //   try {
  //     await recorder.stopRecording()
  //     const blob = await recorder.getBlob()
  //     const sampleRate = (await recorder.getInternalRecorder()).sampleRate
  //     const audioAsBase64 = (await recorder.getDataURL()).replace(/^.+base64,/, '')
  //     const audioUrl = URL.createObjectURL(blob)
  //     console.log({sampleRate, audioAsBase64, audioUrl})
  //     setStatus('stopped')
  //     setMediaBlobUrl(audioUrl)
  //     onStop &&
  //       onStop({
  //         audioAsBase64,
  //         audioUrl,
  //         sampleRate,
  //       })
  //   } catch (err) {
  //     console.log({err})
  //   }
  // }

  async function startRecording() {
    ytPlayer.pauseVideo()
    const stream = await navigator.mediaDevices.getUserMedia({audio: true})
    const recorder = new RecordRTC.RecordRTCPromisesHandler(stream, {
      type: 'audio',
      mimeType: 'audio/webm',
      recorderType: RecordRTC.StereoAudioRecorder,
      sampleRate: sampleRate, // RecordRTC: 22050 and 96000 , Google STT: 8000 - 48000
      numberOfAudioChannels: 1,
    })
    recorder.startRecording()
    setRecorder(recorder)
    setStatus('recording')
  }

  React.useEffect(() => {
    if (status === 'recording') {
      const to = setTimeout(() => {
        stopRecording()
      }, RECORD_TIMEOUT_MS)
      return () => clearTimeout(to)
    }
  }, [status, stopRecording])

  return {
    status,
    sampleRate,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  }
}

export function setRecordSTT(sceneIdx: number, arrIdx: number, result) {
  const oldVar = recordsVar()
  const lessonId = currentLessonIdVar()
  const key = `${lessonId}:${sceneIdx}`
  const rs = oldVar[key] || []
  const newRs = rs.map((record, i) => {
    if (i === arrIdx) {
      return {
        ...record,
        stt: result,
      }
    }
    return record
  })

  recordsVar({...oldVar, [key]: newRs})
}

export function setRecord(sceneIdx: number, record) {
  const oldVar = recordsVar()
  const lessonId = currentLessonIdVar()
  const key = `${lessonId}:${sceneIdx}`
  const rs = oldVar[key] || []

  recordsVar({...oldVar, [key]: [record, ...rs.slice(0, 2)]})
  rs.slice(2).map((r) => {
    URL.revokeObjectURL(r.audioUrl)
  })
}
