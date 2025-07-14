import React from 'react'
import { Route, Routes } from 'react-router-dom'

import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import AuthProtectRoute from './Components/AuthProtectRoute/AuthProtectRoute'
import WorkspaceDetailScreen from './Screens/WorkspaceDetailScreen/WorkspaceDetailScreen'
import NewWorkspaceScreen from './Screens/NewWorkspaceScreen/NewWorkspaceScreen'
import MainLayout from './Layouts/MainLayout' // 💡 Importamos el layout nuevo

const App = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path='/' element={<LoginScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      {/* Rutas protegidas */}
      <Route element={<AuthProtectRoute />}>
        <Route
          path='/home'
          element={
            <MainLayout>
              <HomeScreen />
            </MainLayout>
          }
        />
        <Route
          path='/new'
          element={
            <MainLayout>
              <NewWorkspaceScreen />
            </MainLayout>
          }
        />
        <Route
          path='/workspaces/:workspace_id'
          element={
            <MainLayout>
              <WorkspaceDetailScreen />
            </MainLayout>
          }
        />
        <Route
          path='/workspaces/:workspace_id/channels/:channel_id'
          element={
            <MainLayout>
              <WorkspaceDetailScreen />
            </MainLayout>
          }
        />
      </Route>
    </Routes>
  )
}

export default App

