import Workspace from "../models/Workspace.model.js";

class WorkspaceRepository{
    /**
     * Este metodo crea workspaces
     * @param {Object} data - un objeto con los datos de workspace a crear 
     */
async create ({name, owner_id, description, created_at}){
    try{

        const workspace = new Workspace({
        name,
        owner_id,
        description,
        created_at,
    });
    await workspace.save(); // guardar los cambios que se hayan hecho
    console.log("Workspace creado correctamente");
    }
   catch(error){
    console.error('ocurrio un error');
    console.error(error);
   }

}
}
const workspace_repository = new WorkspaceRepository();
export default workspace_repository;