// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const Songs: React.FC<Iprops> = (props) => {
  return <div>Songs</div>
}

export default memo(Songs)
