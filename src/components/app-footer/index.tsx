// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const AppFooter: React.FC<Iprops> = (props) => {
  return <h2>App-footer</h2>
}

export default memo(AppFooter)
