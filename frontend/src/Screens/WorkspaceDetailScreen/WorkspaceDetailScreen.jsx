import React, { useEffect, useState } from 'react'
import { createChannel, getChannels } from '../../services/channelService'
import { Navigate, useParams, Link } from 'react-router-dom'
import useCustomQuery from '../../hooks/useCustomQuery'
import useForm from '../../hooks/useForm'
import './WorkspaceDetailScreen.css'
import Chat from '../../Components/Chat/chat'

const WorkspaceDetailScreen = () => {
  const auth_user = JSON.parse(localStorage.getItem("AUTH_USER"))
  const auth_token = localStorage.getItem("AUTHORIZATION_TOKEN")
  const { workspace_id, channel_id } = useParams()
  const [is_creating_channel, setIsCreatingChannel] = useState(false)
  const [showAddFormFor, setShowAddFormFor] = useState(null)
  const [emailToAdd, setEmailToAdd] = useState('')
  const [message, setMessage] = useState('')

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

  const { form_state, handleSubmit, handleChange } = useForm({
    onSubmit: handleSubmitNewChannel,
    initial_form_state
  })

  const handleChangeCreateMode = () => setIsCreatingChannel(true)
  const handleQuitCreateMode = () => setIsCreatingChannel(false)

  const { response: channels_response, loading, sendRequest } = useCustomQuery()

  useEffect(() => {
    sendRequest(async () => getChannels({ workspace_id }))
  }, [workspace_id])

  if (!loading && channels_response) {
    if (!channel_id && channels_response.data.channels.length > 0) {
      return <Navigate to={`/workspaces/${workspace_id}/channels/${channels_response.data.channels[0]._id}`} />
    }
  }

  if (loading) {
    return (
      <div className="workspace-detail">
        <h1>Cargando espacios de trabajo...</h1>
      </div>
    )
  }

  return (
    <div className="workspace-detail">
      <h1>Miespacio de trabajo</h1>

      <aside className="sidebar">
  <div className="logo">Mi App</div>

  {/* Botón para volver al inicio */}
  <Link to="/home" className="sidebar-link back-button">
   Inicio
  </Link>

  <div className="user-info">Usuario: {auth_user?.name || 'Invitado'}</div>

  <nav>
    <div className="section-title">Canales</div>

    {/* Lista de canales */}
    {channels_response?.data.channels.length > 0 ? (
      channels_response.data.channels.map(channel => (
        <div key={channel._id} className="channel-block">
          <Link
            to={`/workspaces/${workspace_id}/channels/${channel._id}`}
            className="channel-link"
          >
            {channel.name}
          </Link>

          <button
            className="add-member-toggle"
            onClick={() =>
              setShowAddFormFor(prev => (prev === channel._id ? null : channel._id))
            }
          >
            {showAddFormFor === channel._id ? 'Cancelar' : 'Agregar miembro'}
          </button>

          {showAddFormFor === channel._id && (
            <form
              onSubmit={e => {
                e.preventDefault()
                handleAddMemberToChannel(channel._id, emailToAdd)
                  .then(() => setMessage('Miembro agregado con éxito'))
                  .catch(error => setMessage(error.message || 'Error al agregar miembro'))
                setEmailToAdd('')
                setTimeout(() => setMessage(''), 4000)
              }}
              className="add-member-form"
            >
              <input
                type="email"
                placeholder="Email del miembro"
                value={emailToAdd}
                onChange={e => setEmailToAdd(e.target.value)}
                required
              />
              <button type="submit">Agregar</button>
            </form>
          )}
        </div>
      ))
    ) : (
      <p>No hay canales</p>
    )}

    {!is_creating_channel ? (
      <button onClick={handleChangeCreateMode} className="create-channel-button">
        Crear canal
      </button>
    ) : (
      <form onSubmit={handleSubmit} className="create-channel-form">
        <input
          type="text"
          placeholder="Nuevo canal"
          name="name"
          value={form_state.name}
          onChange={handleChange}
        />
        <button type="submit">Crear</button>
        <button type="button" onClick={handleQuitCreateMode}>
          Cancelar
        </button>
      </form>
    )}
  </nav>
</aside>

      <main className="chat-container">
        {channel_id && <Chat />}
      </main>
    </div>
  )
}

export default WorkspaceDetailScreen
