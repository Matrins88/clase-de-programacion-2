import WorkspaceMembers from "../models/WorkspaceMembers.model.js";

class WorkspaceMembersRepository {
    async create({workspace_id, user_id, role_id, created_at}) {
        try{
        const workspaceMembers = new WorkspaceMembers({
            workspace_id,
            user_id,
            role_id,
            created_at,
        });
        await workspaceMembers.save()
        console.log("creado exitosamente")
        }
        catch(error){
            console.error("ocurrio un error");
    }
}
}
const workspaceMembers_repository = new WorkspaceMembersRepository();
export default workspaceMembers_repository;