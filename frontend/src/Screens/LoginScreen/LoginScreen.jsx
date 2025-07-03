
import React, { useEffect, useState } from 'react'
import './LoginScreen.css'
import LOCALSTORAGE_KEYS from '../../constants/localstorage'
import { useNavigate} from 'react-router-dom'
import { login } from '../../services/authService'
import useForm from '../../hooks/useForm'
import { LOGIN_FIELD_NAMES } from '../../constants/form/login'


const LoginScreen = () => {
   const [error, setError] = useState(null)// capturo los error en un estado
  const [loading, setLoading] = useState(false)// estado para saber si estoy cargando o no
    // capturo los valores de mi formulario y los envio a mi api

  const navigate = useNavigate()// sirve para navegar entre rutas
    // esta funcion es la accion que se ejecutara cuando envie el formulario
    const onSubmit = async()=>{
       try{
  
       setLoading(true)
       const server_response_data = await login({ //los envio a la API
         email: form_state[LOGIN_FIELD_NAMES.EMAIL],
                password: form_state[LOGIN_FIELD_NAMES.PASSWORD]
            })
            if (server_response_data.ok) {
                localStorage.setItem(
                    LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN,
                    server_response_data.data.authorization_token
                )
                navigate('/home')
            }
            else {
                setError(server_response_data.message)
            }
        }
        catch (error) {
            setError('Ocurrio un error al comunicarnos con el servidor (intentalo mas tarde)')
        }
        finally{
            setLoading(false)
        }
    }
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
                {error && <span style={{ color: 'red' }}>{error}</span>}
                {
                    loading
                        ? <button type='button' disabled={loading}>Cargando</button>
                        : <button type='submit' >Iniciar sesion</button>
                }

            </form>
        </div>
    )
}

export default LoginScreen