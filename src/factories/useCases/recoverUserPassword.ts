import UserRepository from '../../repository/userRepository'
import { RecoverUserPasswordUseCase } from '../../useCase/recoverUserPassword/recoverUserPasswordUseCase'
import { BcryptAdapter } from '../../adapters/bcryptAdapter'

export const makeRecoverUserPassword = () => {
  const userRepository = new UserRepository()
  const encryptor = new BcryptAdapter()
  return new RecoverUserPasswordUseCase(userRepository, encryptor)
}
