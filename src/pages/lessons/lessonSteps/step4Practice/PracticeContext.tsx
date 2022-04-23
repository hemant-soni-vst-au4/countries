import {createContext, useContext} from 'react'

interface ContextValue {
  isRecording: boolean
  isPlaying: boolean
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export const PracticeContext = createContext<ContextValue>({
  isRecording: false,
  isPlaying: false,
  setIsRecording: (v) => {},
  setIsPlaying: (v) => {},
})

export function usePracticeContext() {
  return useContext(PracticeContext)
}
