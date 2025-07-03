import ENVIRONMENT from "../constants/environment"
import LOCALSTORAGE_KEYS from "../constants/localstorage"
import methods_HTTP from "../constants/methodsHTTP"

export const getChannels = async ({workspace_id}) => {
    try{
          if (!workspace_id || !/^[0-9a-fA-F]{24}$/.test(workspace_id)) {
            throw new Error('workspace_id inválido');
        }
         const server_response = await fetch(
             `${ENVIRONMENT.URL_API}/api/channels/${workspace_id} `,
            {
                method: methods_HTTP.GET,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)}`
                }
            }
        )
        const data = await server_response.json()
        return data
    }
    catch(error){
        console.error('erro al obtener los canales',error)
        throw error
    }
}
export const createChannel = async ({name, workspace_id, user_id}) => {
    try{
        const server_response = await fetch(
            `${ENVIRONMENT.URL_API}/api/channels/${workspace_id}`, 
            {
                method: methods_HTTP.POST,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)}`
                },
                body: JSON.stringify({name, user_id})
            }
        )
        const data = await server_response.json()
        return data
    }
    catch(error){
        console.error('Error al crear canales', error)
        throw error
    }
} 
export const addMemberToChannel = async (workspace_id, channel_id, email) => {
  const token = localStorage.getItem("AUTHORIZATION_TOKEN");

  const res = await fetch(`${ENVIRONMENT.URL}/api/channel-members/${workspace_id}/${channel_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'No se pudo agregar el miembro');
  }

  return data;
};
