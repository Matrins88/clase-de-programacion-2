import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionaries/availableRoles.dictionary.js"
import members_workspace_repository from "../repositories/membersWorkspaceRepository.js"
import userRepository from "../repositories/users.repository.js"
import workspaces_repository from "../repositories/workspaces.repository.js"

class MembersWorkspaceController {
    async add(request, response) {
        try {
            //Logica para agregar un nuevo miembro
            //AGREGAR UN NUEVO MIEMBRO:
            //PASO 1: 
            //Saber el ID de quien esta haciendo la consulta
            const { id } = request.user

            //PASO 2:
            //Saber el workspace_id
            const { workspace_id } = request.params

            //PASO 3: 
            //Saber el role
            //Aca hay que tomar una decision de negocio
            //Opcion 1: El role lo elige el cliente al invitar al usuario
            //Opcion 2: El role es asignado automaticamente por el servidor
            
            //PASO 4: Obtener el mail de a quien quiero agregar
            
            const { role, email } = request.body


            if(
                !Object.values(AVAILABLE_ROLES_WORKSPACE_MEMBERS).includes(role)
            ){
                throw{
                    status: 400,
                    message: 'Role no valido'
                }
            }

            const user_found = await userRepository.findByEmail({email})

            if(!user_found ){
                throw {status: 404, message: 'Usuario no encontrado'}
            }

            //PROBLEMA: No hay un checkeo de que ese miembro ya exista, en cuyo caso no deberiamos volver a agregar porque podriamos tener un miembro duplicado

            const members = await members_workspace_repository.getAllByWorkspaceId(workspace_id)

            if(members.find(member => {
                return member.user_id.equals(user_found._id)
            })){
                throw {
                    message: 'El usuario ya es miembro de este workspace', 
                    status: 400
                }
            }

            
            //Problema: Cualquiera puede agregar miembro, esto solo deberia poder hacerlo el dueño del workspace
            //Solucion: Buscar el workspace por id y checkear que el owner_id coincida con el id del usuario que hace la consulta

            const workspace_found = await workspaces_repository.getById(workspace_id)
            if(!workspace_found){
                throw {
                    status: 404, 
                    message: 'Workspace no existe'
                }
            }


            if(!workspace_found.owner_id.equals(id)){
                throw {
                    status: 403,
                    message: 'No puedes hacer esta accion, no eres dueño del workspace'
                }
            }

            await members_workspace_repository.create({
                user_id: user_found._id,
                workspace_id: workspace_id,
                role: role
            })

            response.status(201).json(
                {
                    ok: true,
                    status: 201,
                    message: 'Miembro añadido exitosamente',
                    data: {}
                }
            )
        }
        catch (error) {
            if (error.status) {
                response.status(error.status).json(
                    {
                        message: error.message,
                        status: error.status,
                        ok: false
                    }
                )
                return
            }
            else {
                console.log('Hubo un error', error)
                response.status(500).json(
                    {
                        message: 'Error interno del servidor',
                        ok: false
                    }
                )
            }
        }
    }
}

const members_workspace_controller = new MembersWorkspaceController()
export default members_workspace_controller