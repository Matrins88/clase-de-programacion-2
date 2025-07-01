import members_workspace_repository from "../repositories/membersWorkspaceRepository.js";
import workspaces_repository from "../repositories/workspaces.repository.js"

const workspaceMiddleware = async (req, res, next) => {// middleware para verificar si el workspace existe
    const workspace_id = req.params.workspace_id.trim();//busca el workspace
    const userId = req.user.id;// busca el id del usuario

    try{
        const workspace = await workspaces_repository.getById(workspace_id);
        if(!workspace){
            throw {
                status:404,
                message: "Workspace no encontrado"
            };
        }
        const member = await members_workspace_repository.getMemberByWorkspaceIdAndUserId(workspace_id, userId);
        if(!member){
            throw {
                status: 403,
                message: "No tienes permiso para acceder a este workspace"
        }
    }req.workspace = workspace;
    next();
}catch(error){
 res.status(error.status).json({message: error.message, status: error.status, ok: false});   
}
    
}

export default workspaceMiddleware