import { makeCreateUserController } from './factories/controllers/createUser'
import { Router } from 'express'
import { adaptExpressRoute as adapt } from './adapters/express-router'
import { makeUpdateUserController } from './factories/controllers/updateUser'
import { makeUpdatePasswordController } from './factories/controllers/updatePassword'
import { makeGetUserController } from './factories/controllers/getUser'
import { makeAuthenticateUserController } from './factories/controllers/authenticateUser'
import { IsUserAuthenticated, isUserAdmin } from './middlewares/authentication'
import { makeDeleteUserController } from './factories/controllers/deleteUser'
import { makeRecoverUserPasswordController } from './factories/controllers/recoverUserPassword'

const routes = Router()

routes.put('/update', adapt(makeUpdateUserController()))
routes.put('/updatePassword', adapt(makeUpdatePasswordController()))
routes.post('/create', isUserAdmin, adapt(makeCreateUserController()))
routes.get('/get', IsUserAuthenticated, adapt(makeGetUserController()))
routes.post('/login', adapt(makeAuthenticateUserController()))
routes.delete('/delete', IsUserAuthenticated, adapt(makeDeleteUserController()))
routes.get('/recover', adapt(makeRecoverUserPasswordController()))
export default routes
