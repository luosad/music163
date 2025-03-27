// import React from 'react'

import {
  FC,
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react'
import type { ReactNode } from 'react'
import { Slider } from 'antd'
import { useMyDispatch } from '@/store'
import { fetchCurrentSongAction } from '../store/player'
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayerBarWrapper
} from './style'
import { Link } from 'react-router-dom'
import { useMySelector } from '@/store'
import { formateCount, formateImgUrl, formatTime } from '@/utils/format'
import { shallowEqual } from 'react-redux'

interface Iprops {
  children?: ReactNode
}

const AppPlayerBar: React.FC<Iprops> = (props) => {
  //是否正在播放
  const [isPlaying, setIsPlaying] = useState(false)
  //保存当前播放时间
  const [currentTime, setCurrentTime] = useState(0)
  //是否正在滑动进度条
  const [isChanging, setIsChanging] = useState(false)
  //滑块进度
  const [progress, setProgress] = useState(0)

  //获取对audio元素的引用
  const audioRef = useRef<HTMLAudioElement>(null)

  /* 获取数据 */
  //获取当前歌曲信息
  const { currentSong, currentSongUrl } = useMySelector(
    (state) => ({
      currentSong: state.player.currentSong,
      currentSongUrl: state.player.currentSongUrl
    }),
    shallowEqual
  )
  // console.log(currentSong)
  console.log(currentSongUrl.data[0].url)

  /*其它用于处理的数据 */
  const duration = currentSong.dt || 0
  const picUrl = currentSong.songs[0].al.picUrl

  /*  */
  /* 事件处理函数 */
  //播放音乐或暂停音乐
  const playMusic = useCallback(() => {
    //切换播放状态
    setIsPlaying(!isPlaying)
    //播放音乐
    isPlaying ? audioRef?.current?.pause() : audioRef?.current?.play()
    // console.log('切换播放')
  }, [isPlaying])

  //设置音频src
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSongUrl.data[0].url
      // 设置音量
      audioRef.current.volume = 0.3
    }
    // 如果不是首次加载: 播放音乐
    // if (!firstLoad) setIsPlaying(true + Math.random())
  }, [currentSong])

  //歌曲播放触发
  function timeUpdate(e: any) {
    let currentTime = e.target.currentTime
    //没有滑动时更新时间
    if (!isChanging) {
      setCurrentTime(currentTime * 1000)
      setProgress(((currentTime * 1000) / duration) * 100)
    }

    // 当前音乐处于播放状态(用于搜索音乐,点击item播放音乐时使用)
    if (currentTime > 0.1 && currentTime < 0.5) setIsPlaying(true)

    // 获取当前播放歌词
    /*     let i = 0 //用于获取歌词的索引
    // 2.遍历歌词数组
    for (; i < lyricList.length; i++) {
      const item = lyricList[i]
      if (currentTime * 1000 < item.totalTime) {
        // 4.跳出循环
        break
      }
    } */
  }

  //拖动滑块时触发
  const sliderChange = useCallback(
    (value: number) => {
      // 滑动滑块时:更改标识变量为false,此时不会触发onTimeUpdate(歌曲播放事件)
      setIsChanging(true)
      // 更改"当前播放时间"要的是毫秒数: 241840(总毫秒)
      const currentTime = (value / 100) * duration
      setCurrentTime(currentTime)
      // 更改进度条值
      setProgress(value)
    },
    [duration]
  )

  // 手指抬起时触发
  const slideAfterChange = useCallback(
    (value: number) => {
      // 重新设置当前播放时长 value(进度)/100 * duration(总毫秒数) / 1000 得到当前播放的"秒数"
      const currentTime = ((value / 100) * duration) / 1000
      if (audioRef.current) {
        audioRef.current.currentTime = currentTime
        // 设置当前播放时间的state,设置的是'毫秒',所以需要*1000
        setCurrentTime(currentTime * 1000)
        setIsChanging(false)
        // 更改播放状态
        setIsPlaying(true)
        // 播放音乐
        audioRef.current.play()
      }
    },
    [duration, audioRef]
  )

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button className="btn sprite_playbar prev"></button>
          <button
            className="btn sprite_playbar play "
            onClick={playMusic}
          ></button>
          <button className="btn sprite_playbar next"></button>
        </BarControl>
        <BarPlayerInfo>
          <div className="image">
            <Link to="/discover/player">
              {/* <img src={formateImgUrl(currentSong?.songs[0]?.al?.picUrl, 34)} /> */}
              {/* <img src="https://p2.music.126.net/XlMYABTsvXGxOn0h9F61VQ==/109951168750902183.jpg?param=34y34" /> */}
              <img src={formateImgUrl(picUrl, 34)} />
            </Link>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.songs[0]?.name}</span>
              {/* <span className="song-name">黎明</span> */}
              <span className="singer-name">
                {currentSong?.songs[0]?.al.name}
                {/* 五月太 */}
              </span>
            </div>
            <div className="progress">
              <Slider
                defaultValue={0}
                value={progress}
                onChange={sliderChange}
                onAfterChange={slideAfterChange}
              />
              <div className="time">
                {/* <span className="current">1</span> */}
                <span className="current">
                  {formatTime(Math.floor(currentTime))}
                </span>
                <span className="divider">/</span>
                <span className="duration">10</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator sequence={1}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop"></button>
            <button className="sprite_playbar btn playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio
        id="audio"
        ref={audioRef}
        onTimeUpdate={timeUpdate}
        // onEnded={handleTimeEnd}
        preload="auto"
      />
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
