import { useState } from "react"
//useCustomQuery es un hook personalizado que devuelve un objeto con la función de consulta y el estado de la consulta
//manejo las consultas desde aca para no volver llamar a la api a cada rato y solo dejar en los
//screen 
//estos son los 3 estados que nos interesa obtener en cada consulta
const useCustomQuery = () => {
    const [response, setResponse ] = useState(null)
    const [loading, setLoading] = useState (false)
    const [error, setError] = useState(null)
    


const sendRequest = async (callback) => {// callback es una funcion que se ejecuta despues de la respuesta
    try{
        setLoading(true)
        const data = await callback()// la consulta a la Api
        setResponse(data)
    }
    catch(error){
        console.error('Error al hacer la request', error)
        setError(error)
    }
    finally{
        setLoading(false)
    }
}
    return{
        response,
        loading,
        error,
        sendRequest
    }
}
export default useCustomQuery