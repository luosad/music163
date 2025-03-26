// import React from 'react'

import { useMySelector } from '@/store'
import {
  FC,
  ReactElement,
  memo,
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react'
import { Carousel } from 'antd'
import type { ReactNode } from 'react'
import classNames from 'classnames'
import { shallowEqual } from 'react-redux'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'
import { CarouselRef } from 'antd/lib/carousel'
import { log } from 'console'

interface Iprops {
  children?: ReactNode
}

const TopBanner: React.FC<Iprops> = () => {
  /* 定义内部的数据 */
  //记录轮播图下标
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  //获取对轮播图对象的引用
  const bannerRef = useRef<CarouselRef>(null)

  /* 在store中获取数据 */
  const { banners } = useMySelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )

  /* 事件处理函数*/
  //点击按钮切换
  //切换到前一个
  function handlePreClick() {
    bannerRef.current?.prev()
  }
  //切换到后一个
  function handleNextClick() {
    bannerRef.current?.next()
  }

  // 切换轮播图
  function handleBeforeChange(current: number) {
    // setCurrentIndex(-1)
    setCurrentIndex((current + 1) % banners.length)
  }

  //获取当前轮播图下标
  function handleAfterChange(from: number, to: number) {
    setCurrentIndex(to)
  }

  //获取轮播图图片地址
  let bgImageUrl = ''
  if (currentIndex >= 0 && banners.length > 0) {
    bgImageUrl = banners[currentIndex]?.imageUrl + '?imageView&blur=40x20'
  }

  return (
    <BannerWrapper
      style={{
        // background: `url(${bgImageUrl}) center center/6000px`
        backgroundImage: `url(${bgImageUrl})`,
        backgroundPosition: 'center',
        backgroundSize: '6000px'
      }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          {/* 轮播图*/}
          <Carousel
            autoplay
            ref={bannerRef}
            effect="fade"
            dots={false}
            beforeChange={handleBeforeChange}
            /*afterChange={handleAfterChange}*/
          >
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: index === currentIndex
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePreClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
