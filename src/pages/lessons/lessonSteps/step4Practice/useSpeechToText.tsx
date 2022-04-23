import {Capacitor} from '@capacitor/core'
import {mean} from 'lodash'
import React from 'react'

const G_SPEECH_KEY = 'AIzaSyBbKxoaEv0Lgnm8ixXSZEbzJA7aePr9Od8'
// const G_SPEECH_KEY = 'AIzaSyBbjo_hE0z1qwcUb6wpIOFlYgZeFX7zgFo'

interface SpeechToTextResult {
  error?: boolean
  confidence?: number
  transcript?: string
  percent?: number
}
interface UseSpeechToTextResult {
  loading: boolean
  error?: any
  data?: SpeechToTextResult
}

export function fetchSpeechToText(
  audioBase64: string,
  sampleRate: number,
): Promise<SpeechToTextResult> {
  const platform = Capacitor.getPlatform()
  let config: any = {
    encoding: 'LINEAR16',
    sampleRateHertz: sampleRate,
    languageCode: 'en-US',
    enableWordTimeOffsets: false,
    audio_channel_count: 1,
  }
  if (platform === 'ios' || platform === 'android') {
    config = {
      encoding: 'MP3',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    }
  }

  return fetch(
    `https://speech.googleapis.com/v1p1beta1/speech:recognize?key=${G_SPEECH_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        config,
        audio: {
          content: audioBase64,
        },
      }),
    },
  )
    .then((res) => res.json())
    .then((res) => {
      // const result = res.results[0].alternatives[0]
      const list = res.results.map((rs) => rs.alternatives[0])
      const confidence = mean(list.map((alt) => alt.confidence))
      const transcript = list.map((alt) => alt.transcript).join('. ')
      const percent = parseInt((confidence * 100).toFixed(), 10)

      return Promise.resolve({
        confidence,
        transcript,
        percent,
      })
    })
}

export function useSpeechToText(
  audioBase64,
  sampleRate,
  {onCompleted} = {onCompleted: null},
) {
  const [state, setState] = React.useState<UseSpeechToTextResult>({loading: true})

  React.useEffect(() => {
    fetchSpeechToText(audioBase64, sampleRate)
      .then((data) => {
        setState({
          loading: false,
          data,
        })
        onCompleted && onCompleted({...data, error: false})
      })
      .catch((err) => {
        setState({loading: false, error: err})
        onCompleted &&
          onCompleted({error: true, confidence: null, transcript: null, percent: null})
      })
  }, [audioBase64, sampleRate])
  return state
  // return res
  // console.log(res)
}
