import { userController } from '../configuration/user-module.configuration'
import { Router } from 'express'
const routes = Router()

routes.post('/', userController.register)
routes.put('/', userController.update)
routes.post('/login', userController.authenticate)
routes.get('/', userController.getAll)
routes.get('/', userController.getById)
routes.delete('/', userController.delete)
export default routes

/*
requisição verificar se existe user retorna author
requisição para atualizar senha */
