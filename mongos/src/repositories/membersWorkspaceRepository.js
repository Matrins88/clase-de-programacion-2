import WorkspaceMembers from "../models/WorkspaceMembers.model.js";

class MembersWorkspaceRepository {
    async create({workspace_id, user_id, role}) {
        try{
        const workspace_member = new WorkspaceMembers({
            workspace_id,
            user_id,
            role
        });
        await workspace_member.save()
        console.log("creado exitosamente")
        }
        catch(error){
            console.error("ocurrio un error");
    }
}
async getAllByWorkspaceId (workspace_id){// creo un metodo para buscar los miembros
   return await WorkspaceMembers.find ({workspace_id: workspace_id})
}
async getAllByUserId (user_id){// creo
    return await WorkspaceMembers.find ({user_id: user_id})
}
}
const members_workspace_repository= new MembersWorkspaceRepository();
export default members_workspace_repository;
//modelos de como se crean los workspace que agregue el dueño como un miembro mas
// se va a encargar de crear un nuevo registro en la base de datos y de eliminarlos
