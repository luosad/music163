// import React from 'react'

import { FC, ReactElement, memo } from 'react'
import type { ReactNode } from 'react'
interface Iprops {
  children?: ReactNode
  name: string
  age: number
  gender?: string
}
const Download: React.FC<Iprops> = (props) => {
  return (
    <div>
      <div>name:{props.name}</div>
      <div>age:{props.age}</div>
      <div>gender:{props.gender}</div>
      <div>children:{props.children}</div>
    </div>
  )
}

// const Download = (props: Iprops) => {
//   return (
//     <div>
//       <div>name:{props.name}</div>
//       <div>age:{props.age}</div>
//       <div>gender:{props.gender}</div>
//     </div>
//   )
// }

//memo是一个高阶组件，用于包裹函数组件，返回一个新的组件，新组件会对函数组件的props进行浅比较，如果props没有发生变化，则不会重新渲染函数组件
//memo的作用是优化函数组件的性能，减少不必要的渲染
export default memo(Download)
