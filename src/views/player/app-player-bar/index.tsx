// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { Slider } from 'antd'
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayerBarWrapper
} from './style'
import { Link } from 'react-router-dom'
import { useMySelector } from '@/store'
import { formateImgUrl } from '@/utils/format'
interface Iprops {
  children?: ReactNode
}
const AppPlayerBar: React.FC<Iprops> = (props) => {
  const { currentSong } = useMySelector((state) => ({
    currentSong: state.player.currentSong
  }))
  console.log(currentSong)
  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={true}>
          <button className="btn sprite_playbar prev"></button>
          <button className="btn sprite_playbar play"></button>
          <button className="btn sprite_playbar next"></button>
        </BarControl>
        <BarPlayerInfo>
          <div className="image">
            <Link to="/discover/player">
              <img src={formateImgUrl(currentSong?.songs[0]?.al?.picUrl, 34)} />
              {/* <img src="https://p2.music.126.net/XlMYABTsvXGxOn0h9F61VQ==/109951168750902183.jpg?param=34y34" /> */}
            </Link>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.songs[0]?.name}</span>
              <span className="singer-name">
                {currentSong?.songs[0]?.ar[0]?.name}
              </span>
            </div>
            <div className="progress">
              <Slider />
              <div className="time">
                <span className="current">1</span>
                <span className="divider">/</span>
                <span className="duration">10</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator sequence={1}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop"></button>
            <button className="sprite_playbar btn playlist"></button>
          </div>
        </BarOperator>
      </div>
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
