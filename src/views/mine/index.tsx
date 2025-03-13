// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const Mine: React.FC<Iprops> = (props) => {
  return <div>Mine</div>
}

export default memo(Mine)
