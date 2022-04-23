import React from 'react'
import {currentLessonIdVar, recordsVar} from '../../../../apollo/apollo-client'
import {File} from '@ionic-native/file'
import {Media, MediaObject} from '@ionic-native/media'
import {Plugins} from '@capacitor/core'
const {Filesystem} = Plugins

const iosSampleRate = 16000

export function useRecordIos({onStop}) {
  const [status, setStatus] = React.useState('idle')
  const [fileName, setFileName] = React.useState<string>()
  const [audioFile, setAudioFile] = React.useState<MediaObject>()

  async function stopRecording() {
    try {
      audioFile.stopRecord()
      audioFile.release()
      //@ts-ignore
      const file = new File()

      let data = await Filesystem.readFile({
        path: file.tempDirectory + fileName,
      })
      if (data) {
        console.log({data})
      }

      setStatus('stopped')

      onStop &&
        onStop({
          audioAsBase64: data?.data,
          audioUrl: fileName,

          sampleRate: iosSampleRate,
        })
    } catch (err) {
      console.log({err})
    }
  }

  async function startRecording() {
    //@ts-ignore
    const file = new File()
    //@ts-ignore
    const media = new Media()

    let fileName = `record-${+new Date()}.m4a`

    await file.createFile(file.tempDirectory, fileName, true)

    const audioFile = media.create(
      file.tempDirectory.replace(/^file:\/\//, '') + fileName,
    )
    audioFile.startRecord()

    setAudioFile(audioFile)
    setFileName(fileName)
    setStatus('recording')
  }

  return {
    status,
    sampleRate: iosSampleRate,
    startRecording,
    stopRecording,
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
