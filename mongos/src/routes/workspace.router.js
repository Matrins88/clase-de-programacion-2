import express from 'express'
import authorizationMiddleware from '../middlewares/auth.middleware.js';
import workspace_controller from '../controllers/workspace.controller.js';

const workspace_router = express.Router();
//ruta para crear usuario
workspace_router.post(
    '/',
    authorizationMiddleware,
    workspace_controller.create
)//ruta para ver la lista del usuario
workspace_router.get(
  '/',
  authorizationMiddleware,
  workspace_controller.getAll
);//ruta para borra un usuario
workspace_router.delete(
 '/:workspace_id', authorizationMiddleware,
  workspace_controller.delete
)

export default workspace_router;