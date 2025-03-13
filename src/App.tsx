import React, { use } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import routes from '@/router'
import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { useMySelector } from '@/store'
import store from '@/store'

//获取store的类型
// type FType = typeof store.getState
// type FnType = ReturnType<FType>

function App() {
  const { count } = useMySelector((state) => ({
    count: state.counter.count
  }))
  return (
    <div className="App">
      <div className="nav">
        <Link to="/discover">发现音乐</Link>
        <Link to="/mine">我的音乐</Link>
        <Link to="/focus">关注</Link>
        <Link to="/download">下载客户端</Link>
      </div>
      <h2>当前计数：{count}</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  )
}

export default App
