// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { Outlet, Link } from 'react-router-dom'
interface Iprops {
  children?: ReactNode
}
const Discover: React.FC<Iprops> = (props) => {
  return (
    <div>
      <div>
        <Link to="/discover/recommend">推荐</Link>
        <Link to="/discover/ranking">排行榜</Link>
        <Link to="/discover/songs">歌单</Link>
        <Link to="/discover/djradio">主播电台</Link>
        <Link to="/discover/artist">歌手</Link>
        <Link to="/discover/album">最新音乐</Link>
      </div>
      <Outlet></Outlet>
    </div>
  )
}

export default memo(Discover)
