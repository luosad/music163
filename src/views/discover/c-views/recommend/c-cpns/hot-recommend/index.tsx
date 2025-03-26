// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { HotRecommendWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { shallowEqual } from 'react-redux'
import { useMySelector } from '@/store'
import Songs from '../../../songs'
import SongsMenuItem from '@/components/songs-menu-item'
interface Iprops {
  children?: ReactNode
}
const HotRecommend: React.FC<Iprops> = (props) => {
  const { hotRecommends } = useMySelector(
    (state) => ({
      hotRecommends: state.recommend.hotRecommends
    }),
    shallowEqual
  )
  return (
    <HotRecommendWrapper>
      <AreaHeaderV1
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        moreLink="/discover/songs"
      ></AreaHeaderV1>

      <div className="recommend-list">
        {hotRecommends.map((item, index) => {
          return <SongsMenuItem key={item.id} itemData={item} />
        })}
      </div>
    </HotRecommendWrapper>
  )
}

export default memo(HotRecommend)
