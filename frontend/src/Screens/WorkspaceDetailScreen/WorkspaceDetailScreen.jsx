import React, { useEffect, useState } from 'react'
import { createChannel, getChannels } from '../../services/channelService'
import { Navigate, useParams } from 'react-router-dom'
import SidebarChannels from '../../Components/SidebarChannels/SidebarChannels'
import useCustomQuery from '../../hooks/useCustomQuery'
import Chat from '../../Components/Chat/Chat'
import useForm from '../../hooks/useForm'
import './WorkspaceDetailScreen.css'

const WorkspaceDetailScreen = () => {
  const auth_user = JSON.parse(localStorage.getItem("AUTH_USER"))
  const auth_token = localStorage.getItem("AUTHORIZATION_TOKEN")
  const { workspace_id, channel_id } = useParams()
  const [is_creating_channel, setIsCreatingChannel] = useState(false)

  const handleSubmitNewChannel = () => {
    sendRequest(async () =>
      await createChannel({
        name: form_state.name,
        workspace_id: workspace_id,
        user_id: auth_user?._id
      })
    )
    setIsCreatingChannel(false)
  }

  const handleAddMemberToChannel = async (channel_id, email) => {
    const response = await fetch(`http://localhost:3000/api/channels/${channel_id}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al agregar miembro')
    }

    return await response.json()
  }

  const initial_form_state = {
    name: ''
  }

  const {
    form_state,
    handleSubmit,
    handleChange
  } = useForm({
    onSubmit: handleSubmitNewChannel,
    initial_form_state
  })

  const handleChangeCreateMode = () => {
    setIsCreatingChannel(true)
  }

  const handleQuitCreateMode = () => {
    setIsCreatingChannel(false)
  }

  const {
    response: channels_response,
    error,
    loading,
    sendRequest
  } = useCustomQuery()

  useEffect(() => {
    sendRequest(async () => getChannels({ workspace_id }))
  }, [workspace_id])

  if (!loading && channels_response) {
    if (!channel_id && channels_response.data.channels.length > 0) {
      return (
        <Navigate to={`/workspaces/${workspace_id}/channels/${channels_response.data.channels[0]._id}`} />
      )
    }
  }

  if (loading) {
    return (
      <div className="workspace-detail">
        <h1>Cargando espacios de trabajo...</h1>
        <div className="workspace-detail-content">
          <div className="sidebar-channels"></div>
          <div className="chat-container"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="workspace-detail">
      <h1>Detalle del espacio de trabajo</h1>
      <div className="workspace-detail-content">
        <div className="sidebar-channels">
          {
            !loading && channels_response && (
              <SidebarChannels
                channels={channels_response.data.channels}
                is_creating_channel={is_creating_channel}
                onClickCreateChannel={handleChangeCreateMode}
                onCancelCreateChannel={handleQuitCreateMode}
                onSubmitCreateChannel={handleSubmit}
                form_create_channel={form_state}
                onChangeCreateChannel={handleChange}
                onAddMemberToChannel={handleAddMemberToChannel} // ✅ NUEVO
              />
            )
          }
        </div>

        {
          channel_id &&
          !loading &&
          channels_response &&
          channels_response.data.channels.length > 0 && (
            <div className="chat-container">
              <Chat />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default WorkspaceDetailScreen
