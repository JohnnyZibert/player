import { Dispatch, RefObject, SetStateAction } from 'react'

import { LibrarySong } from './LibrarySong'
import { IData } from './types'

interface IProps {
  songs: {
    name: string
    artist: string
    cover: string
    id: string
    active: boolean
    color: string[]
    audio: string
  }[]
  setCurrentSong: Dispatch<SetStateAction<IData>>
  isPlaying: boolean
  audioRef: RefObject<HTMLAudioElement>
  setIsPlaying: Dispatch<boolean>
  setSong: Dispatch<IData[]>
  isOpenLibrary: boolean
}

export const Library = ({
  isOpenLibrary,
  songs,
  setCurrentSong,
  isPlaying,
  audioRef,
  setIsPlaying,
  setSong,
}: IProps) => {
  return (
    <div className={`library ${isOpenLibrary ? 'library-active' : ''}`}>
      <h2>Library</h2>
      <div className={'library-songs'}>
        {songs.map((song: IData) => (
          <LibrarySong
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            id={song.id}
            key={song.id}
            isPlaying={isPlaying}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
            setSong={setSong}
          />
        ))}
      </div>
    </div>
  )
}
