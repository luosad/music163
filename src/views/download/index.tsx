// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const Download: React.FC<Iprops> = (props) => {
  return <div>Download</div>
}

export default memo(Download)
