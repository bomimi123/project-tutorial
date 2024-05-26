import React from 'react'
import './AppDowload.css'
import { assets } from '../../assets/assets'

const AppDowload = () => {
  return (
    <div className='app-dowload' id='app-dowload'>
      <p>For Better Experience Dowload <br /> Tomato App</p>
      <div className="app-dowlad-platforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDowload
