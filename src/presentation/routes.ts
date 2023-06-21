import { userController } from '../configuration/user-module.configuration'
import { Router } from 'express'
const routes = Router()

routes.post('/', userController.register)
routes.put('/', userController.update)
routes.put('/credential', userController.updatePassword)
routes.post('/login', userController.authenticate)
routes.get('/', userController.getAll)
routes.get('/', userController.getById)
routes.get('/validate', userController.validate)
routes.delete('/', userController.delete)
export default routes
