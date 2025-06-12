import workspace_repository from "../repositories/workspace.repository.js"
class WorkspaceController{

    async create (request,response){//controlador
        try{
            const {name,description}=request.body;
            const {id} = request.user // este id es del usuario que hace la consulta

            await workspace_repository.create ({name,description, owner_id: id});// llama el workspace repository
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
     async getAll(request, response) {
         try {
          const { id } = request.user;

           const workspaces = await workspace_repository.getAllByUserId(id);

      return response.status(200).json({
      ok: true,
      message: 'Lista de workspaces obtenida exitosamente',
      status: 200,
      data: workspaces
    });
  } catch (error) {
    console.error('Error al obtener workspaces:', error);
    return response.status(500).json({
      message: 'Error interno del servidor',
      ok: false
    });
  }
}

    }

//instanciar
const workspace_controller = new WorkspaceController();
export default workspace_controller// exportar