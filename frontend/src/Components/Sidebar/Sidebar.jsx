import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Sidebar.css'
import useCustomQuery from '../../hooks/useCustomQuery'
import useForm from '../../hooks/useForm'
import { getChannels, createChannel } from '../../services/channelService'
import ENVIRONMENT from '../../constants/environment'

const Sidebar = ({ onLogout }) => {
  const auth_user = JSON.parse(localStorage.getItem("AUTH_USER"))
  const auth_token = localStorage.getItem("AUTHORIZATION_TOKEN")
  const { workspace_id } = useParams()

  const [showAddFormFor, setShowAddFormFor] = useState(null)
  const [emailToAdd, setEmailToAdd] = useState('')
  const [message, setMessage] = useState('')
  const [is_creating_channel, setIsCreatingChannel] = useState(false)

  const initial_form_state = { name: '' }

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
    const response = await fetch(`${ENVIRONMENT.URL_API}/api/channels/${channel_id}/members`, {
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

  const {
    form_state,
    handleSubmit,
    handleChange
  } = useForm({
    onSubmit: handleSubmitNewChannel,
    initial_form_state
  })

  const {
    response: channels_response,
    loading,
    sendRequest
  } = useCustomQuery()

  useEffect(() => {
    if (workspace_id) {
      sendRequest(async () => getChannels({ workspace_id }))
    }
  }, [workspace_id])

  const channels = channels_response?.data?.channels || []

  const handleAddMember = async (e, channel_id) => {
    e.preventDefault()
    try {
      await handleAddMemberToChannel(channel_id, emailToAdd)
      setMessage('Miembro agregado con éxito')
    } catch (error) {
      setMessage(error.message || 'Hubo un error al agregar el miembro')
    }
    setEmailToAdd('')
    setTimeout(() => setMessage(''), 4000)
  }

  return (
    <aside className="sidebar">
      <nav>
        <h2 className="logo"> Mi App</h2>

        {auth_user && <p className="user-info">👤 {auth_user.name}</p>}

        <Link to="/home" className="sidebar-link"> Inicio</Link>
        <Link to="/new" className="sidebar-link"> Nuevo workspace</Link>
        <button onClick={onLogout} className="sidebar-link button-link">Cerrar sesión</button>

        {workspace_id && (
          <>
            <h3 className="section-title">📺 Canales</h3>
            {
              loading ? <p>Cargando...</p> : (
                channels.length > 0 ? channels.map((channel) => (
                  <div key={channel._id} className="channel-block">
                    <Link to={`/workspaces/${channel.workspace_id}/channels/${channel._id}`} className="channel-link">
                      #{channel.name}
                    </Link>
                    <button onClick={() => setShowAddFormFor(prev => prev === channel._id ? null : channel._id)} className="add-member-toggle">
                      {showAddFormFor === channel._id ? 'Cancelar' : 'Agregar miembro'}
                    </button>
                    {
                      showAddFormFor === channel._id && (
                        <form onSubmit={(e) => handleAddMember(e, channel._id)} className="add-member-form">
                          <input
                            type="email"
                            placeholder="Email del miembro"
                            value={emailToAdd}
                            onChange={(e) => setEmailToAdd(e.target.value)}
                            required
                          />
                          <button type="submit">Agregar</button>
                        </form>
                      )
                    }
                  </div>
                )) : <p>No hay canales</p>
              )
            }

            {
              !is_creating_channel ? (
                <button onClick={() => setIsCreatingChannel(true)} className="create-channel-button">
                  + Crear canal
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="create-channel-form">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre del canal"
                    value={form_state.name}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit">Crear</button>
                  <button type="button" onClick={() => setIsCreatingChannel(false)}>Cancelar</button>
                </form>
              )
            }
          </>
        )}

        {message && <p className="message-text">{message}</p>}
      </nav>
    </aside>
  )
}

export default Sidebar
