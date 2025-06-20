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
    return workspace;
   
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
    async deleteWorkspaceFromOwner(owner_id, workspace_id) {
         //eliminamos el workspace solo si el owner id es recibido por parametro
    const result = await  Workspace.findOneAndDelete({owner_id,_id: workspace_id})// donde el owner_id se iguala a tanto
                                      // lo que sea que encontremos lo va a borrar
    if(!result){
        throw{ status: 404, message: 'workspace no encontrado' }
    }

    }
async deleteByIfd (workspace_id) {
    return await Workspace.findOneAndDelete({ _id: workspace_id });
}
}

const workspace_repository = new WorkspaceRepository();
export default workspace_repository