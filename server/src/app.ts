import express from 'express'
import cors from 'cors'

import clientsRouter from './routes/clients.routes'
import contactsRouter from './routes/contacts.routes'
import usersRouter from './routes/users.routes'
import loginRouter from './routes/login.routes'

const app = express()
app.use(express.json())

const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,       
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/clients', clientsRouter)
app.use('/contacts', contactsRouter)

export default app;