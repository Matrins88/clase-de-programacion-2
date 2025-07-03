import mongoose from "mongoose";
import channel_repository from "../repositories/channel.repository.js";

const channelMiddleware = async (req, res, next) => {
  const { channel_id } = req.params;
  const workspace = req.workspace;

  // ✅ Validación de ObjectId
  if (!mongoose.Types.ObjectId.isValid(channel_id)) {
    return res.status(400).json({
      ok: false,
      message: "channel_id inválido"
    });
  }

  try {
    const channel = await channel_repository.findById(channel_id);
    if (!channel) {
      throw { status: 404, message: 'Channel no encontrado' };
    }

    if (channel.workspace_id.toString() !== workspace._id.toString()) {
      throw { status: 403, message: 'No tienes permiso para acceder a este channel' };
    }

    req.channel = channel;
    next();
  } catch (error) {
    if (error.status) {
      res.status(error.status).send({
        message: error.message,
        ok: false
      });
    } else {
      console.log('Hubo un error', error);
      res.status(500).send({
        message: 'Error interno del servidor',
        ok: false
      });
    }
  }
};

export default channelMiddleware;
