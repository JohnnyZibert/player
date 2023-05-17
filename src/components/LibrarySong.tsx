import React, { Dispatch, RefObject } from 'react'

import { playAudio } from '../util/util'
import { IData } from './types'

interface IProps {
  songs: IData[]
  setCurrentSong: Dispatch<IData>
  id: string
  song: IData
  isPlaying: boolean
  audioRef: RefObject<HTMLAudioElement>
  setIsPlaying: Dispatch<boolean>
  setSong: Dispatch<IData[]>
}

export const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  setSong,
  isPlaying,
}: IProps) => {
  const selectTrack = songs.filter((state) => state.id === id)
  const selectHandler = async () => {
    await setCurrentSong(selectTrack[0])
    const newSong = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        }
      } else {
        return {
          ...song,
          active: false,
        }
      }
    })
    await setSong(newSong)
    await playAudio(audioRef, isPlaying)
  }

  return (
    <div
      onClick={selectHandler}
      className={`library-song ${song.active ? 'select' : ''}`}
    >
      <img src={song.cover} alt="ImgSong" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}
