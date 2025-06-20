import WorkspaceMembers from "../models/WorkspaceMembers.model.js";

class MembersWorkspaceRepository {
    async create({workspace_id, user_id, role}) {
        try{
        const workspaceMember = new WorkspaceMembers({
            workspace_id,
            user_id,
            role
        });
        await WorkspaceMembers.save()
        console.log("creado exitosamente")
        }
        catch(error){
            console.error("ocurrio un error");
    }
}
}
const members_workspace_repository= new MembersWorkspaceRepository();
export default members_workspace_repository;
//modelos de como se crean los workspace que agregue el dueño como un miembro mas
// se va a encargar de crear un nuevo registro en la base de datos y de eliminarlos
