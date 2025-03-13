// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const Template: React.FC<Iprops> = (props) => {
  return <div>Template</div>
}

export default memo(Template)
