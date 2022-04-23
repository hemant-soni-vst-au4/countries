import {TextToSpeech} from '@ionic-native/text-to-speech'
import {Capacitor} from '@capacitor/core'
import {ScreenReader} from '@capacitor/screen-reader'

export default function useSpeak() {
  async function speak(text: string) {
    if (Capacitor.getPlatform() === 'ios') {
      try {
        await TextToSpeech.speak({text, locale: 'en', rate: 1.5})
      } catch (error) {
        console.error('An error occured while initializing : ', error)
      }
    } else {
      await ScreenReader.speak({value: text, language: 'en'})
    }
  }
  return speak
}
