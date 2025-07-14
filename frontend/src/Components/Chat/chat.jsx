import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useCustomQuery from '../../hooks/useCustomQuery'
import { createNewMessage, getAllMessagesByChannelId } from '../../services/messagesService'
import useForm from '../../hooks/useForm'
import './chat.css'

const Chat = () => {
  const { channel_id, workspace_id } = useParams();
  const { response: server_messages_response, loading, error, sendRequest } = useCustomQuery();

  useEffect(() => {
    sendRequest(async () => getAllMessagesByChannelId({ channel_id, workspace_id }));
  }, [channel_id]);

  const initial_state_form = {
    content: ''
  };

  const handleSubmitNewMessage = () => {
    sendRequest(
      async () => await createNewMessage({ channel_id, workspace_id, content: form_state.content })
    );
  };

  const { form_state, handleSubmit, handleChange } = useForm({
    onSubmit: handleSubmitNewMessage,
    initial_form_state: initial_state_form
  });

  if (loading) return <span>Cargando...</span>;

  return (
    <div className="chat-wrapper">
      <h1 className="chat-header"> Mi espacio de trabajo: Mensajes</h1>

      <div className="messages-container">
        {
          !server_messages_response?.data?.messages
            ? <p className="no-messages">No hay mensajes aún.</p>
            : server_messages_response.data.messages.map((message) => (
                <div key={message._id} className="message-item">
                  <span className="message-author">{message.user?.name || "Usuario desconocido"}</span>
                  <p className="message-content">{message.content}</p>
                </div>
              ))
        }
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <label htmlFor="content" className="chat-label">Escribe tu mensaje:</label>
        <textarea
          name="content"
          id="content"
          onChange={handleChange}
          value={form_state.content}
          className="chat-textarea"
          placeholder="Escribe aquí..."
          rows={4}
          required
        />
        <button type="submit" className="chat-submit-button">Enviar mensaje</button>
      </form>
    </div>
  );
};

export default Chat;
