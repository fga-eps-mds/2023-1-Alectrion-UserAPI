import { BcryptAdapter } from '../../adapters/bcryptAdapter'
import UserRepository from '../../repository/userRepository'
import { RecoverUserPasswordUseCase } from '../../useCase/recoverUserPassword/recoverUserPasswordUseCase'

export const makeRecoverUserPassword = () => {
  const userRepository = new UserRepository()
  const encryptor = new BcryptAdapter()
  return new RecoverUserPasswordUseCase(userRepository, encryptor)
}
