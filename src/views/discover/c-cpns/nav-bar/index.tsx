// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { NavBarWrapper } from './style'
import { discoverMenu } from '@/assets/data/local_data'
interface Iprops {
  children?: ReactNode
}
const NavBar: React.FC<Iprops> = (props) => {
  return (
    <NavBarWrapper className="">
      <div className="nav wrap-v1">
        {discoverMenu.map((item) => {
          return (
            <div className="item" key={item.title}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          )
        })}
      </div>
    </NavBarWrapper>
  )
}

export default memo(NavBar)
