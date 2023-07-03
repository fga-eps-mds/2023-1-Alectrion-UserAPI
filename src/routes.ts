import { makeCreateUserController } from './factories/controllers/createUser'
import { Router } from 'express'
import { adaptExpressRoute as adapt } from './adapters/express-router'
import { makeUpdateUserController } from './factories/controllers/updateUser'
import { makeUpdatePasswordController } from './factories/controllers/updatePassword'
import { makeGetUserController } from './factories/controllers/getUser'
import { makeAuthenticateUserController } from './factories/controllers/authenticateUser'
import { isUserAdmin, isNotQueryUser } from './middlewares/auth-users'
import { makeDeleteUserController } from './factories/controllers/deleteUser'
import { makeRecoverUserPasswordController } from './factories/controllers/recoverUserPassword'

const routes = Router()

routes.put('/update', isUserAdmin, adapt(makeUpdateUserController()))
routes.put(
  '/updatePassword',
  isNotQueryUser,
  adapt(makeUpdatePasswordController())
)
routes.post('/create', isUserAdmin, adapt(makeCreateUserController()))
routes.get('/get', isUserAdmin, adapt(makeGetUserController()))
routes.post('/login', adapt(makeAuthenticateUserController()))
routes.delete('/delete', isUserAdmin, adapt(makeDeleteUserController()))
routes.get('/recover', adapt(makeRecoverUserPasswordController()))
export default routes
