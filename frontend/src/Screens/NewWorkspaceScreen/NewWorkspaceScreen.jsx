import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import useCustomQuery from '../../hooks/useCustomQuery'
import { createWorkspace } from '../../services/workspacesService'
import { Link, useNavigate } from 'react-router-dom'
import './NewWorkspaceScreen.css'


const NewWorkspaceScreen = () => {
    const navigate = useNavigate()
    const { response, loading, error, sendRequest } = useCustomQuery()
    const initial_form_state = {
        name: '',
        description: ''
    }

    const handleSubmitNewWorkspace = () => {
        sendRequest(async () => await createWorkspace(form_state))
    }

    const { form_state, handleSubmit, handleChange } = useForm({
        onSubmit: handleSubmitNewWorkspace,
        initial_form_state
    })

    useEffect(() => {
        if(response && !loading && response.ok){
            navigate(`/home`)
        }
    }, [response])


    return (
          <div className="new-workspace-screen">
           
            {
                loading
                    ? <span>cargando...</span>
                    : <>

                        <h1>Crear espacio de trabajo</h1>
                         <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                            
                                <label htmlFor='name'>Nombre</label>
                                <input
                                    type="text"
                                    name='name'
                                    id='name'
                                    value={form_state.name}
                                    onChange={handleChange}
                                />
                            </div>
                           <div className="form-group">
                                <label htmlFor='description'>Descripcion</label>
                                <input
                                    type="text"
                                    name='description'
                                    id='description'
                                    value={form_state.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className="create-button">Crear workspace</button>
                        </form>
                        </div>
                    </>
            }

        </div>
    )
}

export default NewWorkspaceScreen