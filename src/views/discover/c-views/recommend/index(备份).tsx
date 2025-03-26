// import React from 'react'

import { FC, ReactElement, memo, use } from 'react'
import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import request from '@/service/axios'
interface Iprops {
  children?: ReactNode
}
const Recommend: FC<Iprops> = (props) => {
  const [banners, setBanners] = useState([])
  //测试request
  useEffect(() => {
    request({
      url: '/banner'
    }).then((res) => {
      // console.log(res.banners)
      setBanners(res.banners)
    })
  }, [])
  // console.log(process.env.NODE_ENV)
  return <div>Recommend</div>
}

export default memo(Recommend)
