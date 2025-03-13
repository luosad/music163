// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
}
const Djradio: React.FC<Iprops> = (props) => {
  return <div>Djradio</div>
}

export default memo(Djradio)
