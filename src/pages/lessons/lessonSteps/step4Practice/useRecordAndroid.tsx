//@ts-nocheck
import React from 'react'
import {currentLessonIdVar, recordsVar} from '../../../../apollo/apollo-client'
import {File} from '@ionic-native/file'
import {Media, MediaObject} from '@ionic-native/media'
import {Plugins} from '@capacitor/core'
const {Filesystem} = Plugins

const androidSampleRate = 16000

type RecordStatus = 'idle' | 'stopped' | 'recording'

export function useRecordAndroid({onStop}) {
  const [status, setStatus] = React.useState<RecordStatus>('idle')
  const [fileName, setFileName] = React.useState<string>()
  const [audioFile, setAudioFile] = React.useState<MediaObject>()

  async function stopRecording() {
    try {
      audioFile.stopRecord()
      audioFile.release()
      setAudioFile(null)
      const file = new File()

      let data = await Filesystem.readFile({
        path: file.externalDataDirectory + fileName,
      })
      if (data) {
        console.log({data})
      }

      setStatus('stopped')

      onStop &&
        onStop({
          audioAsBase64: data?.data,
          audioUrl: fileName,
          sampleRate: androidSampleRate,
        })
    } catch (err) {
      console.log({err})
    }
  }

  async function startRecording() {
    const file = new File()
    const media = new Media()

    let fileName = `record-${+new Date()}.mp3`

    // await file.createFile(file.tempDirectory, fileName, true)
    const filePath = file.externalDataDirectory.replace(/^file:\/\//, '') + fileName
    const audioFile = media.create(filePath)
    audioFile.startRecord()

    setAudioFile(audioFile)
    setFileName(fileName)
    setStatus('recording')
  }

  return {
    status,
    sampleRate: androidSampleRate,
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
