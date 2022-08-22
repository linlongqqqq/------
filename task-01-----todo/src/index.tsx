import React from 'react'
import './assets/styles/global.scss'
import './assets/font/iconfont.css'
import ReactDOM from 'react-dom/client'
// import Dask from './pages/Dask/index'
// import Finish from './pages/Finish'
// import Important from './pages/important'
import App from './pages/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
