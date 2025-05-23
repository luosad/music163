// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { RankingItemWrapper } from './style'
import { formateImgUrl } from '@/utils/format'
import { useMyDispatch } from '@/store'
import { fetchCurrentSongAction } from '@/views/player/store/player'
interface Iprops {
  children?: ReactNode
  itemData: any
}
const RankingItem: React.FC<Iprops> = (props) => {
  const itemData = props.itemData
  // console.log(itemData)
  const { tracks = [] } = itemData
  // console.log(tracks)

  const dispatch = useMyDispatch()
  function handlePlayClick(id: number) {
    dispatch(fetchCurrentSongAction(id))
  }
  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="img">
          <img src={formateImgUrl(itemData.coverImgUrl, 80)}></img>
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <a className="sprite_02 btn play"></a>
          <a className="sprite_02 btn favor"></a>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="item" key={item.id}>
              <div className="rank">{index + 1}</div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operate">
                  <span
                    className="sprite_02 btn play"
                    onClick={() => handlePlayClick(item.id)}
                  ></span>
                  <span className="sprite_icon2 btn addto"></span>
                  <span className="sprite_02 btn favor"></span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <a href="/#/discover/ranking" className="footer">
        查看全部 &gt;
      </a>
    </RankingItemWrapper>
  )
}

export default RankingItem
