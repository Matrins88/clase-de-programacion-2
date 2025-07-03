import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import AuthProtectRoute from './Components/AuthProtectRoute/AuthProtectRoute'
import WorkspaceDetailScreen from './Screens/WorkspaceDetailScreen/WorkspaceDetailScreen'
import NewWorkspaceScreen from './Screens/NewWorkspaceScreen/NewWorkspaceScreen'
import ProtectedLayout from './Components/ProtectedLayout/ProtectedLayout'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route element={<AuthProtectRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route path='/home' element={<HomeScreen />} />
          <Route path='/new' element={<NewWorkspaceScreen />} />
          <Route path='/workspaces/:workspace_id' element={<WorkspaceDetailScreen />} />
          <Route path='/workspaces/:workspace_id/channels/:channel_id' element={<WorkspaceDetailScreen />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
