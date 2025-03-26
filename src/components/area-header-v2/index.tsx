// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { AreaHeaderV2Wrapper } from './style'
interface Iprops {
  children?: ReactNode
  title?: string
  moreLink?: string
  moreText?: string
}
const AreaHeadverV2: React.FC<Iprops> = (props) => {
  const { title = '', moreLink, moreText } = props
  return (
    <AreaHeaderV2Wrapper>
      <h3>{title}</h3>
      <a href={moreLink}>{moreText}</a>
    </AreaHeaderV2Wrapper>
  )
}

export default memo(AreaHeadverV2)
