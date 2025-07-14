
import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import './MainLayout.css' // vamos a crear este archivo

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default MainLayout
