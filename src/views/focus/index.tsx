// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const Focus: React.FC<Iprops> = (props) => {
  return <div>Focus</div>
}

export default memo(Focus)
