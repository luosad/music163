import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import '@/assets/css/index.less'
import App from '@/App'
import { HashRouter } from 'react-router-dom'
import { Hash } from 'crypto'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <HashRouter>
    <App />
  </HashRouter>
)
