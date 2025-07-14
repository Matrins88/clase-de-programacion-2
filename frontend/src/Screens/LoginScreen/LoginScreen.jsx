import React, { useState } from 'react'
import './LoginScreen.css'
import LOCALSTORAGE_KEYS from '../../constants/localstorage'
import { useNavigate, useLocation } from 'react-router-dom'  // Importamos useLocation para leer parámetros URL
import { login } from '../../services/authService'
import useForm from '../../hooks/useForm'
import { LOGIN_FIELD_NAMES } from '../../constants/form/login'



const LoginScreen = () => {
    // Estado para capturar errores y loading
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()  // Hook para obtener info de la URL

    // Obtenemos los parámetros query de la URL
    const queryParams = new URLSearchParams(location.search)
    const verified = queryParams.get('verified')  // Leemos el parámetro 'verified' si existe

    // Definimos el mensaje según el parámetro verified
    let verifiedMessage = null
    if (verified === 'already') {
      verifiedMessage = 'Tu cuenta ya fue verificada.'
    } else if (verified === 'success') {
      verifiedMessage = 'Verificación exitosa, ya podés iniciar sesión.'
    } else if (verified === 'error') {
      verifiedMessage = 'Hubo un error en la verificación.'
    } else if (verified === 'missing') {
      verifiedMessage = 'Falta el token de verificación.'
    } else if (verified === 'notfound') {
      verifiedMessage = 'Usuario no encontrado para verificar.'
    }

    // Función que se ejecuta al enviar el formulario
    const onSubmit = async () => {
        try {
            setLoading(true)
            // Llamamos a la API para login con los datos del formulario
            const server_response_data = await login({
                email: form_state[LOGIN_FIELD_NAMES.EMAIL],
                password: form_state[LOGIN_FIELD_NAMES.PASSWORD]
            })

            if (server_response_data.ok) {
                // Si la respuesta es OK guardamos el token y el usuario en localStorage
                localStorage.setItem(
                    LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN,
                    server_response_data.data.authorization_token
                )
                localStorage.setItem(
                    LOCALSTORAGE_KEYS.AUTH_USER,
                    JSON.stringify(server_response_data.data.user)
                )
                // Redirigimos al usuario a la pantalla principal
                navigate('/home')
            } else {
                // Si hubo error mostramos mensaje
                // Detectamos si el error es que el usuario no está registrado para mostrar mensaje específico
                if (
                  server_response_data.message.toLowerCase().includes('no encontrado') ||
                  server_response_data.message.toLowerCase().includes('usuario')
                ) {
                  setError('Usuario no registrado. Por favor, registrate.')
                } else {
                  setError(server_response_data.message)
                }
            }
        } catch (error) {
            // Error genérico en comunicación con backend
            setError('Ocurrio un error al comunicarnos con el servidor (intentalo mas tarde)')
        } finally {
            setLoading(false)
        }
    }

    // Hook personalizado para manejar el estado del formulario
    const { form_state, handleChange, handleSubmit } = useForm({
        onSubmit,
        initial_form_state: {
            [LOGIN_FIELD_NAMES.EMAIL]: '',
            [LOGIN_FIELD_NAMES.PASSWORD]: ''
        }
    })

    return (
        <div className="login-container">

            <form className="login-card" onSubmit={handleSubmit}>
                <h1 className="login-title">Login</h1>

                {/* Mensaje que aparece según el estado de verificación */}
                {verifiedMessage && (
                    <p style={{ color: 'green', marginBottom: '1rem' }}>
                        {verifiedMessage}
                    </p>
                )}

                <div>
                    <label htmlFor='email'>Ingresa tu mail:</label>
                    <input
                        id='email'
                        name={LOGIN_FIELD_NAMES.EMAIL}
                        placeholder='joedoe@mail.com'
                        type='email'
                        value={form_state.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor='password'>Ingresa tu Contraseña:</label>
                    <input
                        id='password'
                        name={LOGIN_FIELD_NAMES.PASSWORD}
                        type='password'
                        value={form_state.password}
                        onChange={handleChange}
                    />
                </div>

                {/* Mostrar error en rojo si existe */}
                {error && (
                  <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                    {/* Mostrar botón para ir a registro si el error indica que no está registrado */}
                    {error.includes('registrado') && (
                      <button
                        style={{ marginLeft: '1rem' }}
                        type="button"
                        onClick={() => navigate('/register')}
                      >
                        Registrate aquí
                      </button>
                    )}
                  </div>
                )}

                {/* Botones de carga o envío */}
                {
                    loading
                        ? <button type='button' disabled={loading}>Cargando</button>
                        : <button type='submit'>Iniciar sesión</button>
                }

                <div style={{ marginTop: '1rem' }}>
                    <p>¿No tenés cuenta?</p>
                    <button
                        type="button"
                        onClick={() => navigate('/register')}
                        className="register-button"
                    >
                        Registrate
                    </button>
                </div>

            </form>
        </div>
    )
}

export default LoginScreen
