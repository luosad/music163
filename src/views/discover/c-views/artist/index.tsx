// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const Artist: React.FC<Iprops> = (props) => {
  return <div>Artist</div>
}

export default memo(Artist)
