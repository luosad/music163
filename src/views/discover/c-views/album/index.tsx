// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const Album: React.FC<Iprops> = (props) => {
  return <div>Album</div>
}

export default memo(Album)
