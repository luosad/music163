import React, { use } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '@/router'
import { Suspense } from 'react'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppPlayerBar from './views/player/app-player-bar'

//获取store的类型
// type FType = typeof store.getState
// type FnType = ReturnType<FType>

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>

      {/* 播放器工具栏 */}
      <AppPlayerBar />
      <AppFooter></AppFooter>
    </div>
  )
}

export default App
