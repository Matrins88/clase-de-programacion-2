import React, { useEffect, useState } from 'react'
import './HomeScreen.css'
import {getAllWorkspaces} from '../../services/workspacesService'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState (true)

  const getWorkspaces = async () =>{
try{
    setLoading(true)
    const data = await getAllWorkspaces()
    setResponse(data)
  }
  catch(error){
    console.error('error al obtener el workspaces', error)
  }
  finally{
    setLoading(false)
  }
}
  useEffect (
    () =>{
       getWorkspaces()
    },
    []
  )
  console.log({loading, response})
  return (
    <div>
      <h1>
        Tus espacios de trabajo</h1>
        <div>
          {
            loading
            ? <h2> Cargando...</h2>
            : <div>
              {
                response.data.workspaces.map(
                  (element) =>{
                    return (
                      <div>
                        <h2>{element.workspace.name} </h2>
                        <Link to={'/workspace/' + element.workspace._id}>Ir a espacio de trabajo </Link>
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