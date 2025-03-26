// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
import { Outlet, Link } from 'react-router-dom'
import NavBar from './c-cpns/nav-bar'
interface Iprops {
  children?: ReactNode
}
const Discover: React.FC<Iprops> = (props) => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <Outlet></Outlet>
    </div>
  )
}

export default memo(Discover)
