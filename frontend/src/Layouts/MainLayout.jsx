import React, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import './MainLayout.css'
import { FaBars } from 'react-icons/fa'

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Cierra sidebar móvil al pasar a desktop
  useEffect(() => {
    if (isDesktop) setSidebarOpen(false)
  }, [isDesktop])

  return (
    <div className="main-layout">
      {/* Header móvil con menú hamburguesa */}
      {!isDesktop && (
        <header className="mobile-header">
          <button className="menu-button" onClick={() => setSidebarOpen(true)}>
            <FaBars size={24} />
          </button>
          <h1 className="app-title">Mi App</h1>
        </header>
      )}

      {/* Sidebar: fijo en desktop, drawer en móvil */}
      <Sidebar isOpen={isDesktop || sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Contenido principal */}
      <main className="main-content">{children}</main>
    </div>
  )
}

export default MainLayout

