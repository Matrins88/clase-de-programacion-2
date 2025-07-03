import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useCustomQuery from '../../hooks/useCustomQuery'
import { createNewMessage, getAllMessagesByChannelId } from '../../services/messagesService'
import useForm from '../../hooks/useForm'


const Chat = () => {
  const { channel_id, workspace_id } = useParams()
  const { response: server_messages_response, loading, error, sendRequest } = useCustomQuery()
  useEffect(() => {
    sendRequest(async () => getAllMessagesByChannelId({ channel_id, workspace_id }))
  }, [channel_id]) //Dependencias: channel_id, cada vez que cambie el channel_id se ejecuta el useEffect

  const initial_state_form = {
    content: ''
  }
  const handleSubmitNewMessage = () => {
    sendRequest(
      async () => await createNewMessage({ channel_id, workspace_id, content: form_state.content })
    )
  }
  const { form_state, handleSubmit, handleChange } = useForm({
    onSubmit: handleSubmitNewMessage,
    initial_form_state: initial_state_form
  })
  if (loading) return <span>cargando...</span>
  return (
    <div>
      <h1>Mensajes:</h1>


     

     {
  !server_messages_response?.data?.messages
    ? <p>No hay mensajes aún.</p>
    : server_messages_response.data.messages.map((message) => (
        <div key={message._id}>
          <b>Autor: {message.user?.name || "Usuario desconocido"}</b>
          <p>{message.content}</p>
        </div>
      ))
}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Escribe tu mensaje:</label>
          <textarea name="content" id="content" onChange={handleChange} value={form_state.content}></textarea>
        </div>
        <button type="submit">Enviar mensaje</button>
      </form>
    </div>
  )
}

export default Chat