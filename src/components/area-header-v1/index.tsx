// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AreaWrapperV1 } from './style'
interface Iprops {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moreLink?: string
}
const AreaHeaderV1: React.FC<Iprops> = (props) => {
  const { title, keywords = [], moreLink = '/' } = props
  return (
    <AreaWrapperV1 className="sprite_02">
      <div className="left">
        <h2 className="title">{title}</h2>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link to={moreLink}>更多</Link>
        <i className="icon sprite_02"></i>
      </div>
    </AreaWrapperV1>
  )
}

export default memo(AreaHeaderV1)
