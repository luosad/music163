// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { NewAlbumItemWrapper } from './style'
import { AlbumWrapper } from '@/views/discover/c-views/recommend/c-cpns/new-album/style'
import { log } from 'console'
import { formateImgUrl } from '@/utils/format'
interface Iprops {
  children?: ReactNode
  itemData: any
}
const NewAlbumItem: React.FC<Iprops> = (props) => {
  const { itemData } = props
  // console.log(itemData)
  return (
    <NewAlbumItemWrapper>
      <div className="top">
        <img src={formateImgUrl(itemData.picUrl, 100)} alt="" />
        <a href="" className="sprite_cover cover"></a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </NewAlbumItemWrapper>
  )
}

export default memo(NewAlbumItem)
