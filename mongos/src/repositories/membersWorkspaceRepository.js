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
   const workspaces_list =  await WorkspaceMembers
   .find ({user_id: user_id}).populate('workspace_id', 'name')
    //populate expande os datos referenciados de la propiedad workspace_id

    //map es un metodo de arrays que nos permite transformar un array a otro array
    //el array resultante tiene la misma longitud que el array original

    //limpiamos la lista que devuelve del workspace y donde pertenece
    const workspaces_list_formated = workspaces_list.map((workspace_member) =>{
       return {
        _id: workspace_member._id,
        workspace: workspace_member.workspace_id,
        role: workspace_member.role
       }
    })
    return workspaces_list_formated

}
}
const members_workspace_repository= new MembersWorkspaceRepository();
export default members_workspace_repository;
//modelos de como se crean los workspace que agregue el dueño como un miembro mas
// se va a encargar de crear un nuevo registro en la base de datos y de eliminarlos
