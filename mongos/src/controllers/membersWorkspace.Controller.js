import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionaries/availableRoles.dictionary.js";
import members_workspace_repository from "../repositories/membersWorkspaceRepository.js";
import userRepository from "../repositories/users.repository.js";
import workspace_repository from "../repositories/workspaces.repository.js";

class MembersWorkspaceController{
    async add (request, response){
        try {

    //logica para agregar un nuevo miembro
    // agregar un nuevo miembro, solo el dueño del workspace
    //PASO 1: saber quien es el usuario que esta haciendo la solicitud, saber el id
    const {id} = request.user
    //PASO 2:saber el worksapce id
    const {workspace_id} = request.params
    //PASO 3: saber le rol, tomar una decision de negocio
    // opcion:1 : el role lo elige el cliente al invitar el usuario
    // opcion2: el rol es asignado automaticamente por el servidor

    //PASO 4: obtener el mail de quien quiero agregar
    const {role, email} = request.body;
    if(!Object.values(AVAILABLE_ROLES_WORKSPACE_MEMBERS).includes(role)){
        throw {
            status: 400,
            message: "El rol no es valido"
        }
    }
    //PASO 4 
    const user_found = await userRepository.findByEmail({email})
    if(!user_found){
        throw {
            status:400,
            message: "El usuario no existe"
        }
    }
     //problema: no hay un checkeo de que ese miembro ya exista, en cuyo caso no deberiamos volver
    // porque tendriamos un miembro duplicado
    //solucion:
    //PASO6: Verificamos que el usuario no este ya en el workspace
    const members = await members_workspace_repository.getAllByWorkspaceId(workspace_id)
    if(members.find(member=> member.user_id.equals(user_found._id))){
        throw{
            message: 'el usuario ya es miembro de este workspace',
            status: 400
        }
    }
    // buscar el workspace por id y chekear que el 
    //owner_id coincida con el id del usuario que esta haciendo la solicitud

    const workspace_found = await workspace_repository.getById
    (workspace_id)
    if(!workspace_found){
        throw {status: 404,
            message: "workspace no encontrado"}
    }
    if(!workspace_found.owner_id.equals(id)){//*//
        throw {
        status: 403,
        message: "no tienes permisos para agregar un miembro a este workspace"
        }
    }

   
    
    await members_workspace_repository.create(//llamo al metodo de crear workspace (repositorios)
        {
            user_id: user_found._id,
            workspace_id,
            role: role
        })
    //PASO 5: si todo salio bien, devolver un mensaje de exit
    response.status (201).json(
        {
         message: "miembro agregado con exito",
         status: 201,
         data: {}
        }
    )
}   
catch (error){
            if(error.status){
                response.status(error.status).json(
                    {
                    message: error.message,
                    ok: false
                    }
                )
                return
            }else{
               console.log('hubo un error', error)
               response.status(500).json
               ({
                message: 'Error interno del servidor', 
                ok: false})
            }
        
        }
       }
    }
 
 const members_workspace_controller = new MembersWorkspaceController();
 export default members_workspace_controller;