import { BcryptAdapter } from '../../adapters/bcryptAdapter'
import UserRepository from '../../repository/userRepository'
import { UpdateUserUseCase } from '../../useCase/updateUser/updateUserUseCase'

export const makeUpdateUser = () => {
  const userRepository = new UserRepository()
  const encryptor = new BcryptAdapter()
  return new UpdateUserUseCase(userRepository, encryptor)
}
