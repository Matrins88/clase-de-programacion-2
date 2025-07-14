import React, { useEffect } from 'react'
import { getChannels } from '../../services/channelService'
import { Navigate, useParams, Link } from 'react-router-dom'
import useCustomQuery from '../../hooks/useCustomQuery'
import './WorkspaceDetailScreen.css'
import Chat from '../../Components/Chat/chat'

const WorkspaceDetailScreen = () => {
  const auth_user = JSON.parse(localStorage.getItem("AUTH_USER"))
  const { workspace_id, channel_id } = useParams()

  const { response: channels_response, loading, sendRequest } = useCustomQuery()

  useEffect(() => {
    sendRequest(async () => getChannels({ workspace_id }))
  }, [workspace_id])

  if (!loading && channels_response && !channel_id && channels_response.data.channels.length > 0) {
    return <Navigate to={`/workspaces/${workspace_id}/channels/${channels_response.data.channels[0]._id}`} />
  }

  if (loading) {
    return <div className="workspace-detail"><h1>Cargando espacios de trabajo...</h1></div>
  }

  return (
    <div className="workspace-detail">
      <main className="chat-container">
        <div className="section-title">Canales</div>

        {channels_response?.data.channels.length > 0 ? (
          channels_response.data.channels.map(channel => (
            <div key={channel._id} className="channel-block">
              <Link
                to={`/workspaces/${workspace_id}/channels/${channel._id}`}
                className="channel-link"
              >
                {channel.name}
              </Link>
            </div>
          ))
        ) : (
          <p>No hay canales</p>
        )}

        {channel_id && <Chat />}
      </main>
    </div>
  )
}

export default WorkspaceDetailScreen
