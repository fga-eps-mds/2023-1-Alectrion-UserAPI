import { BcryptAdapter } from '../../adapters/bcryptAdapter'
import UserRepository from '../../repository/userRepository'
import { UpdatePasswordUseCase } from '../../useCase/updatePassword/updatePasswordUseCase'

export const makeUpdateUser = () => {
  const userRepository = new UserRepository()
  const encryptor = new BcryptAdapter()
  return new UpdatePasswordUseCase(userRepository, encryptor)
}
