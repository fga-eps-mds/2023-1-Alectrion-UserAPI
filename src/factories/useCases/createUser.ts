import { BcryptService } from '../../infrastructure/service/bcrypt.service'
import UserRepository from '../../repository/userRepository'
import { CreateUserUseCase } from '../../useCase/createUser/createUserUseCase'

export const makeCreateUser = () => {
  const encryptor = new BcryptService()
  const userRepository = new UserRepository()
  return new CreateUserUseCase(encryptor, userRepository)
}
