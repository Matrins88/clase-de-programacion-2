//trabajar las consultas de autentificacion

import ENVIRONMENT from "../constants/environment";
import methods_HTTP from "../constants/methodsHTTP";

export const login = async ({email,password}) =>{
    try{
     // los envio a mi API// consultas
 
     const server_response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/users/login`,// recibo la dire donde hago la consulta
    {// y un objeto con los datos que quiero enviar
      method: methods_HTTP.POST,
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({// envio un json, no se puede enviar un objeto, un string
        email: email,
        password: password
      })
    });
  const server_response_data = await server_response_http.json()
  return server_response_data
}
catch (error){
    console.error(error)
    throw{
        message: 'Ocurrio un error al comuinicarnos con el servidor (intentalo mas tarde)'
    }
}
}
export const register = async ({ email, password, name}) => {
    try {
        const server_response_http = await fetch(
            `${ENVIRONMENT.URL_API}/api/users/register`,
            {
                method: methods_HTTP.POST,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: email,
                        password: password,
                        name: name
                    }
                )
            }
        )
        const server_response_data = await server_response_http.json()
        return server_response_data
    }
    catch(error){
        console.error(error)
        throw {
            message: 'Ocurrio un error al comunicarnos con el servidor (intentalo mas tarde)' 
        }
    }
}