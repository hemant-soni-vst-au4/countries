import React from 'react'
import {Diagnostic} from '@ionic-native/diagnostic'
import {File} from '@ionic-native/file'
import {Media, MediaObject} from '@ionic-native/media'
import {useIonAlert} from '@ionic/react'
import {useGetRecordsQuery} from '../../../../schema/types-and-hooks'
import {useLessonStore} from '../useLessonStore'
import {usePracticeContext} from './PracticeContext'
import {RecordButton} from './RecordButton'
import {RecordResultItem, RecordView} from './RecordView'
import {setRecord, setRecordSTT, useRecordIos} from './useRecordIos'

interface AudioMedia {
  audioFile: MediaObject
  fileName: string
}

export default function IosRecordingView() {
  const {setIsPlaying, setIsRecording} = usePracticeContext()
  const [audioMedia, setAudioMedia] = React.useState<AudioMedia>()
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  const [audioPlaying, setAudioPaying] = React.useState(false)
  const {data} = useGetRecordsQuery({variables: {sceneIdx}})
  //@ts-ignore
  const diagnostic = React.useMemo(() => new Diagnostic(), [])
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const [present] = useIonAlert()

  const {status, startRecording, stopRecording} = useRecordIos({
    onStop: (result) => {
      console.log('onStop')
      setRecord(sceneIdx, {...result, stt: null})
    },
  })

  async function handleAudioPlay(fileName: string) {
    ytPlayer.pauseVideo()
    handleAudioStop()
    //@ts-ignore
    const media = new Media()
    //@ts-ignore
    const file = new File()
    const audioFile = media.create(
      file.tempDirectory.replace(/^file:\/\//, '') + fileName,
    )
    audioFile.play()
    setAudioMedia({audioFile, fileName})
    audioFile.onStatusUpdate.subscribe((status) => {
      console.log({status})
      if (status === media.MEDIA_STOPPED) {
        handleAudioStop()
      }
    })

    setAudioPaying(true)
    setIsPlaying(true)
  }

  async function handleAudioStop() {
    if (audioMedia) {
      const {audioFile, fileName} = audioMedia
      audioFile.stop()
      audioFile.release()
      setAudioMedia(null)
    }
    setAudioPaying(false)
    setIsPlaying(false)
  }

  async function handleRecordStart() {
    ytPlayer.pauseVideo()
    handleAudioStop()

    const status = await diagnostic.getMicrophoneAuthorizationStatus()
    if (status === 'authorized') {
      // this.startIosRecording()
    } else if (status === 'not_determined') {
      const reqStatus = await diagnostic.requestMicrophoneAuthorization()
      if (reqStatus === 'authorized') {
        // this.startIosRecording()
      } else {
        // this.recordingAction = 'Try Again'
        // this.recording = false
        // this.recordingPrepare = false
        present('No Mic Permisson')
      }
    } else {
      present('No Mic Permisson')
      // this.recordingAction = 'Try Again'
      // this.recording = false
      // this.recordingPrepare = false
      // this.micPermissionAlert()
    }

    startRecording()
    setIsRecording(true)
  }
  async function handleRecordStop() {
    stopRecording()
    setIsRecording(false)
  }

  return (
    <>
      {data.records.map((r, i) =>
        r.stt ? (
          <RecordResultItem
            key={r.audioUrl}
            data={r.stt}
            loading={false}
            error={r.stt.error}
            index={i}
            isPlaying={audioMedia?.fileName === r.audioUrl && audioPlaying}
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
            isPlaying={audioMedia?.fileName === r.audioUrl && audioPlaying}
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

      <RecordButton
        status={status}
        onRecordStart={handleRecordStart}
        onRecordStop={handleRecordStop}
      />
    </>
  )
}
