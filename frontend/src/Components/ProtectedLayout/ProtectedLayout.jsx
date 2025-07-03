import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './ProtectedLayout.css'; // te paso el CSS después

const ProtectedLayout = () => {
  return (
    <div className="app-container slack-layout">
      <aside className="sidebar">
        <h2 className="sidebar-logo">MiApp</h2>

        <nav className="sidebar-nav">
          <NavLink 
            to="/home" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >Inicio
          </NavLink>

          <NavLink 
            to="/new" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Crear Workspace
          </NavLink>

          {/* Ejemplo fijo de workspace */}
          <NavLink 
            to="/workspaces/123abc" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Mi Workspace
          </NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
