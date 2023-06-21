import UserRepository from '../../repository/userRepository'
import { RecoverUserPasswordUseCase } from '../../useCase/recoverUserPassword/recoverUserPasswordUseCase'
import { BcryptAdapter } from '../../adapters/bcryptAdapter'
import { MailerAdapter } from '../../adapters/mailerAdapter'

export const makeRecoverUserPassword = () => {
  const userRepository = new UserRepository()
  const encryptor = new BcryptAdapter()
  const mailer = new MailerAdapter()
  return new RecoverUserPasswordUseCase(userRepository, encryptor, mailer)
}
