import { RefObject } from 'react'

export const playAudio = async (
  audioRef: RefObject<HTMLAudioElement>,
  isPlaying: boolean
) => {
  if (isPlaying) {
    if (audioRef.current !== null) {
      await audioRef.current.play()
    }
  }
}
