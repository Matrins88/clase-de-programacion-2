
import React, { useEffect, useState } from 'react'
import './LoginScreen.css'
import LOCALSTORAGE_KEYS from '../../constants/localstorage'
import { useNavigate} from 'react-router-dom'
import { login } from '../../services/authService'
import useForm from '../../hooks/useForm'

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
        email:form_state.email, 
        password:form_state.password
      })
      if (server_response_data.ok){
    if (server_response_data.status === 200){//lo mando a la pantalla de inicio
        //guardar las cosas en el localstorage
    localStorage.setItem(
    LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN,//y lo llamo
    server_response_data.data.authorization_token 
     )
      navigate('/home')// redirecciona a home
    }
  } else{
    setError(server_response_data.message)
  }

}
catch (error){
  setError (error.message)
}
finally{
  setLoading(false)
}
  }
    
 const {form_state, handleSubmit, handleChange}= useForm({onSubmit})// capturo al form state, retorna lo que necesito

  //ESTADOS EN REACT: controlan cuando se va a re renderizar un componente
  // {email: '', password: ''}
useEffect(() => {
  if (error) console.log("Error:", error)
}, [error])

  return (
    <div>
      <h1>Login</h1>
     <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'> Ingresa tu email:</label>
        <input 
        id='email' 
        name='email' 
        placeholder='joedoe@mail.com' 
        type='email'
        value={form_state.email}
        onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='password'> Ingresa tu contraseña</label>
        <input 
        id='password' 
        name='password' 
        type='password'
        value={form_state.password}
        onChange={handleChange}
        />
      </div>
      {error && <span style={{color: 'red'}}>{error}</span>}// muestra la contraseña no valida
      {
        loading
        ? <button type= 'button' disabled= {loading}>Cargando </button>
        : <button type= 'submit'>Iniciar sesion</button>
      }
     </form>
    </div>
  )
}

export default LoginScreen
