import channel_service from "../services/channel.service.js";

class ChannelController {
    async create(request, response) {
        try {
            const { workspace_id } = request.params
            const { name } = request.body
            const user_id = request.user.id;
            const { channels } = await channel_service.create(workspace_id, name, user_id)

            response
                .status(201)
                .json(
                    {
                        ok: true,
                        message: 'Canal creado exitosamente',
                        status: 201,
                        data: { 
                            channels 
                        }
                    }
                )
        }
        catch (error) {
            if (error.status) {
                response.status(error.status).json(
                    {
                        message: error.message,
                        status: error.status,
                        ok: false
                    }
                )
            }
            else {
                console.error('Hubo un error', error)
                response.status(500).json(
                    {
                        message: error.message,
                        status: 500,
                        ok: false
                    }
                )
            }
        }

    }
    async getAllByWorkspaceId (request, response){
        try{
            
            const { workspace_id } = request.params
            const channels = await channel_service.getAllByWorkspaceId(workspace_id)
            response.status(200).json(
                {
                    ok: true,
                    message: 'Canales obtenidos exitosamente',
                    status: 200,
                    data: { 
                        channels 
                    }
                }
            )
        }
        catch (error) {
            if (error.status) {
                response.status(error.status).json(
                    {
                        message: error.message,
                        status: error.status,
                        ok: false
                    }
                )
            }
            else {
                console.error('Hubo un error', error)
                response.status(500).json(
                    {
                        message: error.message,
                        status: 500,
                        ok: false
                    }
                )
            }
        }

    }
}

const channel_controller = new ChannelController()
export default channel_controller