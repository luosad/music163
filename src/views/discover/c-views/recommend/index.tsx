// import React from 'react'

import { useMyDispatch } from '@/store'
import { FC, memo, use, useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  fetchPlayListAction,
  // fetchBannersAction,
  // fetchHotRecommendAction,
  // fetchNewAlbumAction
  fetchRecommendDataAction
} from './store/recommend'
import TopBanner from './c-cpns/banner'
import { RecommendWraper } from './style'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import RcmRanking from './c-cpns/rcm-ranking'
import UserLogin from './c-cpns/user-login'
import SetteldSinger from './c-cpns/setteld-singer'
import Anchor from './c-cpns/hot-anchor'

interface Iprops {
  children?: ReactNode
}
const Recommend: FC<Iprops> = (props) => {
  //发起action获取数据
  const dispatch = useMyDispatch()
  useEffect(() => {
    // dispatch(fetchBannersAction())
    // dispatch(fetchHotRecommendAction())
    // dispatch(fetchNewAlbumAction())
    dispatch(fetchRecommendDataAction())
    dispatch(fetchPlayListAction())
  }, [])

  return (
    <RecommendWraper>
      <TopBanner></TopBanner>
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend />
          <NewAlbum />
          <RcmRanking />
        </div>
        <div className="right">
          <div className="vip_card">
            <img
              className="vip_card_img"
              src="https://music.163.com/style/web2/img/dis_vip_card.png"
            />
          </div>
          <UserLogin />
          <SetteldSinger />
          <Anchor />
        </div>
      </div>
    </RecommendWraper>
  )
}

export default memo(Recommend)
