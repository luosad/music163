import { FC, memo, useState, useCallback, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Input, Modal, InputRef } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'
import {
  changeKeywordsAction,
  fetchSearchResultAction
} from '@/components/app-header/store/search'
import { IRootState, useMyDispatch, useMySelector } from '@/store'
import headerTitles from '@/assets/data/header_titles.json'
import Login from '@/views/login'
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight,
  SearchWrapper,
  SuggestList
} from './style'
import { getSearchResult } from './service/search'

interface Iprops {
  children?: ReactNode
}

interface SuggestItem {
  id: number
  name: string
  type: number
}

const AppHeader: FC<Iprops> = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [suggestions, setSuggestions] = useState<SuggestItem[]>([])
  const [showSuggest, setShowSuggest] = useState(false)
  const dispatch = useMyDispatch()
  const inputRef = useRef<InputRef>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const { token, userInfo } = useMySelector((state: IRootState) => state.login)
  const isLogin = !!token

  //获取建议项
  const fetchSuggest = useRef(
    debounce(async (keywords: string) => {
      if (!keywords.trim()) {
        setSuggestions([])
        setShowSuggest(false)
        return
      }

      try {
        const data = await getSearchResult(keywords)
        const songs = data.result?.songs || []
        const artists = data.result?.artists || []
        const playlists = data.result?.playlists || []

        //统一管理获得的数据
        const suggestList: SuggestItem[] = [
          ...songs.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: 1
          })),
          ...artists.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: 100
          })),
          ...playlists.map((item: any) => ({
            id: item.id,
            name: item.name,
            type: 1000
          }))
        ]

        setSuggestions(suggestList)
        setShowSuggest(true)
      } catch (err) {
        console.error('搜索建议接口出错:', err)
        setSuggestions([])
        setShowSuggest(false)
      }
    }, 300)
  ).current

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setKeyword(val)
    fetchSuggest(val)
  }

  const handleSearch = useCallback(
    (value: string) => {
      if (!value.trim()) return
      dispatch(changeKeywordsAction(value))
      dispatch(fetchSearchResultAction(value))

      const encoded = encodeURIComponent(value)
      const url = `https://music.163.com/#/search/m/?s=${encoded}&type=1`
      window.open(url, '_blank')
    },
    [dispatch]
  )

  //点击建议项跳转
  const onClickSuggest = (item: SuggestItem) => {
    const encodedName = encodeURIComponent(item.name)
    const url = `https://music.163.com/#/search/m/?s=${encodedName}&type=1`
    window.open(url, '_blank')
  }

  const onSearchTrigger = () => {
    handleSearch(keyword)
    setShowSuggest(false)
  }

  //在页面外点击取消建议框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.input?.contains(event.target as Node)
      ) {
        setShowSuggest(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // 虚拟列表单项渲染
  const Row = ({ index, style }: ListChildComponentProps) => {
    const item = suggestions[index]
    return (
      <li
        style={style}
        key={item.id}
        onClick={() => onClickSuggest(item)}
        className="suggest-item"
      >
        {item.name}{' '}
        {item.type === 1 ? '(单曲)' : item.type === 100 ? '(歌手)' : '(歌单)'}
      </li>
    )
  }

  // 修改renderSuggest使用react-window虚拟列表
  const renderSuggest = () => {
    if (!showSuggest || suggestions.length === 0) return null
    return (
      <SuggestList>
        <List
          height={240} // 整个建议框高度，可根据实际需求调整
          itemCount={suggestions.length}
          itemSize={40} // 每一项高度固定40px，确保虚拟列表正常计算
          width="100%"
        >
          {Row}
        </List>
      </SuggestList>
    )
  }

  const showItem = (item: any) => {
    if (item.type === 'path') {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return (
        <a href={item.link} target="_blank" rel="noreferrer">
          {item.title}
        </a>
      )
    }
  }

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo sprite_01" href="/">
            网易云音乐
          </a>
          <div className="title-list">
            {headerTitles.map((item) => (
              <div className="item" key={item.title}>
                {showItem(item)}
              </div>
            ))}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <SearchWrapper ref={searchRef}>
            <Input
              ref={inputRef}
              className="search"
              placeholder="音乐/视频/电台/用户"
              value={keyword}
              prefix={<SearchOutlined onClick={onSearchTrigger} />}
              onChange={onInputChange}
              onPressEnter={onSearchTrigger}
              autoComplete="off"
              onFocus={() => {
                // 只要 keyword 有内容且有建议，就重新显示建议框
                if (keyword.trim() && suggestions.length > 0) {
                  setShowSuggest(true)
                }
              }}
            />
            {renderSuggest()}
          </SearchWrapper>
          <span className="center">创作者中心</span>
          {isLogin ? (
            <span className="login">个人中心（{userInfo?.nickname}）</span>
          ) : (
            <a
              className="login"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setIsOpen(true)
              }}
            >
              登录
            </a>
          )}
          <Modal
            title="登录"
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={null}
          >
            <Login onClose={() => setIsOpen(false)} />
          </Modal>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
