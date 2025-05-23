// /views/player-bar/components/BarPlayerInfo.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Slider } from 'antd'

interface Song {
  name: string
  ar?: { name: string }[]
}

interface BarPlayerInfoProps {
  currentSong: Song
  picUrl: string
  currentTime: number
  duration: number
  progress: number
  sliderChange: (value: number) => void
  slideAfterChange: (value: number) => void
  formatTime: (time: number) => string
  formateImgUrl: (url: string, size: number) => string
}

const BarPlayerInfo: React.FC<BarPlayerInfoProps> = ({
  currentSong,
  picUrl,
  currentTime,
  duration,
  progress,
  sliderChange,
  slideAfterChange,
  formatTime,
  formateImgUrl
}) => {
  return (
    <div className="bar-player-info">
      <div className="image">
        <Link to="/discover/player">
          {picUrl && <img src={formateImgUrl(picUrl, 34)} />}
        </Link>
      </div>
      <div className="info">
        <div className="song">
          <span className="song-name">{currentSong.name}</span>
          <span className="singer-name">{currentSong.ar?.[0]?.name}</span>
        </div>
        <div className="progress">
          <Slider
            value={progress}
            onChange={sliderChange}
            onAfterChange={slideAfterChange}
            min={0}
            max={100}
            tooltipVisible={false}
          />
          <div className="time">
            <span className="current">
              {formatTime(Math.floor(currentTime / 1000))}
            </span>
            <span className="divider">/</span>
            <span className="duration">{formatTime(Math.floor(duration))}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarPlayerInfo
