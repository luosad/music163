import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'

const obj = {
  name: 'zhangsan',
  age: 18
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
