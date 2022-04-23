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
import {setRecord, setRecordSTT, useRecordAndroid} from './useRecordAndroid'
import {AndroidPermissions} from '@ionic-native/android-permissions'
import {zip} from 'lodash'

interface AudioMedia {
  audioFile: MediaObject
  fileName: string
}

//@ts-ignore
async function checkMicrophonePermission(androidPermissions: AndroidPermissions) {
  const permissions = [
    androidPermissions.PERMISSION.RECORD_AUDIO,
    androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
    androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
  ]
  const results = await Promise.all(
    permissions.map((p) => androidPermissions.checkPermission(p)),
  )
  const hasPermissions = results.map((r) => r.hasPermission)
  const reqPerms = zip(hasPermissions, permissions)
    .filter(([hasPerm]) => !hasPerm)
    .map(([_, perm]) => perm)

  console.log(reqPerms)

  if (reqPerms.length > 0) {
    try {
      const reqRes = await androidPermissions.requestPermissions(reqPerms)

      console.log('reqRes', reqRes.hasPermission)
      if (!reqRes.hasPermission) {
        return false
      }
    } catch (err) {
      console.log('err reqPerm', err)
      return false
    }
  }

  return true
}

export default function AndroidRecordingView() {
  const {setIsPlaying, setIsRecording} = usePracticeContext()
  const [audioMedia, setAudioMedia] = React.useState<AudioMedia>()
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  const [audioPlaying, setAudioPaying] = React.useState(false)
  const {data} = useGetRecordsQuery({variables: {sceneIdx}})

  //@ts-ignore
  const diagnostic = React.useMemo(() => new Diagnostic(), [])
  //@ts-ignore
  const androidPermissions = React.useMemo(() => new AndroidPermissions(), [])
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const [present] = useIonAlert()

  const {status, startRecording, stopRecording} = useRecordAndroid({
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
      file.externalDataDirectory.replace(/^file:\/\//, '') + fileName,
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

    const status = await checkMicrophonePermission(androidPermissions)
    if (!status) {
      return present('No Mic Permisson')
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
