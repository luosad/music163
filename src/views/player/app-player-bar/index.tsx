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

const AppPlayerBar: FC<Iprops> = (props) => {
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

  // 获取对audio元素的引用
  const audioRef = useRef<HTMLAudioElement>(null)

  /* 获取数据 */
  // 获取当前歌曲信息
  const { currentSong, currentSongUrl } = useMySelector(
    (state) => ({
      currentSong: state.player.currentSong,
      currentSongUrl: state.player.currentSongUrl
    }),
    shallowEqual
  )

  /* 其它用于处理的数据 */
  // 歌曲封面图片URL
  const picUrl = currentSong.songs?.[0]?.al?.picUrl

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

  // 设置音频src
  useEffect(() => {
    if (audioRef.current && currentSongUrl.data?.[0]?.url) {
      audioRef.current.src = currentSongUrl.data[0].url
      audioRef.current.volume = 0.3
      audioRef.current.load()
    }
  }, [currentSongUrl])

  // 音频元数据加载完成
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  // 歌曲播放触发
  const timeUpdate = () => {
    if (!isChanging && audioRef.current) {
      const currentTimeSec = audioRef.current.currentTime * 1000 // 转换为毫秒
      setCurrentTime(currentTimeSec)
      if (duration > 0) {
        setProgress((currentTimeSec / (duration * 1000)) * 100)
      }
    }
  }

  // 拖动滑块时触发
  const sliderChange = useCallback(
    (value: number) => {
      setIsChanging(true)
      if (audioRef.current && duration > 0) {
        const currentTime = (value / 100) * duration * 1000 // 计算当前播放时间（毫秒）
        setCurrentTime(currentTime)
        setProgress(value)
      }
    },
    [duration]
  )

  // 手指抬起时触发
  const slideAfterChange = useCallback(
    (value: number) => {
      if (audioRef.current && duration > 0) {
        const currentTimeSec = (value / 100) * duration // 计算当前播放时间（秒）
        audioRef.current.currentTime = currentTimeSec
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
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button className="btn sprite_playbar prev"></button>
          <button
            className="btn sprite_playbar play"
            onClick={playMusic}
          ></button>
          <button className="btn sprite_playbar next"></button>
        </BarControl>
        <BarPlayerInfo>
          <div className="image">
            <Link to="/discover/player">
              {picUrl && <img src={formateImgUrl(picUrl, 34)} />}
            </Link>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.songs?.[0]?.name}</span>
              <span className="singer-name">
                {currentSong?.songs?.[0]?.al?.name}
              </span>
            </div>
            <div className="progress">
              <Slider
                value={progress}
                onChange={sliderChange}
                onAfterChange={slideAfterChange}
                min={0}
                max={100}
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
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="auto"
      />
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
