// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { MenuItemWrapper } from './style'
import { formateCount, formateImgUrl } from '@/utils/format'
interface Iprops {
  children?: ReactNode
  itemData: any
}
const SongsMenuItem: React.FC<Iprops> = (props) => {
  const { itemData } = props
  return (
    <MenuItemWrapper>
      <div className="top ">
        <img src={formateImgUrl(itemData.picUrl, 140)} alt="" />
        {/* 蒙版效果 */}
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            {/* 展示数量 */}
            <span className="count">
              <i className="sprite_icon headset"></i>
              {formateCount(itemData.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="bottom text-nowrap">{itemData.name}</div>
    </MenuItemWrapper>
  )
}

export default memo(SongsMenuItem)
