import express from 'express'
import { createClass, listClasses } from './controllers/classes'
import { createConnection, listConnections } from './controllers/connections'

const routes = express.Router()

routes.get('/classes', listClasses)
routes.post('/classes', createClass)

routes.get('/connections', listConnections)
routes.post('/connections', createConnection)

export { routes }
