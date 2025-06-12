import Workspace from "../models/Workspace.model.js";

class WorkspaceRepository{
    /**
     * Este metodo crea workspaces
     * @param {Object} data - un objeto con los datos de workspace a crear 
     * 
     */
async create ({name, owner_id, description}){
    try{

        const workspace = new Workspace({
        name,
        owner_id,
        description,
        
    });
    await workspace.save(); // guardar los cambios que se hayan hecho
    console.log("Workspace creado correctamente");
    }
   catch(error){
    console.error('ocurrio un error');
    console.error(error);
     throw error;
   }

   
}
/**
     * Obtiene todos los workspaces de un usuario
     * @param {string} userId - ID del usuario
     * @returns {Promise<Array>}
     */
    async getAllByUserId(userId) {
        try {
            const workspaces = await Workspace.find({ owner_id: userId });
            return workspaces;
        } catch (error) {
            console.error('Ocurrió un error al obtener los workspaces');
            console.error(error);
            throw error;
        }
}
}
const workspace_repository = new WorkspaceRepository();
export default workspace_repository;