// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const Recommend: React.FC<Iprops> = (props) => {
  return <div>Recommend</div>
}

export default memo(Recommend)
