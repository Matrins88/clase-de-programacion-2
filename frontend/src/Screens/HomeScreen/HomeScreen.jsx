import React, { useEffect, useState } from 'react'
import './HomeScreen.css'
import { getAllWorkspaces } from '../../services/workspacesService'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(true)

  const getWorkspaces = async ( ) => {
    try{
      setLoading(true)
      const data = await getAllWorkspaces()
      setResponse(data)
    }
    catch(error){
      console.error('Error al obtener workspaces', error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(
    () => {
      getWorkspaces()
    }, 
    []
  )


  return (
   <div className="home-screen">
      <h1>Tus espacios de trabajo</h1>
      <Link to={'/new'} className="create-link">
        Crear espacio de trabajo
      </Link>
       <div className="workspaces-container">
        {
          loading 
          ? <h2>Cargando...</h2>
          : <div>
            {
              response.data.workspaces.map(
                (element) => {
                  return (
                    <div className="workspace-card" key={element.workspace._id}>
                      <h2>{element.workspace.name}</h2>
                      <Link to={'/workspaces/' + element.workspace._id}> Ir a espacio de trabajo </Link>
                    </div>
                  )
                }
              )
            }
          </div>
        }
      </div>
    </div>
  )
}

export default HomeScreen