import './styles/app.scss'

import React, { useRef, useState } from 'react'

import { Library } from './components/Library'
import { ToggleLibrary } from './components/Nav'
import { Player } from './components/Player'
import { Song } from './components/Song'
import { IData } from './components/types'
import data from './data'

function App() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [songs, setSong] = useState<IData[]>(data())
  const [currentSong, setCurrentSong] = useState<IData>(songs[0])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isOpenLibrary, setIsOpenLibrary] = useState<boolean>(false)

  return (
    <div className={`App ${isOpenLibrary ? 'animate-active' : ''}`}>
      <ToggleLibrary
        isOpenLibrary={isOpenLibrary}
        setIsOpenLibrary={setIsOpenLibrary}
      />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSong={setSong}
      />
      <Library
        isOpenLibrary={isOpenLibrary}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        setSong={setSong}
      />
    </div>
  )
}

export default App
