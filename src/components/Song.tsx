import React from 'react'

import { ICurrentSong } from './types'

export const Song = ({ currentSong }: ICurrentSong) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt="ImgSong" />
      <h1>{currentSong.name}</h1>
      <h3>{currentSong.artist}</h3>
    </div>
  )
}
