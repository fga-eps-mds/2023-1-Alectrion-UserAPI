import UserRepository from '../../repository/userRepository'
import { BcryptService } from '../../infrastructure/service/bcrypt.service'
import { AuthenticateUserUseCase } from '../../useCase/authenticationUser/authenticationUserUseCase'
import { TokenGeneratorService } from '../../infrastructure/service/token-generator.service'

export const makeAuthenticationUser = () => {
  const userRepository = new UserRepository()
  const encryptor = new BcryptService()
  const token = new TokenGeneratorService()
  return new AuthenticateUserUseCase(userRepository, encryptor, token)
}
