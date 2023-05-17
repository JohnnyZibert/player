import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, Dispatch, RefObject, useState } from 'react'

import { playAudio } from '../util/util'
import { ICurrentSong, IData, ISongInfo } from './types'

interface IProps extends ICurrentSong {
  currentSong: IData
  isPlaying: boolean
  setIsPlaying: Dispatch<boolean>
  songs: IData[]
  setCurrentSong: Dispatch<IData>
  setSong: Dispatch<IData[]>
  audioRef: RefObject<HTMLAudioElement>
}

export const Player = ({
  isPlaying,
  setIsPlaying,
  currentSong,
  songs,
  setCurrentSong,
  setSong,
  audioRef,
}: IProps) => {
  const [songInfo, setSongInfo] = useState<ISongInfo>({
    currentTime: 0,
    duration: 0,
    currentPercentage: 0,
  })
  const checkAudioRef = audioRef.current !== null

  const activeLibraryHandler = (prevNext: IData) => {
    const newSong = songs.map((song) => {
      if (song.id === prevNext.id) {
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
    setSong(newSong)
    playAudio(audioRef, isPlaying)
  }

  const audioClick = () => {
    if (isPlaying) {
      checkAudioRef && audioRef.current.pause()
      setIsPlaying(!isPlaying)
    } else {
      checkAudioRef && audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }
  const timeUpdateHandler = (e: ChangeEvent<HTMLAudioElement>) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    )
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      currentPercentage: animationPercentage,
    })
  }

  const getTime = (time: number) => {
    return time
      ? Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
      : '0:00'
  }

  const dragHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (checkAudioRef) {
      audioRef.current.currentTime = Number(e.target.value)
    }

    setSongInfo({ ...songInfo, currentTime: Number(e.target.value) })
  }
  const handleSkipTrack = async (direction: string) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1])
        activeLibraryHandler(songs[songs.length - 1])
        return
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length])
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
    }
  }

  const animationTrack = {
    transform: `translateX(${songInfo.currentPercentage}%)`,
  }
  const endedHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
  }

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div className="animate-track" style={animationTrack}></div>
        </div>
        <p>{getTime(songInfo.duration ? songInfo.duration : Number('0:00'))}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="2x"
          className="skip-back"
          onClick={() => handleSkipTrack('skip-back')}
        />
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          className="play"
          onClick={audioClick}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          size="2x"
          className="skip-forward"
          onClick={() => handleSkipTrack('skip-forward')}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.audio}
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={endedHandler}
      />
    </div>
  )
}
