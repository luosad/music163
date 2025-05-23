import {
  FC,
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useState,
  useRef,
  ReactNode
} from 'react'
import { Slider, message } from 'antd'
import { useMyDispatch } from '@/store'
import {
  changeLyricIndexAction,
  changeMusicAction,
  changePlayModeAction,
  fetchCurrentSongAction
} from '../store/player'
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayerBarWrapper
} from './style'
import { Form, Link } from 'react-router-dom'
import { useMySelector } from '@/store'
import { formateCount, formateImgUrl, formatTime } from '@/utils/format'
import { shallowEqual } from 'react-redux'
import { throttle } from 'lodash'
interface Iprops {
  children?: ReactNode
}

const AppPlayerBar: FC<Iprops> = (props) => {
  const [messageApi, contextHolder] = message.useMessage()
  // 是否正在播放
  const [isPlaying, setIsPlaying] = useState(false)
  // 保存当前播放时间（毫秒）
  const [currentTime, setCurrentTime] = useState(0)
  // 是否正在滑动进度条
  const [isChanging, setIsChanging] = useState(false)
  // 滑块进度（百分比）
  const [progress, setProgress] = useState(0)
  // 歌曲总时长（秒）
  const [duration, setDuration] = useState(0)
  //第一次播放
  const [firstLoad, setFirstLoad] = useState(true)

  // 获取对audio元素的引用
  const audioRef = useRef<HTMLAudioElement>(null)

  /* 获取数据 */
  // 获取当前歌曲信息
  const {
    currentSong,
    currentSongUrl,
    currentSongLyric,
    LyricIndex,
    playMode,
    playList
  } = useMySelector(
    (state) => ({
      currentSong: state.player.currentSong,
      currentSongUrl: state.player.currentSongUrl,
      currentSongLyric: state.player.currentSongLyric,
      LyricIndex: state.player.LyricIndex,
      playMode: state.player.playMode,
      playList: state.player.playSongList
    }),
    shallowEqual
  )
  // console.log(currentSongLyric)

  /* 其它用于处理的数据 */
  // 歌曲封面图片URL
  const picUrl = currentSong.al?.picUrl
  const dispatch = useMyDispatch()

  // 设置音频src
  useEffect(() => {
    if (audioRef.current && currentSongUrl.url) {
      audioRef.current.src = currentSongUrl.url
      audioRef.current.volume = 0.3
      audioRef.current.load()
    }
  }, [currentSongUrl])

  /* 事件处理函数 */
  // 播放音乐或暂停音乐
  const playMusic = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  //切歌后自动播放
  useEffect(() => {
    if (audioRef.current && currentSongUrl.url) {
      setFirstLoad(false)
      if (firstLoad === false) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error)
        })
        setIsPlaying(true)
      }
    }
  }, [currentSongUrl])

  // 切换歌曲
  function handleChangeMusic(isNext: boolean) {
    dispatch(changeMusicAction(isNext))
    // playMusicAfterChange()
  }

  // 切换播放模式，顺序，单曲循环，随机
  const handleChangePlayMode = () => {
    const newPlayMode = (playMode + 1) % 3
    dispatch(changePlayModeAction(newPlayMode))
  }

  // 音频元数据加载完成
  const handleLoadedMetadata = () => {
    // if (audioRef.current) {
    //   setDuration(audioRef.current.duration)
    // }
    setDuration(currentSong.dt / 1000)
  }

  // 歌曲播放触发
  const timeUpdate = () => {
    //不在拖动进度条时更新进度
    if (!isChanging && audioRef.current) {
      //更新时间
      const currentTimeSec = audioRef.current.currentTime * 1000 // 转换为毫秒
      setCurrentTime(currentTimeSec)

      if (duration > 0) {
        //更新进度
        setProgress((currentTimeSec / (duration * 1000)) * 100)
      }

      //获取当前歌词
      let index = currentSongLyric.length - 1
      for (let i = 0; i < currentSongLyric.length; i++) {
        //找到第一个时间大于当前时间的歌词
        if (currentTimeSec < currentSongLyric[i].time) {
          index = i - 1
          break
        }
      }
      //设置对应索引
      if (LyricIndex === index || index === -1) return
      dispatch(changeLyricIndexAction(index))
      console.log(currentSongLyric[index]?.content)

      // 展示歌词
      // messageApi.open({
      //   content: currentSongLyric[index]?.content,
      //   // key: 'lyric',
      //   duration: 1000000
      //   // className: 'ant-message'
      // })
    }
  }

  // 拖动滑块时触发
  // const sliderChange = useCallback(
  //   throttle((value: number) => {
  //     setIsChanging(true)
  //     if (audioRef.current && duration > 0) {
  //       const currentTime = (value / 100) * duration * 1000
  //       setCurrentTime(currentTime)
  //       setProgress(value)
  //     }
  //     console.log('经过节流')
  //   }, 100), // 每 100ms 最多触发一次
  //   [duration]
  // )
  const sliderChange = useCallback(
    (value: number) => {
      setIsChanging(true)
      if (audioRef.current && duration > 0) {
        const currentTime = (value / 100) * duration * 1000
        setCurrentTime(currentTime)
        setProgress(value)
      }
      console.log('不经过节流')
    }, // 每 100ms 最多触发一次
    [duration]
  )

  // 手指抬起时触发
  const slideAfterChange = useCallback(
    (value: number) => {
      if (audioRef.current && duration > 0) {
        //获取点击位置的时间
        const currentTimeSec = (value / 100) * duration // 计算当前播放时间（秒）
        //设置当前播放时间
        audioRef.current.currentTime = currentTimeSec
        //修改相关数据
        setCurrentTime(currentTimeSec * 1000) // 转换为毫秒
        setIsChanging(false)
        setIsPlaying(true)
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error)
        })
      }
    },
    [duration]
  )

  // 音频播放结束处理
  const handleEnded = () => {
    setIsPlaying(false)
    handleChangeMusic(true)
  }

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.src = ''
        audioRef.current.pause()
      }
    }
  }, [])

  return (
    <>
      {/* <div className="ant-message ant-message-notice-content">
        {currentSongLyric[LyricIndex]?.content}
      </div> */}
      {/* <contextHolder></> */}
      {/* {contextHolder} */}
      <div className="ant-message ">
        <div className="ant-message-notice-wrapper">
          <div className="ant-message-notice-content">
            {currentSongLyric[LyricIndex]?.content}
          </div>
        </div>
      </div>
      <PlayerBarWrapper className="sprite_playbar">
        <div className="content wrap-v2">
          <BarControl isPlaying={isPlaying}>
            <button
              className="btn sprite_playbar prev"
              onClick={() => handleChangeMusic(false)}
            ></button>
            <button
              className="btn sprite_playbar play"
              onClick={playMusic}
            ></button>
            <button
              className="btn sprite_playbar next"
              onClick={() => handleChangeMusic(true)}
            ></button>
          </BarControl>
          <BarPlayerInfo>
            <div className="image">
              <Link to="/discover/player">
                {picUrl && <img src={formateImgUrl(picUrl, 34)} />}
              </Link>
            </div>
            <div className="info">
              <div className="song">
                <span className="song-name">{currentSong.name}</span>
                <span className="singer-name">{currentSong.ar?.[0]?.name}</span>
              </div>
              <div className="progress">
                <Slider
                  value={progress}
                  onChange={sliderChange}
                  onAfterChange={slideAfterChange}
                  min={0}
                  max={100}
                  tooltipVisible={false}
                />
                <div className="time">
                  <span className="current">
                    {formatTime(Math.floor(currentTime / 1000))}
                  </span>
                  <span className="divider">/</span>
                  <span className="duration">
                    {formatTime(Math.floor(duration))}
                  </span>
                </div>
              </div>
            </div>
          </BarPlayerInfo>
          <BarOperator sequence={playMode}>
            <div className="left">
              <button className="btn pip"></button>
              <button className="sprite_playbar btn favor"></button>
              <button className="sprite_playbar btn share"></button>
            </div>
            <div className="right sprite_playbar">
              <button className="sprite_playbar btn volume"></button>
              <button
                className="sprite_playbar btn loop"
                onClick={handleChangePlayMode}
              ></button>
              <button className="sprite_playbar btn playlist">
                {playList.length}
              </button>
            </div>
          </BarOperator>
        </div>
        <audio
          id="audio"
          ref={audioRef}
          onTimeUpdate={timeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          preload="auto"
        />
      </PlayerBarWrapper>
    </>
  )
}

export default AppPlayerBar
