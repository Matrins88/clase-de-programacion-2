import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './SidebarChannel.css'

const SidebarChannels = ({
  channels,
  is_creating_channel,
  onClickCreateChannel,
  onCancelCreateChannel,
  onSubmitCreateChannel,
  form_create_channel,
  onChangeCreateChannel,
  onAddMemberToChannel // función para agregar miembro por canal
}) => {
  const [showAddFormFor, setShowAddFormFor] = useState(null)
  const [emailToAdd, setEmailToAdd] = useState('')
  const [message, setMessage] = useState('')

  const handleAddMember = async (e, channel_id) => {
    e.preventDefault()
    try {
      await onAddMemberToChannel(channel_id, emailToAdd)
      setMessage('Miembro agregado con éxito')
    } catch (error) {
      setMessage('Hubo un error al agregar el miembro')
    
      if (error.response && error.response.data && error.response.data.message) {
      setMessage(`${error.response.data.message}`)
    } else if (error.message) {
      setMessage(` ${error.message}`)
    } else {
      setMessage(' Hubo un error al agregar el miembro')
    }
  }
    setEmailToAdd('')
    setTimeout(() => setMessage(''), 4000)
  }

  return (
    <aside className="sidebar-channels">
      <nav>
        {
          channels.length > 0 
            ? channels.map((channel) => (
                <React.Fragment key={channel._id}>
                  <Link 
                    to={`/workspaces/${channel.workspace_id}/channels/${channel._id}`}
                    className="channel-link"
                  >
                    {channel.name}
                  </Link>
                  
                  {/* Botón para mostrar formulario de agregar miembro */}
                  <button 
                    className="add-member-toggle"
                    onClick={() => setShowAddFormFor(prev => prev === channel._id ? null : channel._id)}
                  >
                    {showAddFormFor === channel._id ? 'Cancelar' : 'Agregar miembro'}
                  </button>

                  {
                    showAddFormFor === channel._id && (
                      <form 
                        onSubmit={(e) => handleAddMember(e, channel._id)} 
                        className="add-member-form"
                      >
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

                  {message && <p className="message-text">{message}</p>}
                  <hr />
                </React.Fragment>
              ))
            : <p>No hay canales</p>
        }

        <hr />

        {
          !is_creating_channel 
          ? <button onClick={onClickCreateChannel} className="create-channel-button">
              Crear canal
            </button>
          : (
            <form onSubmit={onSubmitCreateChannel} className="create-channel-form">
              <input 
                type="text" 
                placeholder='Nuevo canal'
                name='name'
                value={form_create_channel.name}
                onChange={onChangeCreateChannel}
              />
              <button type='submit'>Crear</button>
              <button type='button' onClick={onCancelCreateChannel}>Cancelar</button>
            </form>
          )
        }

        <Link to="/home" className="back-button">
          ← Espacios de trabajo
        </Link>
      </nav>
    </aside>
  )
}
export default SidebarChannels

