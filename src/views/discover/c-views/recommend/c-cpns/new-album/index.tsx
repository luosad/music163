// import React from 'react'

import { FC, ReactElement, memo, useRef } from 'react'
import type { ReactNode } from 'react'
import { AlbumWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { Carousel } from 'antd'
import { CarouselRef } from 'antd/lib/carousel'
import { useMySelector } from '@/store'
import NewAlbumItem from '@/components/new-album-item'
interface Iprops {
  children?: ReactNode
}
const NewAlbum: React.FC<Iprops> = (props) => {
  /* 获取内部数据 */
  const banneRef = useRef<CarouselRef>(null)

  /* 获取redux数据 */
  const { newAlbum } = useMySelector((state) => ({
    newAlbum: state.recommend.newAlbum
  }))

  /* 事件处理函数 */
  function handleLeftClick() {
    banneRef.current?.prev()
  }
  function handleRightClick() {
    banneRef.current?.next()
  }
  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left "
          onClick={handleLeftClick}
        ></button>
        <div className="banner">
          <Carousel ref={banneRef} dots={false} speed={1500}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list" key={item}>
                    {/* 新碟上架总共两页，每页展示5张 */}
                    {newAlbum.slice(item * 5, (item + 1) * 5).map((album) => {
                      return (
                        <NewAlbumItem key={album.id} itemData={album}>
                        </NewAlbumItem>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handleRightClick}
        ></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(NewAlbum)
