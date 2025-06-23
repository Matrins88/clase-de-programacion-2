import channel_repository from "../repositories/channel.repository.js";
import workspaces_repository from "../repositories/workspaces.repository.js";

class ChannelService {
/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Crea un nuevo canal en un workspace
     * @param {string} workspaceId - ID del workspace
     * @param {string} name - Nombre del canal
     * @param {boolean} isPrivate - Indica si el canal es privado o no
     * @returns {Promise<Object>} Un objeto con una propiedad channels_list que contiene la lista de canales del workspace
     * @throws {Error} Si el nombre del canal tiene mas de 12 caracteres o si el canal ya existe
     * @throws {Error} Si el workspace no existe
     */
/*******  ac0544d3-1b31-4f1d-a6cb-a8e5fdefe259  *******/
    async create (workspaceId, name, isPrivate) {
        try{
            if (typeof name !== 'string'|| name.length >=12) {

                throw { 
                    status: 400,
                     message: 'El nombre debe tener menos de 12 caracteres' }
            }
            //verificar si el canal ya existe
            const existingChannel = await channel_repository.findByName(workspaceId, name);
            if(existingChannel){
                throw {
                    status: 400,
                    message: 'El canal ya existe'
                }
            }
        
        const workspace = await workspaces_repository.getById(workspaceId);
        if (!workspace) {
            throw { 
                status: 404,
                 message: 'Workspace no encontrado' }
        }
        const channel = await channel_repository.create(workspaceId, name);
        const channels_list  = await channel_repository.getAllByWorkspace(workspaceId);
        return {channels_list};
    }catch (error){
        throw error;
    }
}
}
export default ChannelService
