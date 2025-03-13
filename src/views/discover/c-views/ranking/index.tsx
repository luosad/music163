// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const Ranking: React.FC<Iprops> = (props) => {
  return <div>Ranking</div>
}

export default memo(Ranking)
