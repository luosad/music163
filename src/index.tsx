import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import '@/assets/css/index.less'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import theme from './assets/theme'

import App from '@/App'
import store from '@/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {/* <HashRouter> */}
      <BrowserRouter>
        <App />
        {/* </HashRouter> */}
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)
