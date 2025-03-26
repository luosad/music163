import React, { use } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import routes from '@/router'
import { Suspense } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useMySelector, useMyDispatch } from '@/store'
import { changeMessage } from './store/modules/counter'
import store from '@/store'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'

//获取store的类型
// type FType = typeof store.getState
// type FnType = ReturnType<FType>

function App() {
  //获取store的数据
  const { count, message } = useMySelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message
    }),
    shallowEqual
  )

  //事件处理函数
  const dispatch = useMyDispatch()
  function handleChangeMessage() {
    // console.log('handleChangeMessage')
    //这里的changeMessage实际是一个action，通过dispatch触发，然后传递给reducer处理
    dispatch(changeMessage('修改了消息'))
  }

  return (
    <div className="App">
      <AppHeader></AppHeader>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter></AppFooter>
      {/* <h2>当前计数：{count}</h2>
      <h2>当前消息:{message}</h2>
      <button onClick={handleChangeMessage}>修改消息</button> */}
    </div>
  )
}

export default App
