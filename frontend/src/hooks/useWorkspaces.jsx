// para home screen
import { useEffect, useState } from 'react'
import { getAllWorkspaces } from '../services/workspacesService'

const useWorkspaces = () => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        setLoading(true)
        const data = await getAllWorkspaces()
        setResponse(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkspaces()
  }, [])

  return { 
    response, 
    loading, 
    error 
}
}

export default useWorkspaces
