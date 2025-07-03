
import { ENVIRONMENT } from "./environment.js";
import { connectDB } from './config/db.config.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
connectDB()

import express from 'express'
import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";
import workspace_router from "./routes/workspace.router.js";
import memberWorkspaceRouter from "./routes/membersWorkspace.router.js";
import channelRouter from "./routes/channels.router.js";
import messageRouter from "./routes/messages.router.js";
import errorMiddleware from "./middlewares/error.middleware.js";


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Server is running</h1>')
})

app.get('/ping', (request, response) => {
    response.send('<h1>Server is running</h1>')
})











app.use('/api/users', usersRouter)
app.use('/api/workspaces', workspace_router)
app.use('/api/products', productsRouter)
app.use('/api/members', memberWorkspaceRouter)
app.use('/api/channels', channelRouter)
app.use('/api/messages', messageRouter)

app.use(errorMiddleware)

app.listen(ENVIRONMENT.PORT, () => {
    console.log(`La aplicacion se esta escuchando en http://localhost:${ENVIRONMENT.PORT}`)
})