// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { SettledSingerWrapper } from './style'
import AreaHeaderV2 from '@/components/area-header-v2'
import { useMySelector } from '@/store'
import { formateImgUrl } from '@/utils/format'
interface Iprops {
  children?: ReactNode
}
const SettledSinger: React.FC<Iprops> = (props) => {
  const { singerList } = useMySelector((state) => ({
    singerList: state.recommend.singerList
  }))
  return (
    <SettledSingerWrapper>
      <AreaHeaderV2
        title="入驻歌手"
        moreText="查看全部&gt;"
        moreLink="#/discover/artist"
      />
      <div className="singer-list">
        {singerList.map((item) => {
          return (
            <a
              href={`https://music.163.com/#/user/home?id=${item.accountId}`}
              key={item.id}
              className="item"
            >
              <img src={formateImgUrl(item.picUrl, 62)}></img>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alia">{item.alias.join(' ')}</div>
              </div>
            </a>
          )
        })}
      </div>

      <div className="apply-for">
        <a href="https://music.163.com/st/musician" target="_blank">
          申请成为网易音乐人
        </a>
      </div>
    </SettledSingerWrapper>
  )
}

export default memo(SettledSinger)
