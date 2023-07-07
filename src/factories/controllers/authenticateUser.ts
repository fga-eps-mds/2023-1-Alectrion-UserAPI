import { makeAuthenticationUser } from '../useCases/authenticateUser'
import { AuthenticationUserController } from '../../presentation/controller/authenticateUserController'

export const makeAuthenticateUserController = () => {
  return new AuthenticationUserController(makeAuthenticationUser())
}
