import { BcryptService } from '../../infrastructure/service/bcrypt.service'
import UserRepository from '../../repository/userRepository'
import { UpdateUserUseCase } from '../../useCase/updateUser/updateUserUseCase'

export const makeUpdateUser = () => {
  const userRepository = new UserRepository()
  const encryptor = new BcryptService()
  return new UpdateUserUseCase(userRepository, encryptor)
}
