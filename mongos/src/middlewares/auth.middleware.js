import jwt from 'jsonwebtoken'
import { ENVIRONMENT } from '../environment.js'

//ejermplo para obtener autorizacion del token
const authorizationMiddleware = (request, response, next) =>{
  try{
  const authorization_header = request.headers['authorization']//obtengo verificacion header
  
  const authorization_token = authorization_header.split(' ')[1]//obtengo autorizacion token
  console.log(authorization_token)

  //verificar la firma del token
  //si el token es invalido lanzar un error "unathoriez" 401
  // si el token es valido, llamar a la siguiente funcion
  
  const authorization_token_payload = jwt.verify (authorization_token, ENVIRONMENT.JWT_SECRET_KEY)//verificco autorization token
  //se suelen guardar los adatos de sesion dentro de request.user o request.session
  request.user = authorization_token_payload
  next()

  }catch(error){
      if (error instanceof jwt.JsonWebTokenError){// clase//condicion si este objeto viene de esta clase
      response.status(401).send({
        message: 'token invalido',
        error: error.message,
        status: 401
      })

    }else{
      response.status(500).send({
        ok:false,
        message: 'ocurrio un error al intentar obtener la informacion',
        status:500
      })
    }

  }

}
export default authorizationMiddleware