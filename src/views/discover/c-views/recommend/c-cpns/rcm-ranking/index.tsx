// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { RankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useMySelector } from '@/store'
import { platform } from 'os'
import RankingItem from '../rcm-ranking-item'
interface Iprops {
  children?: ReactNode
}
const RcmRanking: React.FC<Iprops> = (props) => {
  const { playlists } = useMySelector((state) => ({
    playlists: state.recommend.rankings
  }))
  return (
    <RankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking"></AreaHeaderV1>
      <div className="content">
        {playlists.map((item) => {
          return <RankingItem key={item.id} itemData={item} />
        })}
      </div>
    </RankingWrapper>
  )
}

export default memo(RcmRanking)
