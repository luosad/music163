// import React from 'react'

import { FC, ReactElement, memo, useEffect } from 'react'
import { useMyDispatch } from '@/store'
import {
  fetchCurrentSongAction,
  fetchCurrentSongUrlAction
} from './store/player'
import type { ReactNode } from 'react'
import AppPlayerBar from './app-player-bar'

interface Iprops {
  children?: ReactNode
}
const Player: React.FC<Iprops> = (props) => {
  /* 获取数据 */
  const dispatch = useMyDispatch()
  useEffect(() => {
    dispatch(fetchCurrentSongAction(347230))
    // dispatch(fetchCurrentSongUrlAction(386538))
  }, [])
  return (
    <div>
      <AppPlayerBar></AppPlayerBar>
    </div>
  )
}

export default memo(Player)
