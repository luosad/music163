// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const Player: React.FC<Iprops> = (props) => {
  return <div>Player</div>
}

export default memo(Player)
