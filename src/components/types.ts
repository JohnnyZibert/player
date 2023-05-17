export interface ICurrentSong {
  currentSong: IData
}
export interface IData {
  name: string
  artist: string
  cover: string
  id: string
  active: boolean
  color: string[]
  audio: string
}
export interface ISongInfo {
  currentTime: number
  duration: number
  currentPercentage: number
}
