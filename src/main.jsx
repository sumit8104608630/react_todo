import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './Log-in.jsx'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='flex justify-center items-center '>
    <Login></Login>
    <App/>
    </div>
  </React.StrictMode>,
)
