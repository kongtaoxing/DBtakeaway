import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'
import App from './App'
import { MyProvider } from './myContext'

ReactDOM.render(
  <React.StrictMode>
    <MyProvider>
      <App />
    </MyProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
