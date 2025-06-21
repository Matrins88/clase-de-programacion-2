import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionaries/availableRoles.dictionary.js";
import members_workspace_repository from "../repositories/membersWorkspaceRepository.js";
import workspace_repository from "../repositories/workspaces.repository.js"
class WorkspaceController{

    async create (request,response){//controlador, conectado con memberworkspacerepository, y el 
        try{
            const {name,description}=request.body;
            const {id} = request.user // este id es del usuario que hace la consulta

            const workspace_created = await workspace_repository.create ({name,description, owner_id: id});// llama el workspace repository
            
            await members_workspace_repository.create(
              {
              workspace_id: workspace_created._id,
              user_id: id,
              role: AVAILABLE_ROLES_WORKSPACE_MEMBERS.ADMIN
            })
            response.status(201).json(
                {
                    ok:true,
                    message: 'Workspace creado exitosamente',
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
               response.status(500).json({message: 'Error interno del servidor', ok: false})
            }
        }
        }
     async getAllByMember (request, response) {
         try {
          const { id } = request.user;

           const workspaces = await members_workspace_repository.getAllByUserId(id);

      return response.json({
      ok: true,
      message: 'Lista de workspaces obtenida exitosamente',
      status: 200,
      data: {workspaces: workspaces}
    });
  } catch (error) {
    console.error('Error al obtener workspaces:', error);
    return response.status(500).json({
      message: 'Error interno del servidor',
      ok: false
    });
  }
}

// controlador para eliminar un id en el workspace
async delete (request, response) {
    try{
        const workspace_id = request.params.workspace_id.trim();//busca el workspace
        const user_id = request.user.id;// busca el id del usuario
        await workspace_repository.deleteWorkspaceFromOwner(user_id, workspace_id)// elimina el workspace

        response.status (200).json({// responde
              ok:true,
              message: 'Workspace ah sido eliminado correctamente',
              status: 200,
              data: {}
    })
  
      return

    } catch(error){
      if (error.status){
        response.status(error.status).send(
          {
            message: error.message,
            status: error.status,
            ok: false
          }
        )
        return
      } else{
         console.error('Error al eliminar worksapace:', error);
     response.status(500).json(
      {
      status: 500,
      message: 'Error interno del servidor',
      ok: false
    }
  )
  }
}
}
}
    

//instanciar
const workspace_controller = new WorkspaceController();
export default workspace_controller// exportar