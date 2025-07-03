import ENVIRONMENT from "../constants/environment"
import LOCALSTORAGE_KEYS from "../constants/localstorage"
import methods_HTTP from "../constants/methodsHTTP"

  export const getAllMessagesByChannelId = async ({channel_id, workspace_id}) => {
    try {
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.URL_API + `/api/messages/${workspace_id}/${channel_id}`, {
            method: methods_HTTP.GET,
            headers: {
                'Authorization': `Bearer ${auth_token}`
            }
        })
        const data = await server_response.json()
        return data
    } catch (error) {
        console.error('error al obtener los mensajes', error)
        throw error
    }

 }
 export const createNewMessage = async ({channel_id, workspace_id, content}) => {
    try{
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.URL_API + `/api/messages/${workspace_id}/${channel_id}`, {
            method: methods_HTTP.POST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_token}`
            },
            body: JSON.stringify({
                content
            })
        })
        const data = await server_response.json()
        return data
    }
    catch(error){
        console.error('Error al crear mensajes', error)
        throw error
    }
}